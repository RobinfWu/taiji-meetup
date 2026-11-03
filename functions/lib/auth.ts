import type { Request as WorkerRequest } from "@cloudflare/workers-types";
import type { Env } from "../types/env";

export const SESSION_COOKIE_NAME = "taiji_admin_session";
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60; // 12 hours
export const DEFAULT_PBKDF2_ITERATIONS = 100000;

export interface SessionPayload {
  sub: "instructor";
  iat: number;
  exp: number;
}

export interface AdminAuthResult {
  authorized: boolean;
  authType?: "bearer" | "session";
  response?: Response;
}

/**
 * Timing-safe string comparison to mitigate timing attacks.
 * Normalizes both inputs with SHA-256 before comparing in constant time.
 */
export async function timingSafeCompare(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);

  const [aHash, bHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", aBuf),
    crypto.subtle.digest("SHA-256", bBuf),
  ]);

  const subtle = crypto.subtle as unknown as {
    timingSafeEqual?: (a: ArrayBufferView | ArrayBuffer, b: ArrayBufferView | ArrayBuffer) => boolean;
  };

  if (typeof subtle?.timingSafeEqual === "function") {
    return subtle.timingSafeEqual(new Uint8Array(aHash), new Uint8Array(bHash));
  }

  // Constant-time XOR fallback across fixed 32-byte digests
  const aArr = new Uint8Array(aHash);
  const bArr = new Uint8Array(bHash);
  let mismatch = 0;
  for (let i = 0; i < 32; i++) {
    mismatch |= aArr[i] ^ bArr[i];
  }
  return mismatch === 0;
}

// -----------------------------------------------------------------------------
// Base64Url Helpers
// -----------------------------------------------------------------------------

export function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function base64UrlToBuffer(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// -----------------------------------------------------------------------------
// PBKDF2 Password Hashing
// -----------------------------------------------------------------------------

/**
 * Hashes a plaintext password using PBKDF2-HMAC-SHA256 with cryptographically
 * secure random salt and the specified iteration count.
 * Format: `pbkdf2:sha256:<iterations>:<salt_hex>:<hash_hex>`
 */
export async function hashPassword(
  password: string,
  iterations: number = DEFAULT_PBKDF2_ITERATIONS
): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    passwordKey,
    256 // 32 bytes
  );

  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const hashHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `pbkdf2:sha256:${iterations}:${saltHex}:${hashHex}`;
}

/**
 * Verifies a plaintext password against a stored PBKDF2 hash.
 * If storedHash is malformed or invalid, executes a dummy derivation to prevent
 * timing differences from disclosing configuration state, and returns false.
 */
export async function verifyPassword(
  password: string,
  storedHash?: string
): Promise<boolean> {
  const dummySalt = new Uint8Array(16);
  const dummyIterations = DEFAULT_PBKDF2_ITERATIONS;

  if (
    !storedHash ||
    typeof storedHash !== "string" ||
    !storedHash.startsWith("pbkdf2:sha256:")
  ) {
    // Run dummy work to equalize timing
    try {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: dummySalt, iterations: dummyIterations, hash: "SHA-256" },
        key,
        256
      );
    } catch {
      // ignore dummy derivation errors
    }
    return false;
  }

  const parts = storedHash.split(":");
  if (parts.length !== 5) {
    return false;
  }

  const [, , iterStr, saltHex, expectedHashHex] = parts;
  const iterations = /^\d+$/.test(iterStr) ? Number(iterStr) : NaN;
  if (
    isNaN(iterations) ||
    iterations < 50000 ||
    iterations > 1000000 ||
    !/^[0-9a-fA-F]{32}$/.test(saltHex) ||
    !/^[0-9a-fA-F]{64}$/.test(expectedHashHex)
  ) {
    return false;
  }

  const salt = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    salt[i] = parseInt(saltHex.substr(i * 2, 2), 16);
  }

  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    passwordKey,
    256
  );

  const derivedHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return timingSafeCompare(derivedHex, expectedHashHex);
}

// -----------------------------------------------------------------------------
// Stateless Signed Session Token & Cookie Management
// -----------------------------------------------------------------------------
// Limitations of stateless session revocation:
// Because sessions are cryptographically signed HMAC-SHA256 tokens verified statelessly
// at the edge without a database lookup on every request, logging out clears the client-side
// cookie. If an attacker had exfiltrated a valid session cookie prior to logout, that token
// would remain cryptographically valid until its 12-hour expiration (exp). Rotating
// INSTRUCTOR_SESSION_SECRET immediately invalidates all active sessions globally.
// -----------------------------------------------------------------------------

export async function createSessionToken(
  secret: string,
  maxAgeSeconds: number = SESSION_MAX_AGE_SECONDS
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: "instructor",
    iat: now,
    exp: now + maxAgeSeconds,
  };

  const encoder = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = bufferToBase64Url(encoder.encode(payloadStr));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const sigB64 = bufferToBase64Url(signature);

  return `${payloadB64}.${sigB64}`;
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<{ valid: boolean; payload?: SessionPayload }> {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, sigB64] = parts;
  const encoder = new TextEncoder();

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64UrlToBuffer(sigB64);
    const isSigValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes as unknown as ArrayBuffer,
      encoder.encode(payloadB64)
    );

    if (!isSigValid) {
      return { valid: false };
    }

    const payloadBytes = base64UrlToBuffer(payloadB64);
    const payloadJson = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(payloadJson) as SessionPayload;

    if (payload.sub !== "instructor") {
      return { valid: false };
    }

    const now = Math.floor(Date.now() / 1000);
    if (
      !Number.isSafeInteger(payload.iat) || !Number.isSafeInteger(payload.exp) ||
      payload.iat > now + 60 || payload.exp <= now ||
      payload.exp <= payload.iat || payload.exp - payload.iat > SESSION_MAX_AGE_SECONDS
    ) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  for (const part of cookieHeader.split(";")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx !== -1) {
      const key = part.slice(0, eqIdx).trim();
      const val = part.slice(eqIdx + 1).trim();
      try { cookies[key] = decodeURIComponent(val); } catch { /* Invalid cookie is ignored. */ }
    }
  }
  return cookies;
}

export function isRequestSecure(request: Request | WorkerRequest): boolean {
  try {
    const url = new URL(request.url);
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (!isLocalhost) {
      // Production domains ALWAYS require Secure cookies unconditionally.
      // Untrusted client headers (such as x-forwarded-proto) cannot downgrade security.
      return true;
    }
    // On localhost, allow HTTP for local dev tools, or HTTPS if explicitly configured
    return url.protocol === "https:";
  } catch {
    // Fail secure: in case of any URL parsing anomaly, enforce Secure
    return true;
  }
}

export function createSessionCookieHeader(
  token: string,
  isSecure: boolean,
  maxAgeSeconds: number = SESSION_MAX_AGE_SECONDS
): string {
  const secureFlag = isSecure ? "; Secure" : "";
  return `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAgeSeconds}${secureFlag}`;
}

export function createLogoutCookieHeader(isSecure: boolean): string {
  const secureFlag = isSecure ? "; Secure" : "";
  return `${SESSION_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${secureFlag}`;
}

// -----------------------------------------------------------------------------
// CSRF Protection
// -----------------------------------------------------------------------------

/**
 * Validates CSRF for state-changing browser requests (POST, PATCH, DELETE, PUT).
 * Enforces:
 * 1. Matching Origin / Referer against the host URL.
 * 2. Mandatory presence of custom header 'X-Admin-Action: 1'.
 */
export function verifyCsrf(request: Request | WorkerRequest): boolean {
  const method = request.method.toUpperCase();
  // Safe HTTP read methods are exempt from CSRF checks
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }

  // 1. Mandatory custom header
  const adminHeader = request.headers.get("X-Admin-Action") || request.headers.get("x-admin-action");
  if (adminHeader !== "1") {
    return false;
  }

  // 2. Origin check
  let requestOrigin: string;
  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    return false;
  }

  const originHeader = request.headers.get("Origin") || request.headers.get("origin");
  if (originHeader) {
    if (originHeader === requestOrigin) return true;
    return false;
  }

  // If Origin is not sent, check Referer
  const referer = request.headers.get("Referer") || request.headers.get("referer");
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (refererOrigin === requestOrigin) return true;
    } catch {
      return false;
    }
  }

  return false;
}

// -----------------------------------------------------------------------------
// Unified Authentication
// -----------------------------------------------------------------------------

/**
 * Validates the Instructor/Admin credentials across either:
 * 1. Bearer Token against ADMIN_API_TOKEN (for server-to-server email scheduler calls).
 * 2. Signed HttpOnly Session Cookie against INSTRUCTOR_SESSION_SECRET with CSRF verification (for browser users).
 *
 * Guarantees:
 * - Fails closed (401/403) on any missing secret, expired token, or invalid signature.
 * - Never leaks tokens or password hashes in logs or error messages.
 */
export async function authenticateAdmin(
  request: Request | WorkerRequest,
  env: Env
): Promise<AdminAuthResult> {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");

  // ---------------------------------------------------------------------------
  // Check 1: Bearer Token (Scheduler compatibility)
  // ---------------------------------------------------------------------------
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const rawAdminToken = env.ADMIN_API_TOKEN;
    if (typeof rawAdminToken !== "string" || rawAdminToken.trim().length === 0) {
      return {
        authorized: false,
        response: Response.json(
          { error: "Unauthorized: Server authentication is not configured." },
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
      };
    }

    const providedToken = authHeader.slice(7).trim();
    if (providedToken.length === 0) {
      return {
        authorized: false,
        response: Response.json(
          { error: "Unauthorized: Missing token in Authorization header." },
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
      };
    }

    const isMatch = await timingSafeCompare(providedToken, rawAdminToken.trim());
    if (isMatch) {
      return { authorized: true, authType: "bearer" };
    }

    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Invalid credentials." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  // ---------------------------------------------------------------------------
  // Check 2: Signed Browser Session Cookie
  // ---------------------------------------------------------------------------
  const cookieHeader = request.headers.get("Cookie") || request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies[SESSION_COOKIE_NAME];

  if (!sessionToken) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Authentication required." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const sessionSecret = env.INSTRUCTOR_SESSION_SECRET;
  if (!sessionSecret || typeof sessionSecret !== "string" || sessionSecret.trim().length === 0) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Session authentication is not configured." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const verification = await verifySessionToken(sessionToken, sessionSecret.trim());
  if (!verification.valid) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Invalid or expired session." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  // Enforce CSRF check for browser state-changing requests
  const csrfValid = verifyCsrf(request);
  if (!csrfValid) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Forbidden: CSRF validation failed." },
        { status: 403, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { authorized: true, authType: "session" };
}
