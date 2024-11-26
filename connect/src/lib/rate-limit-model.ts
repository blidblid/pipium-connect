/** Rate limit configuration.  */
export interface RateLimit {
  /** Maximum number of allowed requests. */
  limit: number;

  /** Milliseconds until a request is removed from the limit count. */
  ttl?: number;
}
