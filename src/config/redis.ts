import { createClient, RedisClientType } from "redis";

// const redisUrl = "redis://127.0.0.1:6379";

export const redisClient: RedisClientType = createClient();

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis...🟥");
    } catch (error) {
        throw new Error("Error connecting to redis!!!");
    }
};