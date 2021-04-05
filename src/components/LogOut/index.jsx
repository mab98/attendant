import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './styles.css';

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

LogOut.propTypes = {
  logoutAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
LogOut.defaultProps = {
  logoutAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default LogOut;
