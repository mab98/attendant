/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducer from './reducers';

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

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

store.subscribe(() => {
  setData(store.getState());
});
