import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth";
import courseRoutes from "./routes/course";
import lessonRoutes from "./routes/lesson";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";
import { rateLimiter } from "./middlewares/rateLimiter";

const app: Application = express();

// Middlewares
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true, // Allow cookies
    })
);
app.use(express.json({limit: '500kb'}));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));
app.use(cookieParser());
app.use(rateLimiter);

// Http logger middlewares
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/lesson", lessonRoutes);

app.all("*", (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
