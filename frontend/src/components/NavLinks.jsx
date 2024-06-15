import { useDispatch, useSelector } from "react-redux";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { selectUserState } from "../features/userSlice";
import { toggleSidebar } from "../features/themeSlice";

const NavLinks = ({ isBigSidebar }) => {
  const { userData } = useSelector(selectUserState);
  const dispatch = useDispatch();

  return (
    <div className="pt-8 flex flex-col items-center">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && userData?.role !== "admin") return;
        return (
          <NavLink
            // TODO: avoid css redundant code
            className={({ isActive }) =>
              isActive
                ? `text-primary-500 w-11/12 pl-8 flex items-center py-4 capitalize transition duration-300 ease-in-out hover:text-primary-500 ${
                    isBigSidebar
                      ? "transition-[padding-left] duration-300 ease-in-out hover:pl-12 "
                      : ""
                  }`
                : `text-secondaryTextColor w-11/12 pl-8 flex items-center py-4 capitalize transition duration-300 ease-in-out hover:text-primary-500 ${
                    isBigSidebar
                      ? " transition-[padding-left] duration-300 ease-in-out hover:pl-12"
                      : ""
                  }`
            }
            to={path}
            key={text}
            onClick={isBigSidebar ? null : () => dispatch(toggleSidebar())}
            end
          >
            <span className="text-2xl mr-4 grid place-items-center">
              {icon}
            </span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
