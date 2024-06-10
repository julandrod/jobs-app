import { authenticateUser, authorizeByRole } from "./auth.middleware.js";
import { errorMiddleware } from "./errors.middleware.js";
import { notFoundMiddleware } from "./notFound.middleware.js";
import { validatorMiddleware } from "./validator.middleware.js";
import upload, { formatImage } from "./multer.middleware.js";

export {
  authenticateUser,
  authorizeByRole,
  errorMiddleware,
  notFoundMiddleware,
  validatorMiddleware,
  upload,
  formatImage,
};
