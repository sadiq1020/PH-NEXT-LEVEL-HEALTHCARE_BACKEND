import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

export default app;
