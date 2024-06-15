import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: 1,
      bgColor: 1,
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: 2,
      bgColor: 2,
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: 3,
      bgColor: 3,
    },
  ];

  return (
    <section className="grid gap-y-8 md:grid-cols-[1fr_1fr] md:gap-x-4 lg:grid-cols-[1fr_1fr_1fr]">
      {stats.map((item) => (
        <StatItem
          key={item.title}
          count={item.count}
          title={item.title}
          icon={item.icon}
          color={item.color}
          bgColor={item.bgColor}
        />
      ))}
    </section>
  );
};

export default StatsContainer;
