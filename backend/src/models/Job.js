import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../helpers/index.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxLength: 50,
    },
    position: {
      type: String,
      required: true,
      maxLength: 100,
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
