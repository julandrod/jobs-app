import { endpointResponse, tryCatchWrapper } from "../helpers/index.js";
import {
  findApplicationStats,
  findCurrentUser,
  updateUser,
} from "../services/user.services.js";

const getCurrentUser = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.user;

  const currentUser = await findCurrentUser({ userId });

  endpointResponse({
    res,
    message: "Current user",
    body: currentUser,
  });
});

const getApplicationStats = tryCatchWrapper(async (req, res, next) => {
  const stats = await findApplicationStats();

  endpointResponse({
    res,
    message: "Application stats",
    body: stats,
  });
});

const patchUser = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.user;
  const newData = { ...req.body };
  const file = req.file;
  const updatedUser = await updateUser({ userId, newData, file });

  endpointResponse({
    res,
    message: "User updated",
    body: updatedUser,
  });
});

export { getCurrentUser, getApplicationStats, patchUser };
