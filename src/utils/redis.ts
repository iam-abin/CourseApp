import { redisClient } from "../config/redis";
import { CACHE_EXPIRATION_TIME } from "./constants";

export const addDataToRedis = async (
    key: string,
    subKey: string,
    data: string
) => {
    try {
        await redisClient.hSet(key, subKey, data);
        await redisClient.expire(key, CACHE_EXPIRATION_TIME);
    } catch (error) {
        // console.log("Error Redis:",error);
        throw new Error("Error setting data to redis");
    }
};

export const getDataFromRedis = async (key: string, subKey: string) => {
    try {
        const cachedData = await redisClient.hGet(key, subKey);
        return cachedData;
    } catch (error) {
        // console.log("Error Redis:",error);
        throw new Error("Error getting data from redis");
    }
};

export const removeDataFromRedis = async (key: string): Promise<void> => {
    try {
        await redisClient.del(key);
    } catch (error) {
        // console.error("Error Redis:", error);
        throw new Error("Error removing data from redis");
    }
};
