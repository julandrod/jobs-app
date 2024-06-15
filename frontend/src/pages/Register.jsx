import { Link, Navigate } from "react-router-dom";
import { FormRow,  SubmitBtn } from "../components";
import { Form, Formik } from "formik";
import { registerSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setupUser } from "../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { statusCode, userInfo } = useSelector(selectAuthState);

  const handleSubmit = (values, actions) => {
    const dataUser = {
      name: values.name,
      lastName: values.lastName,
      location: values.location,
      email: values.email,
      password: values.password,
    };

    dispatch(setupUser({ dataUser, endPoint: "register" }));

    actions.resetForm();
  };

  return (
    <section className="min-h-screen grid items-center">
      {statusCode === 201 && <Navigate to="/login" replace />}
      {userInfo && <Navigate to="/" replace />}
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          location: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="form max-w-md">
            <h4 className="text-center mb-5 text-3xl">Register</h4>
            <FormRow labelText="Name" type="text" name="name" />
            <FormRow labelText="Last Name" type="text" name="lastName" />
            <FormRow labelText="Location" type="text" name="location" />
            <FormRow labelText="Email" type="email" name="email" />
            <FormRow labelText="Password" type="password" name="password" />
            <SubmitBtn isSubmitting={props.isSubmitting} />
            <p className="mt-4 text-center leading-6">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-primary-500 tracking-normal ml-1"
              >
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Register;
