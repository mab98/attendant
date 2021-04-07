import './styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.string().required(),
  pin: yup.number().typeError('PIN Code Must be a Number').required(),
});

const LoginForm = ({
  authenticate, setId, setPin, linkTo, entityTo,
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

    </form>
  );
};

LoginForm.propTypes = {
  authenticate: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  setPin: PropTypes.func.isRequired,
  linkTo: PropTypes.string.isRequired,
  entityTo: PropTypes.string.isRequired,
};

export default LoginForm;
