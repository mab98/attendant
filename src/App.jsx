import './App.css';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
          path="/"
          render={() => (
            <Redirect to="/user/login" />
          )}
        />
        <Route
          path="/user/login"
          render={() => (
            <MainLayout>
              <UserLoginPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/login"
          render={() => (
            <MainLayout>
              <AdminLoginPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/dashboard"
          render={() => (
            <MainLayout>
              <AdminAvailabilityPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/settings"
          render={() => (
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/adduser"
          render={() => (
            <MainLayout>
              <AddUserPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/updateuser/:userId"
          render={() => (
            <MainLayout>
              <UpdateUserPage />
            </MainLayout>
          )}
        />
        <Route
          path="/admin/stats"
          render={() => (
            <MainLayout>
              <AdminStatsPage />
            </MainLayout>
          )}
        />
        <Route
          path="/user/punchcard"
          render={() => (
            <MainLayout>
              <PunchCardPage />
            </MainLayout>
          )}
        />
        <Route
          path="/user/changepin"
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
