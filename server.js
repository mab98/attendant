const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authorize/admin', (req, res) => {
  const clientID = '4c3c1d91cf3283d91a1b';
  const clientSecret = '899c735fc2cdd399f851a71a116a20815510c1be';
  const { code: requestToken } = req.body;
  let accessToken = '';
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => {
    accessToken = response.data.access_token;
    console.log('ADMIN-TOKEN:', accessToken);
    res.send({ token: accessToken });
  });
});

app.post('/authorize/user', (req, res) => {
  const clientID = 'ebef7c80ac59d127b94a';
  const clientSecret = '716baae943fa90c83a8598d722cca68bc3874bfb';
  const { code: requestToken } = req.body;
  let accessToken = '';
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => {
    accessToken = response.data.access_token;
    console.log('USER-TOKEN:', accessToken);
    res.send({ token: accessToken });
  });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
