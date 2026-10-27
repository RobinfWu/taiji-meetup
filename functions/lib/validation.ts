/**
 * Shared validation helpers for student data.
 *
 * All lengths are chosen to be practical for real names, emails, and phone
 * numbers while defending against oversized payloads. Email syntax validation
 * checks for a plausible local@domain structure without attempting to verify
 * deliverability.
 */

export const STUDENT_LIMITS = {
  FIRST_NAME_MAX: 100,
  LAST_NAME_MAX: 100,
  EMAIL_MAX: 254, // RFC 5321 maximum
  PHONE_MAX: 30,
  NOTES_MAX: 2000,
} as const;

/**
 * Basic email syntax check: requires at least one character before '@',
 * a domain part with a dot, and no whitespace. Not intended to be exhaustive —
 * just sufficient to reject clearly malformed values.
 */
export function isValidEmailSyntax(email: string): boolean {
  // Must match: something@something.something  (no spaces, length already checked)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Escapes SQL LIKE wildcard characters (%, _, \) in a user-supplied search
 * string so that free-text queries behave predictably.
 */
export function escapeLikeWildcards(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

export interface StudentValidationError {
  field: string;
  message: string;
}

/**
 * Validates and normalizes a student name field.
 * Returns the trimmed value or a validation error.
 */
export function validateName(
  value: unknown,
  fieldName: string,
  maxLen: number
): { value: string } | { error: StudentValidationError } {
  if (typeof value !== "string") {
    return { error: { field: fieldName, message: `'${fieldName}' must be a string.` } };
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { error: { field: fieldName, message: `'${fieldName}' must not be blank.` } };
  }
  if (trimmed.length > maxLen) {
    return {
      error: { field: fieldName, message: `'${fieldName}' must not exceed ${maxLen} characters.` },
    };
  }
  return { value: trimmed };
}

/**
 * Validates and normalizes an email address.
 * Returns the lowercased, trimmed value or a validation error.
 */
export function validateEmail(
  value: unknown
): { value: string } | { error: StudentValidationError } {
  if (typeof value !== "string") {
    return { error: { field: "email", message: "'email' must be a string." } };
  }
  const trimmed = value.trim().toLowerCase();
  if (trimmed.length === 0) {
    return { error: { field: "email", message: "'email' must not be blank." } };
  }
  if (trimmed.length > STUDENT_LIMITS.EMAIL_MAX) {
    return {
      error: {
        field: "email",
        message: `'email' must not exceed ${STUDENT_LIMITS.EMAIL_MAX} characters.`,
      },
    };
  }
  if (!isValidEmailSyntax(trimmed)) {
    return { error: { field: "email", message: "'email' must be a valid email address." } };
  }
  return { value: trimmed };
}

/**
 * Validates an optional phone value (null clears the field, undefined is ignored).
 * Returns the trimmed value, null, or a validation error.
 */
export function validatePhone(
  value: unknown
): { value: string | null } | { error: StudentValidationError } {
  if (value === null) return { value: null };
  if (typeof value !== "string") {
    return { error: { field: "phone", message: "'phone' must be a string or null." } };
  }
  const trimmed = value.trim();
  if (trimmed.length > STUDENT_LIMITS.PHONE_MAX) {
    return {
      error: {
        field: "phone",
        message: `'phone' must not exceed ${STUDENT_LIMITS.PHONE_MAX} characters.`,
      },
    };
  }
  return { value: trimmed.length > 0 ? trimmed : null };
}

/**
 * Validates optional notes (null clears the field, undefined is ignored).
 * Returns the trimmed value, null, or a validation error.
 */
export function validateNotes(
  value: unknown
): { value: string | null } | { error: StudentValidationError } {
  if (value === null) return { value: null };
  if (typeof value !== "string") {
    return { error: { field: "notes", message: "'notes' must be a string or null." } };
  }
  const trimmed = value.trim();
  if (trimmed.length > STUDENT_LIMITS.NOTES_MAX) {
    return {
      error: {
        field: "notes",
        message: `'notes' must not exceed ${STUDENT_LIMITS.NOTES_MAX} characters.`,
      },
    };
  }
  return { value: trimmed.length > 0 ? trimmed : null };
}
