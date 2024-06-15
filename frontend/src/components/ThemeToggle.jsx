import { useDispatch, useSelector } from "react-redux";
import { selectThemeState, toggleTheme } from "../features/themeSlice";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { activeTheme } = useSelector(selectThemeState);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className="bg-transparent border border-transparent w-14 h-8 grid place-items-center cursor-pointer"
      onClick={handleToggle}
    >
      {activeTheme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default ThemeToggle;
