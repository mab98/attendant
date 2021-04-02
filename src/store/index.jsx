/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducer from './reducers';

const { GIST_ID, GIST_FILENAME } = process.env;
const token = JSON.parse(localStorage.getItem('token'));
let TOKEN;
if (token) { TOKEN = token.token; console.log(TOKEN); }

async function setData(data) {
  if (TOKEN) {
    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
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
    return req.json();
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

store.subscribe(() => {
  console.log(store.getState());
  setData(store.getState());
  console.log('CHECK GIST');
});
