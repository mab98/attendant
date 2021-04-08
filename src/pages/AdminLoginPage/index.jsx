/* eslint-disable no-shadow */
import './styles.css';
import React, { useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes.json';
import constants from '../../constants.json';

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

  const authenticateAdmin = () => {
    if (id === constants.AdminId && pin === constants.AdminPin) {
      window.location = `https://github.com/login/oauth/authorize?client_id=${constants.AdminClientId}&scope=gist`;
      dispatch(loginAdminAction({ isAdminLoggedin: true }));
    } else {
      openNotification('error');
    }
  };

  if (isAdminLoggedin) {
    return <Redirect to={routes.AdminDashboard} />;
  }

  return (
    <section className="loginpage">
      <h1>Admin Login Page</h1>
      <LoginForm authenticate={authenticateAdmin} setId={setId} setPin={setPin} linkTo={routes.UserLogin} entityTo="User" />

    </section>
  );
};

export default AdminLoginPage;
