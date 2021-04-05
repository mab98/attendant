/* eslint-disable no-shadow */
import './styles.css';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginAdminAction, loginAdminFailAction } from '../../store/actions';
import LoginForm from '../../components/LoginForm';

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

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
      <LoginForm authenticate={authenticateAdmin} setId={setId} setPin={setPin} linkTo="/user/login" entityTo="User" incorrectCredentials={incorrectAdminCredentials} />

    </section>
  );
};

export default AdminLoginPage;
