import IORedis, { RedisOptions } from 'ioredis'

const redisConfig: RedisOptions = {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    maxRetriesPerRequest: null
}

export const redisConnection = new IORedis(redisConfig)