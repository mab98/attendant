import './styles.css';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes.json';
import AppContext from '../../context/app-context';

import constants from '../../constants.json';

const schema = yup.object().shape({
  pin: yup.number().typeError('PIN Code must be a Number').test('len', 'Must be 4 digits', (val) => val.toString().length === 4).required(),
});

const getAccessTokenFromServer = async (url, code) => {
  try {
    const req = await axios.post(url, code);
    const token = await req.data.token;
    localStorage.setItem('token', token);
    console.log('SetUserToken:', token);
  } catch (error) {
    console.error('ERROR:', error);
  }
};

const UserChangePinPage = () => {
  const history = useHistory();
  const { currentUser, users, changePinUserAction } = useContext(AppContext);
  const [newPin, setNewPin] = useState('');

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUser = users.find((user) => user.id === currentUser.id);

  const changePin = () => {
    currentUser.pin = newPin;
    updateUser.pin = newPin;
    updateUser.firstTime = false;
    changePinUserAction({ users, currentUser });
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, null, newUrl[0]);

      const requestData = {
        code: newUrl[1],
      };

      getAccessTokenFromServer(constants.UserProxyUrl, requestData);
    }
  }, []);

  if (updateUser && updateUser.firstTime === false) {
    setTimeout(() => history.push(routes.UserPunchcard),
      100);
  }

  return (
    <div className="changepin">
      <div className="changepin-container">
        <h1>Change Pin Page</h1>
        <form onSubmit={handleSubmit(changePin)}>
          <div className="changepin-group">
            <input
              name="pin"
              type="password"
              className="changepin-control"
              placeholder="Enter New Pin"
              onChange={(e) => setNewPin(e.target.value)}
              ref={register}
            />
            <p className="red">{errors.pin?.message}</p>
          </div>
          <div className="changepin-group">
            <input type="submit" className="changepin-btn" value="Update PIN" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChangePinPage;
