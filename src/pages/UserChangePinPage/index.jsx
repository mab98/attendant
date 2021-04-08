import './styles.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import routes from '../../routes.json';
import constants from '../../constants.json';

import { changePinUserAction } from '../../store/actions';

const schema = yup.object().shape({
  pin: yup.number().typeError('PIN Code must be a Number').test('len', 'Must be 4 digits', (val) => val.toString().length === 4).required(),
});

const UserChangePinPage = () => {
  const history = useHistory();
  const [newPin, setNewPin] = useState('');

  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUser = users.find((user) => user.id === currentUser.id);

  const changePin = () => {
    currentUser.pin = newPin;
    updateUser.pin = newPin;
    updateUser.firstTime = false;
    dispatch(changePinUserAction({ users, currentUser }));
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

      fetch(constants.UserProxyUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((token) => {
          localStorage.setItem('token', JSON.stringify(token));
          console.log('SetUserToken:', token.token);
        })
        .catch((error) => {
          console.log('ERROR:', error);
        });
    }
  }, []);

  if (updateUser.firstTime === false) {
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
