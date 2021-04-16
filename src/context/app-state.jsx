/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import constants from '../constants.json';
import AppContext from './app-context';
import rootReducer from './app-reducers';
import {
  LOGIN_ADMIN, LOGOUT_ADMIN,
  CHANGE_HOURS, ADD_USER, DELETE_USER, UPDATE_USER,
  LOGIN_USER, LOGOUT_USER, CHANGE_AVAILABILITY,
  CHANGE_PIN, NO_PUNCH_OUT,
} from './app-actions';

const AppState = ({ children }) => {
  function loadFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem('state'));
    } catch (error) {
      return undefined;
    }
  }
  const persistedState = loadFromLocalStorage();

  const initialState = localStorage.getItem('state')
    ? { ...persistedState } : {
      users: [],
      isAdminLoggedin: false,
      isUserLoggedin: false,
      currentUser: '',
      minWorkHours: '9',
      officeStartHours: '09:00',
      officeEndHours: '18:00',
      lastIdReached: false,
      lastId: -1,
      newUserRecord: false,
    };

  const [state, dispatch] = useReducer(rootReducer, initialState);

  function saveToLocalStorage(data) {
    try {
      localStorage.setItem('state', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  let getToken;
  useEffect(() => {
    getToken = (localStorage.getItem('token'));
    console.log('GET-TOKEN:', getToken);
  });

  async function updateGist(data) {
    if (getToken) {
      const req = await axios.patch(`https://api.github.com/gists/${constants.GIST_ID}`, {
        files: {
          [constants.GIST_FILENAME]: {
            content: JSON.stringify(data),
          },
        },
      }, {
        headers: {
          accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log('GIST UPDATED');
      return req;
    }
    return null;
  }

  useEffect(() => {
    saveToLocalStorage(state);
    updateGist(state);
  }, [state]);

  const addUserAction = (data) => {
    dispatch({
      type: ADD_USER,
      payload: data,
    });
  };

  const changeHours = (data) => {
    dispatch({
      type: CHANGE_HOURS,
      payload: data,
    });
  };

  const deleteUserAction = (data) => {
    dispatch({
      type: DELETE_USER,
      payload: data,
    });
  };

  const updateUserAction = (data) => {
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
  };

  const loginAdminAction = (data) => {
    dispatch({
      type: LOGIN_ADMIN,
      payload: data,
    });
  };

  const logoutAdminAction = () => {
    dispatch({
      type: LOGOUT_ADMIN,
    });
  };

  const loginUserAction = (data) => {
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
  };

  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT_USER,
    });
  };

  const changeAvailabilityUserAction = (data) => {
    dispatch({
      type: CHANGE_AVAILABILITY,
      payload: data,
    });
  };

  const changePinUserAction = (data) => {
    dispatch({
      type: CHANGE_PIN,
      payload: data,
    });
  };

  const onNoPunchOutUserAction = () => {
    dispatch({
      type: NO_PUNCH_OUT,
    });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addUserAction,
      changeHours,
      deleteUserAction,
      updateUserAction,
      loginAdminAction,
      logoutAdminAction,
      loginUserAction,
      logoutUserAction,
      changeAvailabilityUserAction,
      changePinUserAction,
      onNoPunchOutUserAction,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
