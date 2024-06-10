import { endpointResponse, tryCatchWrapper } from "../helpers/index.js";
import {
  createJob,
  findAllJobs,
  findAllStats,
  findSingleJob,
  removeJob,
  updateJob,
} from "../services/jobs.services.js";

const getAllJobs = tryCatchWrapper(async (req, res, next) => {
  const { search, jobStatus, jobType, sort, pageQuery, limitQuery } = req.query;
  const { userId } = req.user;

  const jobs = await findAllJobs({
    search,
    jobStatus,
    jobType,
    sort,
    pageQuery,
    limitQuery,
    userId,
  });

  endpointResponse({
    res,
    message: "Jobs found successfully",
    body: jobs,
  });
});

const postJob = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.user;
  const jobInfo = req.body;
  jobInfo.createdBy = userId;

  const newJob = await createJob({ jobInfo });

  endpointResponse({
    res,
    message: "Job created successfully",
    body: newJob,
  });
});

const getSingleJob = tryCatchWrapper(async (req, res, next) => {
  const { jobId } = req.params;
  const { userId, role } = req.user;
  const job = await findSingleJob({ jobId, userId, role });

  endpointResponse({
    res,
    message: "Job found successfully",
    body: job,
  });
});

const patchJob = tryCatchWrapper(async (req, res, next) => {
  const { jobId } = req.params;
  const { userId, role } = req.user;
  const updatedJob = await updateJob({
    jobId,
    userId,
    role,
    jobInfo: req.body,
  });

  endpointResponse({
    res,
    message: "Job updated successfully",
    body: updatedJob,
  });
});

const deleteJob = tryCatchWrapper(async (req, res, next) => {
  const { jobId } = req.params;
  const { userId, role } = req.user;
  const job = await removeJob({ jobId, userId, role });

  endpointResponse({
    res,
    message: "Job deleted successfully",
    body: job,
  });
});

const getAppStats = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.user;
  const stats = await findAllStats({ userId });

  endpointResponse({
    res,
    message: "Stats found successfully",
    body: stats,
  });
});

export { postJob, getSingleJob, patchJob, deleteJob, getAllJobs, getAppStats };
