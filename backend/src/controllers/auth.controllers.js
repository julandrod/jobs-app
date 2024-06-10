import { endpointResponse, tryCatchWrapper } from "../helpers/index.js";
import { findAndLogin, registerUser } from "../services/auth.services.js";
import { StatusCodes } from "http-status-codes";

const createUser = tryCatchWrapper(async (req, res, next) => {
  const { name, lastName, email, password, location } = req.body;
  const newUser = await registerUser({
    name,
    lastName,
    email,
    password,
    location,
  });

  endpointResponse({
    res,
    code: StatusCodes.CREATED,
    message: "User created successfully",
    body: newUser,
  });
});

const loginUser = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const infoUser = await findAndLogin({ email, password });

  endpointResponse({
    res,
    message: "Login successfully",
    body: { ...infoUser },
  });
});

export { createUser, loginUser };
