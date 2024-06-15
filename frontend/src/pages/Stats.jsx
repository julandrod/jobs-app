import StatsContainer from "../components/StatsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getJobStats, selectJobState } from "../features/jobsSlice";
import { useEffect } from "react";
import { ChartsContainer, Loading } from "../components";
import { selectAuthState } from "../features/authSlice";

const Stats = () => {
  const { jobStats } = useSelector(selectJobState);
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobStats({ token: userInfo }));
  }, [dispatch, userInfo]);

  if (!jobStats) {
    return <Loading />;
  }

  return (
    <>
      <StatsContainer defaultStats={jobStats?.defaultStats} />
      {jobStats?.monthlyApplications?.length > 1 && (
        <ChartsContainer data={jobStats?.monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
