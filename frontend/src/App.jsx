import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
  Admin,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
import { selectThemeState } from "./features/themeSlice";
import { useSelector } from "react-redux";
import AllJobs from "./pages/AllJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: SVGComponentTransferFunctionElement,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { activeTheme } = useSelector(selectThemeState);
  document.querySelector("html").setAttribute("data-theme", activeTheme);

  return <RouterProvider router={router} />;
}

export default App;
