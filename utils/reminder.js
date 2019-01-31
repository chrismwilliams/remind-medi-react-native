const ExampleList = [
  {
    id: "abc123",
    title: "Tablet 1",
    amount: 2,
    period: "2x Daily"
  },
  {
    id: "xyz789",
    title: "Tablet 2",
    amount: 1,
    period: "Monday, Wednesday"
  }
];

export const getAllReminders = () => {
  return ExampleList;
};

export const getReminder = id => {
  return ExampleList.find(alert => alert.id === id);
};
