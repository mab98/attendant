/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

let getToken;
let TOKEN;
setTimeout(() => {
  getToken = JSON.parse(localStorage.getItem('token'));
  if (getToken) { TOKEN = getToken.token; }
  console.log('GET-TOKEN:', TOKEN);
}, 5000);

const GIST_ID = 'b16b6fd67c637e4ca465b566a09b1032';
const GIST_FILENAME = 'db.json';

async function setData(data) {
  if (TOKEN) {
    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
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
