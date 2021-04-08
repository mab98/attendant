/* eslint-disable no-shadow */
import './styles.css';
import React, { useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginAdminAction } from '../../store/actions';
import LoginForm from '../../components/LoginForm';

const openNotification = (type) => {
  notification[type]({
    message: 'Incorrect Credentials',
  });
};

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

  const isAdminLoggedin = useSelector((state) => state.isAdminLoggedin);

  const CLIENT_ID = '4c3c1d91cf3283d91a1b';
  const authenticateAdmin = () => {
    if (id === 'admin' && pin === '1111') {
      window.location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=gist`;
      dispatch(loginAdminAction({ isAdminLoggedin: true }));
    } else {
      openNotification('error');
    }
  };

  if (isAdminLoggedin) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <section className="loginpage">
      <h1>Admin Login Page</h1>
      <LoginForm authenticate={authenticateAdmin} setId={setId} setPin={setPin} linkTo="/user/login" entityTo="User" />

    </section>
  );
};

export default AdminLoginPage;
