import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";

const DashboardLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const { userInfo } = useSelector(selectAuthState);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <section>
      <main className="grid grid-cols-1 lg:grid-cols-custom-grid">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="w-fluid-width m-auto pt-8 lg:w-11/12">
            {isPageLoading ? <Loading /> : <Outlet />}
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
