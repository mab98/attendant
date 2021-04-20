import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes.json';
import './styles.css';
import LogOut from '../LogOut';
import AppContext from '../../context/app-context';

const Header = () => {
  const {
    isAdminLoggedin, isUserLoggedin, logoutAdminAction, logoutUserAction,
  } = useContext(AppContext);

  return (
    <header className="header">
      <h1>
        {isAdminLoggedin === true
          ? (
            <Link to={routes.AdminLogin}>
              <span className="header-logo-text">Attendant</span>
            </Link>
          )
          : (
            <Link to={routes.Home}>
              <span className="header-logo-text">Attendant</span>
            </Link>
          )}
      </h1>
      <div className="header-nav-items">
        <ul>
          <li className="header-li">
            {isAdminLoggedin || isUserLoggedin ? <LogOut logoutAction={isAdminLoggedin ? logoutAdminAction : logoutUserAction} /> : ''}
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
