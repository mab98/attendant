export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGIN_ADMIN_FAIL = 'LOGIN_ADMIN_FAIL';
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN';
export const CHANGE_HOURS = 'CHANGE_HOURS';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHANGE_AVAILABILITY = 'CHANGE_AVAILABILITY';
export const CHANGE_PIN = 'CHANGE_PIN';

export const SET_REDUCER_STATE = 'SET_REDUCER_STATE';

export const NO_PUNCH_OUT = 'NO_PUNCH_OUT';

export const addUserAction = (data) => ({
  type: ADD_USER,
  payload: data,
});

export const changeHours = (data) => ({
  type: CHANGE_HOURS,
  payload: data,
});

export const deleteUserAction = (data) => ({
  type: DELETE_USER,
  payload: data,
});

export const updateUserAction = (data) => ({
  type: UPDATE_USER,
  payload: data,
});

export const loginAdminAction = (data) => ({
  type: LOGIN_ADMIN,
  payload: data,
});

export const loginAdminFailAction = () => ({
  type: LOGIN_ADMIN_FAIL,
});

export const logoutAdminAction = () => ({
  type: LOGOUT_ADMIN,
});

export const loginUserAction = (data) => ({
  type: LOGIN_USER,
  payload: data,
});

export const loginUserFailAction = () => ({
  type: LOGIN_USER_FAIL,
});

export const logoutUserAction = () => ({
  type: LOGOUT_USER,
});

export const changeAvailabilityUserAction = (data) => ({
  type: CHANGE_AVAILABILITY,
  payload: data,
});

export const changePinUserAction = (data) => ({
  type: CHANGE_PIN,
  payload: data,
});

export const onNoPunchOutUserAction = () => ({
  type: NO_PUNCH_OUT,
});

export const setReducerState = (data) => ({
  type: SET_REDUCER_STATE,
  payload: data,
});
