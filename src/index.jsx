import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppState from './context/app-state';

ReactDOM.render(
  <AppState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppState>,
  document.getElementById('root'),
);
