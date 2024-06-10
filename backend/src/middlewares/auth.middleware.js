import {
  isTokenValid,
  CustomError,
  tryCatchWrapper,
} from "../helpers/index.js";
import { StatusCodes } from "http-status-codes";

const authenticateUser = tryCatchWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("Token not present", StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payloadDecoded = isTokenValid({token});
    req.user = { ...payloadDecoded };
    next();
  } catch (error) {
    throw new CustomError("Not valid token", StatusCodes.UNAUTHORIZED);
  }
});

const authorizeByRole = (role) => {
  return tryCatchWrapper(async (req, res, next) => {
    if (req.user.role !== role) {
      throw new CustomError("Not allowed to access this route", StatusCodes.UNAUTHORIZED);
    }
    next();
  });
};

export {  authenticateUser, authorizeByRole };
