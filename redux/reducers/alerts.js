import { ADD_ALERT, DELETE_ALERT } from "../actions/types";

const alerts = (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, { ...action.payload }];
    case DELETE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alerts;
