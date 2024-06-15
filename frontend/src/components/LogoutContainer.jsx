import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, selectUserState } from "../features/userSlice";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { logOutUser, selectAuthState } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo } = useSelector(selectAuthState);
  const { userData } = useSelector(selectUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser({ token: userInfo }));
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        className="btn flex items-center justify-center gap-2 text-sm"
        type="button"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {userData?.name}
        <FaCaretDown />
      </button>
      <div
        className={`absolute top-11 left-0 w-full shadow-shadow-2 text-center  rounded-md bg-primary-500 ${
          showLogout ? "visible" : "invisible"
        }`}
      >
        <button
          className="rounded-md p-2 bg-transparent border border-transparent text-white tracking-wide capitalize cursor-pointer w-full h-full text-sm"
          type="button"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default LogoutContainer;
