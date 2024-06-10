import CustomError from "./errorResponse.js";
import { StatusCodes } from "http-status-codes";

export const checkPermissions = (reqUser, resourceUserId) => {
  if (reqUser.role === "ADMIN") return;
  if (reqUser.id === resourceUserId) return;

  throw new CustomError(
    "Not allowed to access this route",
    StatusCodes.UNAUTHORIZED
  );
};
