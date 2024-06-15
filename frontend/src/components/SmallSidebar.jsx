import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeState, toggleSidebar } from "../features/themeSlice";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { showSidebar } = useSelector(selectThemeState);
  const dispatch = useDispatch();

  return (
    <aside className="lg:hidden">
      <div
        className={`fixed inset-0 bg-sidebarBg flex justify-center items-center transition duration-300 ease-in-out ${
          showSidebar ? "z-[99] opacity-1 visible" : "invisible -z-[1] opacity-0"
        }`}
      >
        <div className="bg-secondaryBgBase w-fluid-width h-[95vh] rounded-md py-16 px-8 relative flex items-center flex-col">
          <button
            className="absolute top-3 left-3 bg-transparent border-transparent text-3xl text-red-dark cursor-pointer"
            type="button"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
