import './styles.css';
import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import routes from '../../routes.json';
import constants from '../../constants.json';

import LoginForm from '../../components/LoginForm';
import AppContext from '../../context/app-context';

const openNotification = (type) => {
  notification[type]({
    message: 'Incorrect Credentials',
  });
};

const AdminLoginPage = () => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const { isAdminLoggedin, loginAdminAction } = useContext(AppContext);

  const visitOAuthLink = (clientId) => {
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;
  };

  const authenticateAdmin = () => {
    if (id === constants.AdminId && pin === constants.AdminPin) {
      visitOAuthLink(constants.AdminClientId);
      loginAdminAction({ isAdminLoggedin: true });
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
