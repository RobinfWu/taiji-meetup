#!/usr/bin/env node

/**
 * Chen Taiji Lab — Instructor Password Hash Generator
 *
 * Security guarantees:
 * - Accepts password via interactive non-echoing stdin prompt (never via CLI args).
 * - Avoids leaking plaintext passwords to shell history or process listings.
 * - Requires password confirmation to avoid typos.
 * - Generates salted PBKDF2-HMAC-SHA256 with benchmarked work factor (default 250,000).
 */

import readline from "node:readline";
import { pbkdf2Sync, randomBytes } from "node:crypto";

function promptHidden(promptText) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
      reject(new Error("An interactive terminal is required for secure password entry."));
      return;
    }
    process.stdout.write(promptText);
    const wasRaw = Boolean(stdin.isRaw);
    let password = "";
    let finished = false;
    const cleanup = () => {
      stdin.removeListener("data", onData);
      stdin.removeListener("end", onEnd);
      stdin.setRawMode(wasRaw);
      stdin.pause();
    };
    const onEnd = () => {
      if (!finished) { finished = true; cleanup(); reject(new Error("Input ended unexpectedly.")); }
    };
    const onData = (chunk) => {
      for (const char of chunk) {
        if (finished) break;
        if (char === "\r" || char === "\n") {
          finished = true;
          cleanup();
          process.stdout.write("\n");
          resolve(password);
        } else if (char === "\u0003" || char === "\u0004") {
          finished = true;
          cleanup();
          process.stdout.write("\n");
          reject(new Error("Password entry cancelled."));
        } else if (char === "\u0008" || char === "\u007f") {
          password = password.slice(0, -1);
        } else if (char >= " " && char !== "\u007f") {
          password += char;
        }
      }
    };
    stdin.setEncoding("utf8");
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
    stdin.on("end", onEnd);
  });
}

function promptVisible(promptText, defaultValue) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(promptText, (answer) => {
      rl.close();
      const val = answer.trim();
      resolve(val.length > 0 ? val : defaultValue);
    });
  });
}

async function main() {
  console.log("============================================================");
  console.log("Chen Taiji Lab — Secure Instructor Password Hash Generator");
  console.log("============================================================\n");

  const password = await promptHidden("Enter instructor password: ");
  if (!password || password.length === 0) {
    console.error("Error: Password cannot be empty.");
    process.exit(1);
  }

  const confirm = await promptHidden("Confirm instructor password: ");
  if (password !== confirm) {
    console.error("Error: Passwords do not match.");
    process.exit(1);
  }

  const iterInput = await promptVisible("PBKDF2 iterations [default: 250000]: ", "250000");
  const iterations = /^\d+$/.test(iterInput) ? Number(iterInput) : NaN;

  if (isNaN(iterations) || iterations < 50000 || iterations > 1000000) {
    console.error("Error: Iterations must be between 50,000 and 1,000,000.");
    process.exit(1);
  }

  console.log(`\nDeriving hash with ${iterations.toLocaleString()} iterations...`);
  const t0 = Date.now();
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
  const elapsed = Date.now() - t0;

  const saltHex = salt.toString("hex");
  const hashHex = hash.toString("hex");
  const formattedHash = `pbkdf2:sha256:${iterations}:${saltHex}:${hashHex}`;
  const sessionSecret = randomBytes(32).toString("hex");

  console.log(`Completed in ${elapsed}ms.\n`);
  console.log("------------------------------------------------------------");
  console.log("Copy these environment variables:\n");
  console.log(`INSTRUCTOR_PASSWORD_HASH="${formattedHash}"`);
  console.log(`INSTRUCTOR_SESSION_SECRET="${sessionSecret}"`);
  console.log("------------------------------------------------------------\n");
  console.log("Notes:");
  console.log("- For local testing, add these to .dev.vars");
  console.log("- For production, set as Cloudflare Pages secrets (never commit to git).");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
