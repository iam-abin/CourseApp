import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./src/app";
import { connectRedis } from "./src/config/redis";

// To connect to redis server
connectRedis();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...🚀`);
});
