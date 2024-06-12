import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controllers.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../validator-schemas/index.js";
import rateLimiter from "express-rate-limit";

const authRoutes = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes",
  },
});

authRoutes.post(
  "/register",
  [apiLimiter, validatorMiddleware(registerSchema)],
  createUser
);
authRoutes.post(
  "/login",
  [apiLimiter, validatorMiddleware(loginSchema)],
  loginUser
);

export default authRoutes;
