import { Router } from "express";
import {
  authenticateUser,
  authorizeByRole,
  upload,
  validatorMiddleware,
} from "../middlewares/index.js";
import {
  getApplicationStats,
  getCurrentUser,
  patchUser,
} from "../controllers/user.controllers.js";
import { updateUserSchema } from "../validator-schemas/index.js";
const userRoutes = Router();

userRoutes.use(authenticateUser);

userRoutes.get("/current", getCurrentUser);
userRoutes.get("/admin/stats", authorizeByRole("admin"), getApplicationStats);
userRoutes.patch("/update", validatorMiddleware(updateUserSchema), patchUser);

export default userRoutes;
