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
      <Switch>
        <Route
          exact
          path={routes.Home}
          render={() => (
            <Redirect to={routes.UserLogin} />
          )}
        />
        <Route
          path={routes.UserLogin}
          render={() => (
            <MainLayout>
              <UserLoginPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminLogin}
          render={() => (
            <MainLayout>
              <AdminLoginPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminDashboard}
          render={() => (
            <MainLayout>
              <AdminAvailabilityPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminSettings}
          render={() => (
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminAddUser}
          render={() => (
            <MainLayout>
              <AddUserPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminUpdateUser}
          render={() => (
            <MainLayout>
              <UpdateUserPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.AdminStats}
          render={() => (
            <MainLayout>
              <AdminStatsPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.UserPunchcard}
          render={() => (
            <MainLayout>
              <PunchCardPage />
            </MainLayout>
          )}
        />
        <Route
          path={routes.UserChangePin}
          render={() => (
            <MainLayout>
              <UserChangePinPage />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
