import { Link, Navigate } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import { Form, Formik } from "formik";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setupUser } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectAuthState);

  const handleSubmit = (values, actions) => {
    const dataUser = { email: values.email, password: values.password };

    dispatch(setupUser({ dataUser, endPoint: "login" }));

    actions.resetForm();
  };

  return (
    <section className="min-h-screen grid items-center">
      {userInfo && <Navigate to="/" replace />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="form max-w-md">
            <h4 className="text-center mb-5 text-3xl">Login</h4>
            <FormRow labelText="Email" type="email" name="email" />
            <FormRow labelText="Password" type="password" name="password" />
            <SubmitBtn isSubmitting={props.isSubmitting} />
            <p className="mt-4 text-center leading-6">
              Not a memberyet?
              <Link
                to="/register"
                className="text-primary-500 tracking-normal ml-1"
              >
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
