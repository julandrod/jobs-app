import { useDispatch, useSelector } from "react-redux";
import { getAdminStats, selectUserState } from "../features/userSlice";
import { Loading, StatItem } from "../components";
import { selectAuthState } from "../features/authSlice";
import { useEffect } from "react";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

const Admin = () => {
  const { adminStats } = useSelector(selectUserState);
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminStats({ token: userInfo }));
  }, [dispatch, userInfo]);

  if (!adminStats) {
    return <Loading />;
  }

  return (
    <section className="grid gap-y-8 md:grid-cols-[1fr_1fr] md:gap-x-4 lg:grid-cols-[1fr_1fr_1fr]">
      <StatItem
        title="current users"
        count={adminStats?.users}
        color={1}
        bgColor={1}
        icon={<FaSuitcaseRolling />}
      />
       <StatItem
        title="total jobs"
        count={adminStats?.jobs}
        color={2}
        bgColor={2}
        icon={<FaCalendarCheck />}
      />
    </section>
  );
};

export default Admin;
