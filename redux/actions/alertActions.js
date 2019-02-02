import { ADD_ALERT, DELETE_ALERT } from "./types";

export const deleteAlert = id => ({
  type: DELETE_ALERT,
  payload: id
});

export const addAlert = alert => ({
  type: ADD_ALERT,
  payload: alert
});
