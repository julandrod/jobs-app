import { useDispatch, useSelector } from "react-redux";
import { selectUserState, updateUser } from "../features/userSlice";
import { Form, Formik } from "formik";
import { updateUserSchema } from "../schemas";
import { FormRow, Loading, SubmitBtn } from "../components";
import { selectAuthState } from "../features/authSlice";

const Profile = () => {
  const { userData } = useSelector(selectUserState);
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const newUserInfo = {
      name: values.name,
      lastName: values.lastName,
      location: values.location,
      email: values.email,
    };

    dispatch(updateUser({ newUserInfo, token: userInfo }));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (!userData) {
    return <Loading />;
  }

  return (
    <section className="rounded-md w-full bg-secondaryBgBase pt-12 px-8 pb-16">
      <Formik
        initialValues={{
          name: userData.name,
          lastName: userData.lastName,
          location: userData.location,
          email: userData.email,
        }}
        validationSchema={updateUserSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="form m-0 rounded-none shadow-none p-0 max-w-full w-full border-t-transparent">
            <h4 className="mb-8 text-2xl capitalize">profile</h4>
            <div className="grid gap-y-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] items-center gap-x-4">
              <FormRow
                type="text"
                name="name"
                labelText="name"
                defaultValue={userData?.name}
              />
              <FormRow
                type="text"
                name="lastName"
                labelText="last name"
                defaultValue={userData?.lastName}
              />
              <FormRow
                type="email"
                name="email"
                labelText="email"
                defaultValue={userData?.email}
              />
              <FormRow
                type="text"
                name="location"
                labelText="location"
                defaultValue={userData?.location}
              />
              <SubmitBtn isSubmitting={props.isSubmitting} isFormBtn />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Profile;
