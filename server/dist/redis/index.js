"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSingleton = void 0;
const logger_1 = require("../utils/logger");
const client_1 = require("@node-redis/client");
/**
 * Redis is an in-memory data structure store
 * We use it to store, retreive and update live game statuses
 * We only keep data in memory for 1 day
 */
class Redis {
    constructor() {
        this.client = (0, client_1.createClient)({ url: process.env.REDIS_URL });
        this.client.on('error', (err) => logger_1.logger.error(err, 'Error connecting with redis'));
    }
    async connect() {
        try {
            await this.client.connect();
            logger_1.logger.info('Redis connected successfuly');
        }
        catch (error) {
            logger_1.logger.error(error, 'Failed connecting to redis');
        }
    }
    /**
     * Store game data into redis cache
     * By default game will be expired (deleted) after one day (86400 seconds) from redis
     * @param id game room/id
     * @param data game data
     */
    async set(id, data) {
        try {
            return await this.client.setEx(id, 86400, data);
        }
        catch (error) {
            logger_1.logger.error(error, `Failed storing to redis game id: ${id}`);
        }
    }
    /**
     * Retreive game data from redis
     * @param id game room/id
     */
    async get(id) {
        try {
            const data = await this.client.get(id);
            if (!data)
                throw new Error(`No room found for id ${id}`);
            return JSON.parse(data);
        }
        catch (error) {
            logger_1.logger.error(error, `Failed retreiving data from redis game id: ${id}`);
            throw new Error(`Failed retreiving data from redis game id: ${id}`);
        }
    }
}
class RedisSingleton {
    constructor() {
        throw new Error('Use RedisSingleton.getInstance()');
    }
    static getInstance() {
        if (!RedisSingleton.redis) {
            RedisSingleton.redis = new Redis();
        }
        return RedisSingleton.redis;
    }
}
exports.RedisSingleton = RedisSingleton;
//# sourceMappingURL=index.js.map