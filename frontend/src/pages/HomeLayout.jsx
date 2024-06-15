import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";

const HomeLayout = () => {
  const { userInfo } = useSelector(selectAuthState);

  return (
    <>
      {!userInfo && <Navbar />}
      <Outlet />
    </>
  );
};

export default HomeLayout;
