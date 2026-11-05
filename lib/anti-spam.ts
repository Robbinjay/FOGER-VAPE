/**
 * Anti-Spam & Rate-Limiting Protection Module for Zoho Mail Dispatches
 */

// In-memory rate limiting store: IP -> { count: number, resetTime: number }
const submissionTracker = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Blocked disposable or temporary email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'sharklasers.com',
  'trashmail.com',
  'getairmail.com',
  'yopmail.com',
  'dispostable.com',
  'temp-mail.org',
  'fakemailgenerator.com',
]);

// Spam trigger keywords or patterns
const SPAM_KEYWORDS = [
  'viagra',
  'cialis',
  'crypto giveaway',
  'bitcoin double',
  'free bit',
  'seo ranking service',
  'backlink service',
  'casino bonus',
  'get rich quick',
  'make money fast online',
];

export interface AntiSpamResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Checks incoming submission against rate limiting, disposable emails, and spam keywords.
 */
export function checkAntiSpam(clientIp: string, email: string, textContent?: string, honeypotValue?: string): AntiSpamResult {
  // 1. Honeypot check (if bot filled the hidden honeypot field)
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isSpam: true, reason: 'Automated bot submission detected (honeypot triggered).' };
  }

  // 2. IP Rate Limiting
  const now = Date.now();
  let tracker = submissionTracker.get(clientIp);

  if (!tracker || now > tracker.resetTime) {
    tracker = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
    submissionTracker.set(clientIp, tracker);
  } else {
    tracker.count++;
    if (tracker.count > MAX_REQUESTS_PER_WINDOW) {
      return {
        isSpam: true,
        reason: 'Too many requests from this IP address. Please try again later.',
      };
    }
  }

  // 3. Email validation & Disposable domain check
  if (!email || typeof email !== 'string') {
    return { isSpam: true, reason: 'Invalid email address provided.' };
  }

  const cleanEmail = email.toLowerCase().trim();
  const domainParts = cleanEmail.split('@');
  if (domainParts.length !== 2) {
    return { isSpam: true, reason: 'Malformed email address.' };
  }

  const domain = domainParts[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { isSpam: true, reason: 'Temporary or disposable email addresses are not accepted.' };
  }

  // 4. Spam keyword filtering in text content (notes, messages, names)
  if (textContent && typeof textContent === 'string') {
    const lowerText = textContent.toLowerCase();
    for (const keyword of SPAM_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        return { isSpam: true, reason: 'Message content flagged by automated spam filter.' };
      }
    }

    // Check for excessive URL links (spam bot signature)
    const urlMatches = lowerText.match(/https?:\/\/[^\s]+/g);
    if (urlMatches && urlMatches.length > 2) {
      return { isSpam: true, reason: 'Excessive URLs detected in submission.' };
    }
  }

  return { isSpam: false };
}
