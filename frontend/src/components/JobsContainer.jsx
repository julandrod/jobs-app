import { useSelector } from "react-redux";
import { selectJobState } from "../features/jobsSlice";
import Loading from "./Loading";
import Job from "./Job";

const JobsContainer = () => {
  const { allJobs } = useSelector(selectJobState);

  if (!allJobs) {
    return <Loading />;
  }

  if (allJobs?.jobs.length === 0) {
    return (
      <section className="mt-16">
        <h2 className="capitalize text-xl font-bold mb-6">
          No jobs to display...
        </h2>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h5 className="capitalize text-xl font-bold mb-6">
        {allJobs?.totalJobs} job{allJobs?.jobs.length > 1 && "s"} found
      </h5>
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[1fr_1fr] gap-8">
        {allJobs?.jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </section>
  );
};

export default JobsContainer;
