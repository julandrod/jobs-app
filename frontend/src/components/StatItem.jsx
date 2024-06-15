const StatItem = ({ count, title, icon, color, bgColor }) => {
  const borderBottomColor = {
    1: "border-b-statItemColor-0",
    2: "border-b-statItemColor-1",
    3: "border-b-statItemColor-2",
  };

  const textCountColor = {
    1: "text-statItemColor-0",
    2: "text-statItemColor-1",
    3: "text-statItemColor-2",
  };

  const bgIconColor = {
    1: "bg-statItemBg-0",
    2: "bg-statItemBg-1",
    3: "bg-statItemBg-2",
  };

  return (
    <article
      className={`p-8 pt-12 bg-secondaryBgBase ${borderBottomColor[color]} border-b-4 rounded-md`}
    >
      <header className="flex items-center justify-between">
        <span
          className={`block font-bold text-5xl ${textCountColor[color]} leading-8`}
        >
          {count}
        </span>
        <span
          className={`w-16 h-14 ${bgIconColor[bgColor]} rounded-md flex items-center justify-center text-3xl ${textCountColor[color]}`}
        >
          {icon}
        </span>
      </header>
      <h5 className="m-0 capitalize tracking-wide text-left mt-6 text-xl">{title}</h5>
    </article>
  );
};

export default StatItem;
