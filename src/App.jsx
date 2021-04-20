import './App.css';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes.json';

// layouts
import MainLayout from './layouts/MainLayout';

// pages
import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminAvailabilityPage from './pages/AdminAvailabilityPage';
import SettingsPage from './pages/AdminSettingsPage';
import AddUserPage from './pages/AdminAddUserPage';
import UpdateUserPage from './pages/AdminUpdateUserPage';
import AdminStatsPage from './pages/AdminStatsPage';
import PunchCardPage from './pages/UserPunchCardPage';
import UserChangePinPage from './pages/UserChangePinPage';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Switch>
          <Route
            exact
            path={routes.Home}
            render={() => <Redirect to={routes.UserLogin} />}
          />
          <Route path={routes.UserLogin}>
            <UserLoginPage />
          </Route>
          <Route path={routes.AdminLogin}>
            <AdminLoginPage />
          </Route>
          <Route path={routes.AdminDashboard}>
            <AdminAvailabilityPage />
          </Route>
          <Route path={routes.AdminSettings}>
            <SettingsPage />
          </Route>
          <Route path={routes.AdminAddUser}>
            <AddUserPage />
          </Route>
          <Route path={routes.AdminUpdateUser}>
            <UpdateUserPage />
          </Route>
          <Route path={routes.AdminStats}>
            <AdminStatsPage />
          </Route>
          <Route path={routes.UserPunchcard}>
            <PunchCardPage />
          </Route>
          <Route path={routes.UserChangePin}>
            <UserChangePinPage />
          </Route>
        </Switch>
      </MainLayout>
    </div>
  );
}

export default App;
