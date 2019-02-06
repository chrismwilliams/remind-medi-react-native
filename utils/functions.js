export const uniqueID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
};

export const sortDays = daysArray => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const sortedDaysArray = daysArray.sort((a, b) => {
    a = days.indexOf(a);
    b = days.indexOf(b);
    return a < b ? 0 : 1;
  });

  return sortedDaysArray;
};
