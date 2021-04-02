/* eslint-disable no-sequences */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdminAction, logoutUserAction } from '../../store/actions';
import './styles.css';

const Header = () => {
  const { isAdminLoggedin, isUserLoggedin } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <header className="header">
      <h1>
        <Link to="/">
          <span className="header-logo-text">Attendant</span>
        </Link>
      </h1>
      <div className="header-nav-items">
        <ul>
          <li className="header-li">
            {isAdminLoggedin === true
              ? (
                <Link
                  className="logout-button"
                  to="/"
                  onClick={() => dispatch(logoutAdminAction(false))}
                >
                  LOG OUT
                </Link>
              )
              : ''}
            {isUserLoggedin === true
              ? (
                <Link
                  className="logout-button"
                  to="/"
                  onClick={() => dispatch(logoutUserAction(false))}
                >
                  LOG OUT
                </Link>
              )
              : ''}
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
