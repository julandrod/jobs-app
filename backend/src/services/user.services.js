import { CustomError } from "../helpers/index.js";
import { formatImage } from "../middlewares/multer.middleware.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

const findCurrentUser = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    if (!user)
      throw new CustomError("User not registered", StatusCodes.UNAUTHORIZED);

    const userWithoutPassword = user.toJSON();
    return userWithoutPassword;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findApplicationStats = async () => {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();

    return { users, jobs };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateUser = async ({ userId, newData, file }) => {
  try {
    const { email } = newData;
    const user = await User.findOne({ email });
    if (user && user._id.toString() !== userId)
      throw new CustomError("Email already exists", StatusCodes.BAD_REQUEST);

    if (file) {
      const avatarFile = formatImage(file);
      const response = await cloudinary.v2.uploader.upload(avatarFile);
      newData.avatar = response.secure_url;
      newData.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    if (file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    return updatedUser;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

export { findCurrentUser, findApplicationStats, updateUser };
