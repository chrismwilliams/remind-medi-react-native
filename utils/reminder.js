import { AsyncStorage } from "react-native";

const ExampleList = [
  {
    title: "Tablet 1",
    amount: 2,
    period: "2x Daily"
  },
  {
    title: "Tablet 2",
    amount: 1,
    period: "Monday, Wednesday"
  }
];

export const getAllReminders = () => {
  return ExampleList;
};
