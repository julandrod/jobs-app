import mongoose from "mongoose";
import { CustomError, checkPermissions } from "../helpers/index.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";

const validateJobId = (jobId) => {
  const isValidMongoId = mongoose.isValidObjectId(jobId);
  if (!isValidMongoId)
    throw new CustomError("Invalid Job Id", StatusCodes.BAD_REQUEST);
  return;
};

const createJob = async ({ jobInfo }) => {
  try {
    const newJob = await Job.create(jobInfo);
    return newJob;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAllJobs = async ({
  search,
  jobStatus,
  jobType,
  sort,
  userId,
  pageQuery,
  limitQuery,
}) => {
  try {
    const queryObject = {
      createdBy: userId,
    };

    if (search) {
      queryObject.$or = [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (jobStatus && jobStatus !== "all") {
      queryObject.status = jobStatus;
    }
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }

    const sortOptions = {
      newest: "-createdAt",
      oldest: "createdAt",
      "a-z": "position",
      "z-a": "-position",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    const page = Number(pageQuery) || 1;
    const limit = Number(limitQuery) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    return { totalJobs, numOfPages, currentPage: page, jobs };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findSingleJob = async ({ jobId, userId, role }) => {
  try {
    validateJobId(jobId);

    const job = await Job.findById(jobId);
    if (!job) throw new CustomError("Job not found", StatusCodes.NOT_FOUND);

    checkPermissions({ id: userId, role }, job.createdBy.toString());

    return job;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateJob = async ({ jobId, jobInfo, userId, role }) => {
  try {
    validateJobId(jobId);

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobInfo, {
      new: true,
    });

    checkPermissions({ id: userId, role }, updatedJob.createdBy.toString());

    return updatedJob;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const removeJob = async ({ jobId, userId, role }) => {
  try {
    validateJobId(jobId);

    const job = await Job.findByIdAndDelete(jobId);

    checkPermissions({ id: userId, role }, job.createdBy.toString());

    return job;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAllStats = async ({ userId }) => {
  try {
    let stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");
        return { date, count };
      })
      .reverse();

    return { defaultStats, monthlyApplications };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

export {
  findAllJobs,
  createJob,
  findSingleJob,
  updateJob,
  removeJob,
  findAllStats,
};
