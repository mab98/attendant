import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { rootReducer } from './reducers';
import constants from '../constants.json';

let getToken;
setTimeout(() => {
  getToken = (localStorage.getItem('token'));
  console.log('GET-TOKEN:', getToken);
}, 5000);

// eslint-disable-next-line consistent-return
async function setData(data) {
  const headers = {
    accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${getToken}`,
  };
  const files = {
    [constants.GIST_FILENAME]: {
      content: JSON.stringify(data),
    },
  };

  if (getToken) {
    const req = await axios.patch(`https://api.github.com/gists/${constants.GIST_ID}`, { files }, { headers });
    console.log('GIST UPDATED');
    return req;
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
}

store.subscribe(() => {
  setData(store.getState());
});

store.subscribe(() => saveToLocalStorage(store.getState()));
