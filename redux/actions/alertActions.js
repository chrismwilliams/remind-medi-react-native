import { ADD_ALERT, DELETE_ALERT, GET_ALERTS } from "./types";

export const getAlerts = () => ({
  type: GET_ALERTS
});

export const deleteAlert = id => ({
  type: DELETE_ALERT,
  payload: id
});

export const addAlert = alert => ({
  type: ADD_ALERT,
  payload: alert
});
