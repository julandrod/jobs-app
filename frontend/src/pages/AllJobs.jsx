import { useDispatch, useSelector } from "react-redux";
import { JobsContainer, SearchContainer } from "../components"
import { selectAuthState } from "../features/authSlice";
import { useEffect } from "react";
import { getAllJobs } from "../features/jobsSlice";

const AllJobs = () => {
  const { userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllJobs({ token: userInfo }));
  }, [dispatch, userInfo]);

  return (
    <>
     <SearchContainer />
     <JobsContainer />
    </>
  )
}

export default AllJobs