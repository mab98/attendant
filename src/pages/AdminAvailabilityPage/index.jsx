/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import { Tabs } from 'antd';
import TableHeadings from '../../components/TableHeadings';

const { TabPane } = Tabs;

const AdminAvailabilityPage = () => {
  const state = useSelector((state) => state);
  const { isAdminLoggedin, users, proxyUrl } = state;
  const available = users.filter((item) => (item.available === 'Available'));
  const notAvailable = users.filter((item) => (item.available === 'Not Available'));
  const onLeave = users.filter((item) => (item.available === 'On Leave'));

  const [searchField, setSearchField] = useState('');

  const filteredUser = users.filter((user) => user.id.toLowerCase()
    .includes(searchField.toLowerCase()));

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, null, newUrl[0]);

      const requestData = {
        code: newUrl[1],
      };

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((token) => {
          localStorage.setItem('token', JSON.stringify(token));
          console.log('SET-TOKEN:', token.token);
        })
        .catch((error) => {
          console.log('ERROR:', error);
        });
    }
  }, []);

  return (

    <section className="dashboard">
      <h1>Today&apos;s Availability Page</h1>
      {isAdminLoggedin
        ? (
          <div className="dashboard-container">
            <input
              className="search-box"
              type="search"
              placeholder="Global Search by ID"
              onChange={(e) => setSearchField(e.target.value)}
            />

            {filteredUser.length > 0 && searchField !== ''
              ? (
                filteredUser.map((user) => (
                  <div className="user-row searched-data" key={user.id}>
                    <p className="user-id">{user.id}</p>
                    <p className="user-fname">{user.firstname}</p>
                    <p className="user-lname">{user.lastname}</p>
                    <p className="user-availability-email">{user.email}</p>
                    <p className="user-dept">{user.department}</p>
                    <p className="user-role">{user.role}</p>
                  </div>
                )))
              : null}

            <div className="dashboard-group">
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Available" key="1">
                  <TableHeadings />
                  {available.map((user) => (
                    <div className="user-row" key={user.id}>
                      <p className="user-id">{user.id}</p>
                      <p className="user-fname">{user.firstname}</p>
                      <p className="user-lname">{user.lastname}</p>
                      <p className="user-availability-email">{user.email}</p>
                      <p className="user-dept">{user.department}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                  ))}
                </TabPane>

                <TabPane tab="Not Available" key="2">
                  <TableHeadings />
                  {notAvailable.map((user) => (
                    <div className="user-row" key={user.id}>
                      <p className="user-id">{user.id}</p>
                      <p className="user-fname">{user.firstname}</p>
                      <p className="user-lname">{user.lastname}</p>
                      <p className="user-availability-email">{user.email}</p>
                      <p className="user-dept">{user.department}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                  ))}
                </TabPane>

                <TabPane tab="On Leave" key="3">
                  <TableHeadings />
                  {onLeave.map((user) => (
                    <div className="user-row" key={user.id}>
                      <p className="user-id">{user.id}</p>
                      <p className="user-fname">{user.firstname}</p>
                      <p className="user-lname">{user.lastname}</p>
                      <p className="user-availability-email">{user.email}</p>
                      <p className="user-dept">{user.department}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                  ))}
                </TabPane>

              </Tabs>
            </div>
            <div className="dashboard-group">
              <Link to="/admin/stats">
                <button type="button" className="dashboard-btn">Overall Stats</button>
              </Link>
            </div>
            <div className="dashboard-group">
              <Link to="/admin/settings">
                <button type="button" className="dashboard-btn">Settings</button>
              </Link>
            </div>
          </div>
        ) : null}

    </section>
  );
};

export default AdminAvailabilityPage;
