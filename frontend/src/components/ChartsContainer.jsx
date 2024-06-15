import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <section className="mt-16 text-center">
      <h4 className="text-center mb-3">Monthly Applications</h4>
      <button
        className="bg-transparent border-transparent capitalize text-primary-500 text-xl cursor-pointer"
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </section>
  );
};

export default ChartsContainer;
