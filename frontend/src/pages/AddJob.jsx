import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../features/userSlice";
import { selectAuthState } from "../features/authSlice";
import { addJob } from "../features/jobsSlice";
import { Form, Formik } from "formik";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import { addJobSchema } from "../schemas";
import { FormRow, FormRowSelect, Loading, SubmitBtn } from "../components";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const { userData } = useSelector(selectUserState);
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    const infoJob = {
      ...values,
      jobLocation: values.jobLocation || userData?.location,
    };

    dispatch(addJob({ infoJob, token: userInfo }));

    navigate("/dashboard/all-jobs");

    actions.resetForm();
  };

  if (!userData) {
    return <Loading />;
  }

  return (
    <section className="rounded-md w-full bg-secondaryBgBase pt-12 px-8 pb-16">
      <Formik
        initialValues={{
          position: "",
          company: "",
          jobLocation: userData?.location,
          status: JOB_STATUS.PENDING,
          jobType: JOB_TYPE.FULL_TIME,
        }}
        validationSchema={addJobSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="form m-0 rounded-none shadow-none p-0 max-w-full w-full border-t-transparent">
            <h4 className="mb-8 text-2xl capitalize">add job</h4>
            <div className="grid gap-y-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] items-center gap-x-4">
              <FormRow type="text" name="position" labelText="position" />
              <FormRow type="text" name="company" labelText="company" />
              <FormRow
                type="text"
                name="jobLocation"
                labelText="job location"
              />
              <FormRowSelect
                labelText="job status"
                name="status"
                defaultValue={JOB_STATUS.PENDING}
                list={Object.values(JOB_STATUS)}
              />
              <FormRowSelect
                labelText="job type"
                name="jobType"
                defaultValue={JOB_TYPE.FULL_TIME}
                list={Object.values(JOB_TYPE)}
              />
              <SubmitBtn isSubmitting={props.isSubmitting} isFormBtn />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddJob;
