import './styles.css';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { loginUserAction, loginUserFailAction } from '../../store/actions';
import { loadGistData } from '../../store/reducers';

const schema = yup.object().shape({
  id: yup.string().required(),
  pin: yup.number().typeError('PIN Code must be a 4 Digit Number').required(),
});

const UserLoginPage = () => {
  const {
    currentUser, incorrectUserCredentials, users,
    isAdminLoggedin,
  } = useSelector((state) => state);
  const [id, setId] = useState('ABC-1');
  const [pin, setPin] = useState('0000');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGistData());
  }, []);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const authenticateUser = () => {
    const reqUser = users.reduce((acc, item) => {
      if (id === item.id && pin === item.pin) return item;
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
          <form onSubmit={handleSubmit(authenticateUser)}>
            <div className="loginpage-group">
              <input
                name="id"
                type="text"
                placeholder="Enter ID"
                className="loginpage-control"
                onChange={(e) => setId(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.id?.message}</p>
            </div>

            <div className="loginpage-group">
              <input
                name="pin"
                type="password"
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
              <Link to="/admin/login">
                <button type="button" className="loginpage-btn btn-default">Admin Page</button>
              </Link>
            </div>
            {incorrectUserCredentials === true ? (
              <Alert style={{ textAlign: 'center', color: 'red' }}>
                INCORRECT CREDENTIALS
              </Alert>
            ) : ''}

          </form>

        )
      }

    </section>
  );
};
export default UserLoginPage;
