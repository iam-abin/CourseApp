import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";


const app: Application = express();



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Logger middlewares
app.use(morgan("dev"));

// Routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes)

app.all("*", (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
