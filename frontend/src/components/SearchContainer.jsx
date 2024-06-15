import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../features/jobsSlice";
import { selectAuthState } from "../features/authSlice";
import { Form, Formik } from "formik";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../utils/constants";

const SearchContainer = () => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(
      getAllJobs({
        search: values.search,
        jobStatus: values.jobStatus,
        jobType: values.jobType,
        sort: values.sort,
        token: userInfo,
      })
    );
  };

  // TODO: add bounce to the input search

  return (
    <section className="rounded-md w-full bg-secondaryBgBase pt-12 px-8 pb-16">
      <Formik
        initialValues={{
          search: "",
          jobStatus: "all",
          jobType: "all",
          sort: "newest",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, resetForm }) => (
          <Form className="form  m-0 rounded-none shadow-none p-0 max-w-full w-full border-t-transparent">
            <h5 className="mb-8 text-xl capitalize">search form</h5>
            <div className="grid gap-y-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] items-center gap-x-4">
              <FormRow
                type="search"
                name="search"
                labelText="search"
                isSearch
                handleSubmit={handleSubmit}
              />
              <FormRowSelect
                name="jobStatus"
                labelText="job status"
                list={["all", ...Object.values(JOB_STATUS)]}
                handleSubmit={handleSubmit}
              />
              <FormRowSelect
                name="jobType"
                labelText="job type"
                list={["all", ...Object.values(JOB_TYPE)]}
                handleSubmit={handleSubmit}
              />
              <FormRowSelect
                name="sort"
                labelText="sort"
                list={[...Object.values(JOB_SORT_BY)]}
                handleSubmit={handleSubmit}
              />
              <button
                className="btn w-full self-center mt-4 grid place-items-center"
                type="button"
                onClick={resetForm}
              >
                Reset Search Values
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SearchContainer;
