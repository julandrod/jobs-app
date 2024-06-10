import { body } from "express-validator";

export const registerSchema = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),
  body("lastName")
    .notEmpty()
    .trim()
    .withMessage("Last Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last Name must be between 3 and 20 characters"),
  body("location")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should contain at least 6 characters"),
];
