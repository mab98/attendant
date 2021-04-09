const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(cors());

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
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => {
    console.log('ADMIN-TOKEN:', response.data.access_token);
    res.send({ token: response.data.access_token });
  });
});

app.post('/authorize/user', (req, res) => {
  const clientID = 'ebef7c80ac59d127b94a';
  const clientSecret = '716baae943fa90c83a8598d722cca68bc3874bfb';
  const { code: requestToken } = req.body;
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => {
    console.log('USER-TOKEN:', response.data.access_token);
    res.send({ token: response.data.access_token });
  });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
