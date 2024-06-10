import { Router } from "express";
import { authenticateUser, validatorMiddleware } from "../middlewares/index.js";
import {
  deleteJob,
  getAllJobs,
  getAppStats,
  getSingleJob,
  patchJob,
  postJob,
} from "../controllers/jobs.controllers.js";
import { jobSchema } from "../validator-schemas/index.js";

const jobRouter = Router();

jobRouter.use(authenticateUser);

jobRouter
  .route("/")
  .get(getAllJobs)
  .post(validatorMiddleware(jobSchema), postJob);

  jobRouter.get("/stats", getAppStats);

jobRouter
  .route("/:jobId")
  .get(getSingleJob)
  .patch(validatorMiddleware(jobSchema), patchJob)
  .delete(deleteJob);

export default jobRouter;
