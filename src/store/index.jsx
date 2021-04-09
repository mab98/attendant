/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import constants from '../constants.json';

let getToken;
setTimeout(() => {
  getToken = (localStorage.getItem('token'));
  console.log('GET-TOKEN:', getToken);
}, 5000);

async function setData(data) {
  if (getToken) {
    const req = await fetch(`https://api.github.com/gists/${constants.GIST_ID}`, {
      method: 'PATCH',
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${getToken}`,
      },
      body: JSON.stringify({
        files: {
          [constants.GIST_FILENAME]: {
            content: JSON.stringify(data),
          },
        },
      }),
    });
    console.log('GIST UPDATED');
    return req.json();
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
