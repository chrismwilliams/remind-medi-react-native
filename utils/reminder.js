// temp file
const ExampleList = [
  {
    id: "abc123",
    name: "Paracetamol",
    numOfTablets: 2,
    selectedPeriod: "Daily"
  },
  {
    id: "xyz789",
    name: "Ibuprofen",
    numOfTablets: 1,
    selectedPeriod: "Certain Days"
  }
];

export const getAllReminders = () => {
  return ExampleList;
};

export const getReminder = id => {
  return ExampleList.find(alert => alert.id === id);
};

export const deleteReminder = id => {
  ExampleList.splice(ExampleList.findIndex(i => i.id === id), 1);
};
