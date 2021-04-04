import './styles.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { changePinUserAction } from '../../store/actions';

const schema = yup.object().shape({
  pin: yup.number().typeError('PIN Code Must b a Number').test('len', 'Must be 4 digits', (val) => val.toString().length === 4).required(),
});

const UserChangePinPage = () => {
  const [newPin, setNewPin] = useState('');

  const { users, currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUser = users.find((user) => user.id === currentUser.id);

  const changePin = () => {
    updateUser.pin = newPin;
    updateUser.firstTime = false;
    dispatch(changePinUserAction({ users }));
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

      const PROXY_URL = 'http://localhost:5000/authorize/user/changepin';

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(PROXY_URL, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((token) => {
          localStorage.setItem('token', JSON.stringify(token));
          console.log('SET-TOKEN:', token.token);
        })
        .catch((error) => {
          console.log('ERROR:', error);
        });
    }
  }, []);

  const CLIENT_ID = 'd0b4cbccb3d20f7137d7';
  if (updateUser.firstTime === false) {
    window.location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=gist`;
    return <Redirect to="/user/punchcard" />;
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
