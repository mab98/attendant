/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducer from './reducers';

// const { GIST_ID, GIST_FILENAME } = process.env;
// const TOKEN = JSON.parse(localStorage.getItem('token'));

// async function setData(data) {
//   const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
//     method: 'PATCH',
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//     body: JSON.stringify({
//       files: {
//         [GIST_FILENAME]: {
//           content: JSON.stringify(data),

//         },
//       },
//     }),
//   });
//   return req.json();
// }

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

store.subscribe(() => {
  // setData(store.getState);
  console.log(store.getState());
});
