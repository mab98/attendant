import './styles.css';
import React, { useContext, useState } from 'react';
// import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import routes from '../../routes.json';
// import constants from '../../constants.json';

import LoginForm from '../../components/LoginForm';
import AppContext from '../../context/app-context';

const openNotification = (type) => {
  notification[type]({
    message: 'Incorrect Credentials',
  });
};

const UserLoginPage = () => {
  const {
    isAdminLoggedin, users, currentUser, loginUserAction,
  } = useContext(AppContext);

  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     loadGistData();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // const visitOAuthLink = (clientId) => {
  //   window.location = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;
  // };

  const authenticateUser = () => {
    const reqUser = users.reduce((acc, item) => {
      if (id === item.id && pin === item.pin) {
        // visitOAuthLink(constants.UserClientId);
        return item;
      }
      return acc;
    }, {});

    if (reqUser.id) {
      loginUserAction({ currentUser: reqUser });
    } else {
      openNotification('error');
    }
  };

  if (currentUser) {
    return <Redirect to={routes.UserChangePin} />;
  }

  return (
    <section className="loginpage">
      <h1>User Login Page</h1>
      {
        isAdminLoggedin ? null : (
          <LoginForm authenticate={authenticateUser} setId={setId} setPin={setPin} linkTo={routes.AdminLogin} entityTo="Admin" />
        )
      }

    </section>
  );
};
export default UserLoginPage;
