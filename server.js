/* eslint-disable camelcase */
const bodyParser = require('body-parser');
const express = require('express');
const FormData = require('form-data');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authorizeadmin', (req, res) => {
  const admin_clientId = '4c3c1d91cf3283d91a1b';
  const admin_clientSecret = '899c735fc2cdd399f851a71a116a20815510c1be';
  const admin_redirectUri = 'http://localhost:3000/admin/dashboard';

  const { code } = req.body;

  const data = new FormData();
  data.append('client_id', admin_clientId);
  data.append('client_secret', admin_clientSecret);
  data.append('code', code);
  data.append('redirectUri', admin_redirectUri);

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      const params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');
      console.log('ADMIN-TOKEN:', access_token);
      res.send({ token: access_token });
    });
});

app.post('/authorizeuser', (req, res) => {
  const user_clientId = 'ebef7c80ac59d127b94a';
  const user_clientSecret = '716baae943fa90c83a8598d722cca68bc3874bfb';
  const user_redirectUri = 'http://localhost:3000/user/changepin';

  const { code } = req.body;

  const data = new FormData();
  data.append('client_id', user_clientId);
  data.append('client_secret', user_clientSecret);
  data.append('code', code);
  data.append('redirectUri', user_redirectUri);

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      const params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');
      console.log('USER-TOKEN:', access_token);
      res.send({ token: access_token });
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
