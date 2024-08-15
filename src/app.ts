import express, { Application, Request, Response } from "express";
import morgan from "morgan";

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


export { app };
