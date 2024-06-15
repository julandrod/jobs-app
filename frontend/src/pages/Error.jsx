import { Link } from "react-router-dom";
import notFound from "../assets/not-found.png";

const Error = () => {
  // TODO: add user verification to dynamically reroute to home or dashboard

  return (
    <section className="min-h-screen text-center flex items-center justify-center">
      <div>
        <img
          src={notFound}
          alt="not found"
          className="w-fluid-width max-w-fixed-width block mb-8 -mt-12"
        />
        <h3 className="mb-2 text-4xl">Ohh! page not found</h3>
        <p className="leading-6 mt-2 mb-4 text-secondaryTextColor">
          we can't seem to find the page you are looking for
        </p>
        <Link to="/dashboard" className="text-primary-500 capitalize">
          back home
        </Link>
      </div>
    </section>
  );
};

export default Error;