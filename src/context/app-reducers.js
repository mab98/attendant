/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
import { v1 as uuidv1 } from 'uuid';
import constants from '../constants.json';

import {
  LOGIN_ADMIN, LOGOUT_ADMIN, CHANGE_HOURS, ADD_USER, DELETE_USER, UPDATE_USER,
  LOGIN_USER, LOGOUT_USER, CHANGE_AVAILABILITY, CHANGE_PIN, NO_PUNCH_OUT, SET_REDUCER_STATE,
} from './app-actions';

function threeDigit(myNumber) {
  const formattedNumber = myNumber.toLocaleString('en-US', {
    minimumIntegerDigits: 3,
    useGrouping: false,
  });
  return formattedNumber;
}

function strToMins(t) {
  const s = t.split(':');
  return Number(s[0]) * 60 + Number(s[1]);
}

function minsToStr(t) {
  return `${Math.trunc(t / 60)}:${(`00${t % 60}`).slice(-2)}`;
}

const rootReducer = (state, action) => {
  const currentUser = state.users.find((user) => user.id === state.currentUser.id);

  const currentDate = new Date().toLocaleDateString(); // returns e.g. "4/20/2021"
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // returns e.g. "07:09"

  let { newUserRecord } = state;
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_ADMIN:
      setTimeout(() => {
        localStorage.clear();
      }, 1000);
      return { ...state, isAdminLoggedin: false };
    case ADD_USER:
      let { lastId } = state;
      lastId += 1;
      if (lastId === constants.MaxId) {
        state.lastIdReached = true;
      }
      return { ...state, lastId, users: [...state.users, { id: (`${action.payload.department}-${threeDigit(lastId)}`), pin: '0000', ...action.payload }] };
    case DELETE_USER:
      const newUsers = state.users.filter((user) => user.id !== action.payload.id);
      return { ...state, users: newUsers };
    case UPDATE_USER:
      const updateUser = state.users.find((user) => user.id === action.payload.id);
      updateUser.firstname = action.payload.firstname;
      updateUser.lastname = action.payload.lastname;
      updateUser.email = action.payload.email;
      updateUser.department = action.payload.department;
      updateUser.role = action.payload.role;
      return { ...state };
    case CHANGE_HOURS:
      let minHr = state.minWorkHours;
      const endHr = action.payload.officeEndHours;
      const startHr = action.payload.officeStartHours;
      minHr = parseInt(endHr, 10) - parseInt(startHr, 10);
      return { ...state, ...action.payload, minWorkHours: minHr };
    case LOGIN_USER:
      newUserRecord = true;
      return {
        ...state,
        ...action.payload,
        isUserLoggedin: true,
        newUserRecord,
      };
    case LOGOUT_USER:
      newUserRecord = false;
      setTimeout(() => {
        localStorage.clear();
      }, 1000);
      return {
        ...state, isUserLoggedin: false, currentUser: '', newUserRecord,
      };
    case CHANGE_AVAILABILITY:
      const newObj = {
        date: currentDate, timeIn: '', timeOut: '', workHours: '', id: uuidv1(),
      };
      if (newUserRecord) {
        const { records } = state.users.find((user) => user.id === state.currentUser.id);
        if (records.length === 0) {
          records.push(newObj);
        }
        if (records[records.length - 1].date !== currentDate) {
          records.push(newObj);
        }
        newUserRecord = false;
      }
      currentUser.available = action.payload;
      const alrERec = currentUser.records
        .find((record) => record.date === currentDate);
      if (action.payload === 'Available' && currentUser.records.length > 0
      && currentUser.records[currentUser.records.length - 1].timeIn === '') {
        alrERec.timeIn = currentTime;
      } else if (currentUser.records.length > 0) {
        if (currentUser.records[currentUser.records.length - 1].timeOut === '') {
          alrERec.timeOut = currentTime;
          alrERec.workHours = minsToStr(strToMins(alrERec.timeOut) - strToMins(alrERec.timeIn));
        }
        if (currentUser.records[currentUser.records.length - 1].timeIn !== '') {
          const sum = currentUser.records
            .reduce((acc, record) => acc += parseInt(record.workHours, 10), 0);
          currentUser.avgWorkHours = sum / currentUser.records.length;
        }
      }
      return { ...state, currentUser };
    case CHANGE_PIN:
      return { ...state, ...action.payload };
    case NO_PUNCH_OUT:
      if (state.currentUser.records.length > 0) {
        if (state.currentUser.records[state.currentUser.records.length - 1].timeOut === '') {
          state.currentUser.records.pop();
        }
      }
      currentUser.available = 'Not Available';
      return { ...state };
    case SET_REDUCER_STATE:
      return (action.payload);
    default:
      return state;
  }
};

export default rootReducer;
