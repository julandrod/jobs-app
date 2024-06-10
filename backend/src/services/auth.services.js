import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { CustomError, comparePassword, createJwt, encryptPassword } from "../helpers/index.js";

const registerUser = async ({ name, lastName, email, password, location }) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;

    const alreadyRegister = await User.findOne({ email });

    if (alreadyRegister)
      throw new CustomError(
        "Email already registered",
        StatusCodes.BAD_REQUEST
      );

    const hashPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      location,
      lastName,
      role: isFirstAccount ? "admin" : "user",
    });

    return {id: newUser._id, role: newUser.role};
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAndLogin = async ({ email, password }) => {
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new CustomError("User not registered", 401);

    const passwordMatch = await comparePassword(password, foundUser.password);
    if (!passwordMatch) throw new CustomError("Invalid credentials", 401);

    const token = createJwt({
      payload: { userId: foundUser._id, role: foundUser.role },
    });

    return {
      userId: foundUser._id,
      role: foundUser.role,
      token,
    };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

export { registerUser, findAndLogin };
