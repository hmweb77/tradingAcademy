/**
 * Simple Rate Limiting Utility
 * Prevents spam and bot attacks by limiting requests per identifier
 */

// Store rate limit data in memory
// Format: { identifier: [timestamp1, timestamp2, ...] }
const rateLimitStore = new Map();

// Cleanup old entries every 10 minutes to prevent memory issues
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 3600000; // 1 hour in milliseconds
  
  for (const [identifier, timestamps] of rateLimitStore.entries()) {
    // Remove timestamps older than 1 hour
    const recentTimestamps = timestamps.filter(time => time > oneHourAgo);
    
    if (recentTimestamps.length === 0) {
      // No recent activity, remove this identifier
      rateLimitStore.delete(identifier);
    } else {
      // Update with only recent timestamps
      rateLimitStore.set(identifier, recentTimestamps);
    }
  }
}, 600000); // Run every 10 minutes

/**
 * Check if a request should be allowed based on rate limiting
 * 
 * @param {string} identifier - Unique identifier (email, IP address, etc.)
 * @param {number} maxRequests - Maximum number of requests allowed (default: 3)
 * @param {number} windowMs - Time window in milliseconds (default: 1 hour)
 * @returns {boolean} - true if request is allowed, false if rate limited
 */
export function checkRateLimit(
  identifier, 
  maxRequests = 3, 
  windowMs = 3600000 // 1 hour default
) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get existing attempts for this identifier
  const attempts = rateLimitStore.get(identifier) || [];
  
  // Filter to only recent attempts within the time window
  const recentAttempts = attempts.filter(timestamp => timestamp > windowStart);
  
  // Check if limit exceeded
  if (recentAttempts.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  // Add current attempt
  recentAttempts.push(now);
  rateLimitStore.set(identifier, recentAttempts);
  
  return true; // Request allowed
}