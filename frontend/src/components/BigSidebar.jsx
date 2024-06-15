import { useSelector } from "react-redux";
import { selectThemeState } from "../features/themeSlice";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar } = useSelector(selectThemeState);

  return (
    <aside className="hidden lg:block shadow-shadow-sidebar">
      <div className={`bg-secondaryBgBase min-h-screen h-full w-64  transition-margin-left duration-300 ease-in-out ${showSidebar ? "ml-0": "-ml-64"}`}>
        <div className="sticky top-0">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
