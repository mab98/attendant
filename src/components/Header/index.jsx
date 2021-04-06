/* eslint-disable no-sequences */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutAdminAction, logoutUserAction } from '../../store/actions';
import './styles.css';
import LogOut from '../LogOut';

const Header = () => {
  const { isAdminLoggedin, isUserLoggedin } = useSelector((state) => state);

  return (
    <header className="header">
      <h1>
        {isAdminLoggedin === true
          ? (
            <Link to="/admin/login">
              <span className="header-logo-text">Attendant</span>
            </Link>
          )
          : (
            <Link to="/">
              <span className="header-logo-text">Attendant</span>
            </Link>
          )}
      </h1>
      <div className="header-nav-items">
        <ul>
          <li className="header-li">
            {isAdminLoggedin === true
              ? (
                <LogOut logoutAction={logoutAdminAction(false)} />
              )
              : ''}
            {isUserLoggedin === true
              ? (
                <LogOut logoutAction={logoutUserAction(false)} />
              )
              : ''}
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
