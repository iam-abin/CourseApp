import { createClient, RedisClientType } from "redis";

// const redisUrl = "redis://127.0.0.1:6379";
// const DEFAULT_EXPIRATION_INT = 3660;

export const redisClient: RedisClientType = createClient();

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis...🟥");
    } catch (error) {
        throw new Error("Error connecting to redis!!!");
    }
};

export const setDataToRedis = async(key: string, data: string) => {
    try {
        await redisClient.set(key, data);
    } catch (error) {
        console.log(error);
        throw new Error("Error setting data to redis");
    }
};

export const setDataFromRedis = async (key: string) => {
    try {
        const data = await redisClient.get(key);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting data from redis");
    }
};

export const removeRedisData = async (key: string): Promise<void> => {
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error("Error removing Redis data:", error);
        throw new Error("Error removing data from redis");
    }
};
