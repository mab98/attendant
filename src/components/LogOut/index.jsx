import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes.json';
import './styles.css';

const LogOut = ({ logoutAction }) => (
  <Link
    className="logout-button"
    to={routes.Home}
    onClick={() => logoutAction()}
  >
    LOG OUT
  </Link>
);

LogOut.propTypes = {
  logoutAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
LogOut.defaultProps = {
  logoutAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default LogOut;
