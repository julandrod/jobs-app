import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
import { deleteJob } from "../features/jobsSlice";
day.extend(advancedFormat);

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteJob({ jobId: _id, token: userInfo }));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const date = day(createdAt).format("MMMM Do, YYYY");
  const statusClasses = {
    pending: "bg-[#fef3c7] text-[#f59e0b]",
    interview: "bg-[#e0e8f9] text-[#647acb]",
    declined: "bg-[#ffeeee] text-[#d66a6a]",
  };

  return (
    <article className="bg-secondaryBgBase rounded-md grid grid-rows-[1fr_auto] shadow-shadow-2">
      <header className="py-4 px-6 border-b-2 border-green-100 grid grid-cols-[auto_1fr] items-center">
        <div className="w-16 h-16 grid place-items-center bg-primary-500 rounded-md text-2xl font-bold uppercase text-white mr-8">
          {company.charAt(0)}
        </div>
        <div>
          <h5 className="mb-2 text-xl">{position}</h5>
          <p className="m-0 capitalize tracking-wide text-secondaryTextColor">
            {company}
          </p>
        </div>
      </header>
      <div className="py-4 px-6">
        <div className="grid mt-4 mb-6 grid-cols-1 gap-y-6 items-center sm:grid-cols-[1fr_1fr]">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div
            className={`${statusClasses[status]} rounded-md capitalize tracking-wide text-center w-24 h-8 grid items-center`}
          >
            {status}
          </div>
        </div>
        <footer className="mt-4 flex items-center">
          <Link
            className="btn h-8 text-sm flex items-center mr-2"
            to={`/dashboard/edit-job/${_id}`}
          >
            Edit
          </Link>
          <div>
            <button
              className="btn h-8 text-sm flex items-center"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default Job;
