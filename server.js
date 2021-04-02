/* eslint-disable camelcase */
const express = require('express');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const fetch = require('node-fetch');

const clientId = '4c3c1d91cf3283d91a1b';
const clientSecret = '899c735fc2cdd399f851a71a116a20815510c1be';
const redirectUri = 'http://localhost:3000/admin/dashboard';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authenticate', (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);
  data.append('code', code);
  data.append('redirectUri', redirectUri);

  // Request to exchange code for an access token
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      const params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');
      console.log('ACCESS TOKEN:', access_token);

      // Request to return data of a user that has been authenticated
      // return fetch('https://api.github.com/gists', {
      //   headers: {
      //     Authorization: `token ${access_token}`,
      //   },
      // });
      res.send({ token: access_token });
    });
  // .then((response) => response.json())
  // .then((response) => res.status(200).json(response))
  // .catch((error) => res.status(400).json(error));
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// route fetch new route using token from localstorage
