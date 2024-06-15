import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAuthState } from "../features/authSlice";
import { useEffect } from "react";
import { editJob, getSingleJob, selectJobState } from "../features/jobsSlice";
import { FormRow, FormRowSelect, Loading, SubmitBtn } from "../components";
import { Form, Formik } from "formik";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const EditJob = () => {
  const { id } = useParams();
  const { userInfo } = useSelector(selectAuthState);
  const { singleJob } = useSelector(selectJobState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleJob({ jobId: id, token: userInfo }));
  }, [dispatch, id, userInfo]);

  const handleSubmit = (values) => {
    dispatch(editJob({ infoJob: { ...values }, jobId: id, token: userInfo }));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (!singleJob) {
    return <Loading />;
  }

  return (
    <section className="rounded-md w-full bg-secondaryBgBase pt-12 px-8 pb-16">
      <Formik
        initialValues={{
          position: singleJob?.position,
          company: singleJob?.company,
          jobLocation: singleJob?.jobLocation,
          status: singleJob?.status,
          jobType: singleJob?.jobType,
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="form m-0 rounded-none shadow-none p-0 max-w-full w-full border-t-transparent">
            <h4 className="mb-8 text-2xl capitalize">edit job</h4>
            <div className="grid gap-y-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] items-center gap-x-4">
              <FormRow
                type="text"
                name="position"
                defaultValue={singleJob?.position}
                labelText="position"
              />
              <FormRow
                type="text"
                name="company"
                defaultValue={singleJob?.company}
                labelText="company"
              />
              <FormRow
                type="text"
                name="jobLocation"
                defaultValue={singleJob?.jobLocation}
                labelText="job location"
              />
              <FormRowSelect
                name="status"
                labelText="status"
                defaultValue={singleJob?.status}
                list={Object.values(JOB_STATUS)}
              />
              <FormRowSelect
                name="jobType"
                labelText="job type"
                defaultValue={singleJob?.jobType}
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

export default EditJob;
