import * as yup from "yup";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Name is required"),
  lastName: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Last Name is required"),
  location: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Location is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "It must be at least 4 characters")
    .max(15, "It must be at most 15 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "It must be at least 4 characters")
    .max(15, "It must be at most 15 characters")
    .required("Password is required"),
});

export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Name is required"),
  lastName: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Last Name is required"),
  location: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Location is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const addJobSchema = yup.object().shape({
  position: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Position is required"),
  company: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Company name is required"),
  jobLocation: yup
    .string()
    .min(3, "It must be at least 3 characters")
    .required("Location is required"),
  status: yup
    .string()
    .oneOf(Object.values(JOB_STATUS))
    .required("Invalid Job status"),
  jobType: yup
    .string()
    .oneOf(Object.values(JOB_TYPE))
    .required("Invalid Job type"),
});
