import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import jobRouter from "./jobs.routes.js";

const routeHandler = Router();

routeHandler.use("/auth", authRoutes);
routeHandler.use("/users", userRoutes);
routeHandler.use("/jobs", jobRouter)

export default routeHandler;
