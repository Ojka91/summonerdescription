"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterSingleton = void 0;
/**
 * This class mantains a free rate limit of MAX_REQUESTS_PER_DAY using singleton pattern
 *
 */
class RateLimiter {
    constructor() {
        this.CURRENT_NUM_REQUEST = {
            DAY: 0,
            NUM_REQUESTS: 0
        };
        this.MAX_REQUESTS_PER_DAY = 100;
    }
    checkRateLimit() {
        let CURRENT_DAY = new Date().getDate();
        if (CURRENT_DAY != this.CURRENT_NUM_REQUEST.DAY) {
            this.CURRENT_NUM_REQUEST.DAY = CURRENT_DAY;
            this.CURRENT_NUM_REQUEST.NUM_REQUESTS = 0;
        }
        if (this.CURRENT_NUM_REQUEST.NUM_REQUESTS >= this.MAX_REQUESTS_PER_DAY) {
            throw new Error("Max num requests for free reached daily limit. Try again tomorrow, use your own api key, or try premium tier and help me mantain this site :)");
        }
        this.CURRENT_NUM_REQUEST.NUM_REQUESTS++;
    }
}
class RateLimiterSingleton {
    constructor() {
        throw new Error('Use RateLimiterSingleton.getInstance()');
    }
    static getInstance() {
        if (!RateLimiterSingleton.rateLiimter) {
            RateLimiterSingleton.rateLiimter = new RateLimiter();
        }
        return RateLimiterSingleton.rateLiimter;
    }
}
exports.RateLimiterSingleton = RateLimiterSingleton;
//# sourceMappingURL=rateLimiter.js.map