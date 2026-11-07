/** Shared launch drop-in rates in CAD cents. Free eligibility is checked from
 * reservation history, and the booking transaction remains authoritative. */
export const PAID_DROP_IN_RATES = { regular: 2000, senior: 1700, student: 1700 } as const;
