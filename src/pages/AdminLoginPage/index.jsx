/* eslint-disable no-shadow */
import './styles.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginAdminAction, loginAdminFailAction } from '../../store/actions';

const schema = yup.object().shape({
  id: yup.string().required(),
  pin: yup.number().typeError('PIN Code Must be a Number').test('len', 'Must be 4 digits', (val) => val.toString().length === 4).required(),
});

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) });

  const state = useSelector((state) => state);

  const {
    admin, isAdminLoggedin, incorrectAdminCredentials,
  } = state;

  const CLIENT_ID = '4c3c1d91cf3283d91a1b';
  const authenticateAdmin = () => {
    if (id === admin.id && pin === admin.pin) {
      window.location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=gist`;
      dispatch(loginAdminAction({ isAdminLoggedin: true }));
    } else {
      dispatch(loginAdminFailAction());
    }
  };

  if (isAdminLoggedin === true) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <section className="loginpage">
      <h1>Admin Login Page</h1>
      <form onSubmit={handleSubmit(authenticateAdmin)}>

        <div className="loginpage-group">
          <input
            type="text"
            name="id"
            placeholder="Enter ID"
            className="loginpage-control"
            onChange={(e) => setId(e.target.value)}
            ref={register}
          />
          <p className="red">{errors.id?.message}</p>

        </div>

        <div className="loginpage-group">
          <input
            type="password"
            name="pin"
            placeholder="Enter PIN Code"
            className="loginpage-control"
            onChange={(e) => setPin(e.target.value)}
            ref={register}
          />
          <p className="red">{errors.pin?.message}</p>

        </div>

        <div className="loginpage-group">
          <input type="submit" className="loginpage-btn btn-default" value="Login" onClick={() => <Redirect to="/admin/dashboard" />} />
        </div>

        <div className="loginpage-group">
          <Link to="/user/login">
            <button type="button" className="loginpage-btn btn-default">User Page</button>
          </Link>
        </div>
        {incorrectAdminCredentials === true ? (
          <Alert style={{ textAlign: 'center', color: 'red' }}>
            INCORRECT CREDENTIALS
          </Alert>
        ) : ''}
      </form>

    </section>
  );
};

export default AdminLoginPage;
