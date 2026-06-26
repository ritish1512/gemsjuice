import { randomInt } from 'crypto';

/**
 * Generates a cryptographically secure 6-digit OTP string.
 */
export function generateOTP(): string {
  // randomInt generates a secure integer from 100000 (inclusive) to 1000000 (exclusive)
  return randomInt(100000, 1000000).toString();
}
