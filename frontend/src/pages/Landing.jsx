import {Link} from "react-router-dom"
import jobSearch from "../assets/job-search.png"


const Landing = () => {
  return (
    <section>
      <div className="custom-container min-h-[calc(100vh-6rem)] grid items-center lg:grid-cols-[1fr_400px] lg:gap-12">
        <div className="">
          <h1 className="font-bold text-6xl mb-6">
            Job <span className="text-primary-500">Finding</span> App
          </h1>
          <p className="leading-8 text-secondaryTextColor mb-6 max-w-4xl">Find your dream job ...</p>
          <Link to="/register" className="btn mr-6 py-3 px-4">Register</Link>
          <Link to="/login" className="btn py-3 px-4">Login</Link>
        </div> 
        <img src={jobSearch} alt="job hunt" className="w-full hidden lg:block object-cover "/>
      </div>
    </section>
  );
};

export default Landing;
