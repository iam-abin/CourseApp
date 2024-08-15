import express, { Application, Request, Response } from "express";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middlewares
app.use(morgan("dev"));

// Routes
app.get("/api/v1", (req: Request, res: Response) => {
    res.send("hi welcome");
});

app.use("/api/v1/auth", authRoutes);
app.all("*", (req: Request, res: Response) => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };
