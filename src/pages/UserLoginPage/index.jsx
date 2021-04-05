import './styles.css';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserAction, loginUserFailAction } from '../../store/actions';
import { loadGistData } from '../../store/reducers';
import LoginForm from '../../components/LoginForm';

const UserLoginPage = () => {
  const {
    currentUser, incorrectUserCredentials, users,
    isAdminLoggedin,
  } = useSelector((state) => state);
  const [id, setId] = useState('ABC-1');
  const [pin, setPin] = useState('0000');

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadGistData());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const CLIENT_ID = 'ebef7c80ac59d127b94a';
  const authenticateUser = () => {
    const reqUser = users.reduce((acc, item) => {
      if (id === item.id && pin === item.pin) {
        window.location = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=gist`;
        return item;
      }
      return acc;
    }, {});

    if (reqUser.id !== undefined) {
      dispatch(loginUserAction({ currentUser: reqUser }));
    } else {
      dispatch(loginUserFailAction());
    }
  };

  if (currentUser !== '') {
    return <Redirect to="/user/changepin" />;
  }

  return (
    <section className="loginpage">
      <h1>User Login Page</h1>
      {
        isAdminLoggedin ? null : (
          <LoginForm authenticate={authenticateUser} setId={setId} setPin={setPin} linkTo="/admin/login" entityTo="Admin" incorrectCredentials={incorrectUserCredentials} />
        )
      }

    </section>
  );
};
export default UserLoginPage;
