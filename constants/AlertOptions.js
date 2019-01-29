const TimesPerDayOption = 10;

export const DailyOptions = [...Array(TimesPerDayOption)].map(
  (val, i) => i + 1
);

export const PeriodOptions = ["Daily", "Certain Days", "Other"];

export const DayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const MonthlyOptions = [...Array(4)].map((val, i) => i + 1);
