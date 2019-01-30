import { ADD_ALERT, DELETE_ALERT, GET_ALERTS } from "../actions/types";

const initialState = {
  alerts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS:
      return {
        alerts: [...state.alerts]
      };
    case ADD_ALERT:
      return {
        ...state,
        alerts: [action.payload, ...state.alerts]
      };
    case DELETE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert._id !== action.payload)
      };
    default:
      return state;
  }
};
