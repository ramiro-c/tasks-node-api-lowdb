import express from "express";
import morgan from "morgan";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
import routes from "./routes/tasks.routes.js";
app.use(routes);

export default app;