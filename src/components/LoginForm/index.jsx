/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.string().required(),
  pin: yup.number().typeError('PIN Code Must be a Number').test('len', 'Must be 4 digits', (val) => val.toString().length === 4).required(),
});

const LoginForm = ({
  authenticate, setId, setPin, linkTo, entityTo, incorrectCredentials,
}) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(authenticate)}>
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
        <input type="submit" className="loginpage-btn btn-default" value="Login" />
      </div>

      <div className="loginpage-group">
        <Link to={linkTo}>
          <button type="button" className="loginpage-btn btn-default">
            {entityTo}
            {' '}
            Page
          </button>
        </Link>
      </div>
      {incorrectCredentials === true ? (
        <Alert style={{ textAlign: 'center', color: 'red' }}>
          INCORRECT CREDENTIALS
        </Alert>
      ) : ''}

    </form>
  );
};

export default LoginForm;
