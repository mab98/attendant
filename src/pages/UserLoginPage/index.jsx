import './styles.css';
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes.json';
import constants from '../../constants.json';

import { loginUserAction } from '../../store/actions';
import { loadGistData } from '../../store/reducers';
import LoginForm from '../../components/LoginForm';

const openNotification = (type) => {
  notification[type]({
    message: 'Incorrect Credentials',
  });
};

const UserLoginPage = () => {
  const isAdminLoggedin = useSelector((state) => state.isAdminLoggedin);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);

  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadGistData());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const authenticateUser = () => {
    const reqUser = users.reduce((acc, item) => {
      if (id === item.id && pin === item.pin) {
        window.location = `https://github.com/login/oauth/authorize?client_id=${constants.UserClientId}&scope=gist`;
        return item;
      }
      return acc;
    }, {});

    if (reqUser.id !== undefined) {
      dispatch(loginUserAction({ currentUser: reqUser }));
    } else {
      openNotification('error');
    }
  };

  if (currentUser !== '') {
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
