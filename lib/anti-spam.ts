/**
 * CleanTalk-Grade Anti-Spam & SpamFirewall Plugin Engine
 * Advanced protection against spam bots, automated scripts, disposable emails, and malicious submissions.
 */

// In-memory rate limiting & firewall store: IP -> { count: number, resetTime: number, violations: number }
const firewallStore = new Map<string, { count: number; resetTime: number; violations: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

// Expanded CleanTalk-grade disposable / temporary email domain blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'sharklasers.com', 'trashmail.com', 'getairmail.com', 'yopmail.com',
  'dispostable.com', 'temp-mail.org', 'fakemailgenerator.com', 'getnada.com',
  'maildrop.cc', 'throwawaymail.com', 'mohmal.com', 'burnermail.io',
  'mytemp.email', 'tempmailo.com', 'emailondeck.com', 'crazymailing.com',
  'inboxkitten.com', 'linshiyouxiang.net', 'zillamail.com', 'disposablemail.com'
]);

// Comprehensive CleanTalk-grade spam trigger keywords & SEO bot phrases
const SPAM_KEYWORDS = [
  'viagra', 'cialis', 'levitra', 'crypto giveaway', 'bitcoin double', 'free bit',
  'seo ranking service', 'backlink service', 'casino bonus', 'get rich quick',
  'make money fast online', 'work from home salary', 'investment opportunity profit',
  'loan approval guaranteed', 'weight loss miracle', 'enhancement pills'
];

// Blocked automated bot user-agents / HTTP client signatures
const BLOCKED_USER_AGENTS = [
  'python-requests', 'curl', 'wget', 'postmanruntime', 'go-http-client',
  'java/', 'libwww-perl', 'scrapy', 'axios/0.', 'axios/1.'
];

export interface AntiSpamResult {
  isSpam: boolean;
  reason?: string;
  cleantalkShieldActive: boolean;
}

/**
 * CleanTalk-Grade SpamFirewall & Anti-Spam Validation Engine
 */
export function checkAntiSpam(
  clientIp: string,
  email: string,
  userAgent?: string,
  textContent?: string,
  honeypotValue?: string,
  formLoadTime?: number
): AntiSpamResult {
  const shieldActive = true;

  // 1. SpamFirewall User-Agent Check
  if (userAgent && typeof userAgent === 'string') {
    const uaLower = userAgent.toLowerCase();
    for (const badUa of BLOCKED_USER_AGENTS) {
      if (uaLower.includes(badUa)) {
        return { isSpam: true, reason: 'SpamFirewall blocked automated HTTP client signature.', cleantalkShieldActive: shieldActive };
      }
    }
  }

  // 2. Honeypot Field Check (Invisible trap for automated form bots)
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isSpam: true, reason: 'SpamFirewall honeypot triggered (automated bot detected).', cleantalkShieldActive: shieldActive };
  }

  // 3. Behavioral Speed Check (If form submitted in under 1.5 seconds, it's a script bot)
  if (formLoadTime && typeof formLoadTime === 'number') {
    const elapsed = Date.now() - formLoadTime;
    if (elapsed < 1500) {
      return { isSpam: true, reason: 'SpamFirewall blocked rapid programmatic submission.', cleantalkShieldActive: shieldActive };
    }
  }

  // 4. IP Rate Limiting & Firewall Violation Tracking
  const now = Date.now();
  let record = firewallStore.get(clientIp);

  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS, violations: 0 };
    firewallStore.set(clientIp, record);
  } else {
    record.count++;
    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      record.violations++;
      return {
        isSpam: true,
        reason: 'SpamFirewall rate limit exceeded. Too many requests from this IP address.',
        cleantalkShieldActive: shieldActive
      };
    }
  }

  // 5. Email Validation & Disposable Domain Check
  if (!email || typeof email !== 'string') {
    return { isSpam: true, reason: 'Invalid or missing email address.', cleantalkShieldActive: shieldActive };
  }

  const cleanEmail = email.toLowerCase().trim();
  const domainParts = cleanEmail.split('@');
  if (domainParts.length !== 2) {
    return { isSpam: true, reason: 'Malformed email address format.', cleantalkShieldActive: shieldActive };
  }

  const [localPart, domain] = domainParts;
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { isSpam: true, reason: 'SpamFirewall blocked disposable temporary email provider.', cleantalkShieldActive: shieldActive };
  }

  // Check for gibberish / automated email patterns (e.g. 15+ random letters and numbers)
  if (/^[a-z0-9]{18,}@/i.test(cleanEmail) || localPart.length > 30) {
    return { isSpam: true, reason: 'SpamFirewall flagged suspicious automated email pattern.', cleantalkShieldActive: shieldActive };
  }

  // 6. Content Filtering & Keyword Firewall
  if (textContent && typeof textContent === 'string') {
    const lowerText = textContent.toLowerCase();
    
    // Check spam keywords
    for (const keyword of SPAM_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        return { isSpam: true, reason: `SpamFirewall blocked message containing spam signature: "${keyword}".`, cleantalkShieldActive: shieldActive };
      }
    }

    // Check for excessive URL links
    const urlMatches = lowerText.match(/https?:\/\/[^\s]+/g);
    if (urlMatches && urlMatches.length > 2) {
      return { isSpam: true, reason: 'SpamFirewall blocked submission containing excessive URLs.', cleantalkShieldActive: shieldActive };
    }

    // Check for SQL injection or XSS patterns
    if (/(<script[^>]*>|javascript:|drop table|union select)/i.test(lowerText)) {
      return { isSpam: true, reason: 'SpamFirewall blocked potential injection attack payload.', cleantalkShieldActive: shieldActive };
    }
  }

  return { isSpam: false, cleantalkShieldActive: shieldActive };
}
