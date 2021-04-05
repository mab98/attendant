/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const LogOut = ({ logoutAction }) => {
  const dispatch = useDispatch();

  return (
    <Link
      className="logout-button"
      to="/"
      onClick={() => dispatch(logoutAction)}
    >
      LOG OUT
    </Link>
  );
};

LogOut.defaultProps = {
  logoutAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default LogOut;
