import { FaAlignLeft } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../features/authSlice";
import { Link } from "react-router-dom";
import LogoutContainer from "./LogoutContainer";
import Logo from "./Logo";
import { toggleSidebar } from "../features/themeSlice";

const Navbar = () => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <nav className="h-nav-height flex items-center justify-center shadow-shadow-nav bg-secondaryBgBase lg:sticky lg:top-0">
      <div className="flex w-fluid-width items-center justify-between lg:w-11/12">
        {userInfo && (
          <button
            type="button"
            onClick={() => dispatch(toggleSidebar())}
            className="bg-transparent border-transparent text-3xl text-primary-500 cursor-pointer flex items-center"
          >
            <FaAlignLeft />
          </button>
        )}
        <div>
          {!userInfo && (
            <Link to="/">
              <Logo />
            </Link>
          )}
          {userInfo && (
            <h4 className="hidden lg:block text-2xl font-semibold capitalize">
              dashboard
            </h4>
          )}
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          {userInfo && <LogoutContainer />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
