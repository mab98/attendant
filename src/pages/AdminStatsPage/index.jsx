import React, { useContext, useState } from 'react';
import './styles.css';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchBox from '../../components/SearchBox';
import AppContext from '../../context/app-context';

const AdminStatsPage = () => {
  const [searchField, setSearchField] = useState('');
  const [sortById, setSortById] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByWorkHours, setSortByWorkHours] = useState(false);
  const [timePeriod, setTimePeriod] = useState(1);

  const { isAdminLoggedin, users } = useContext(AppContext);

  if (sortById) {
    users.sort((a, b) => ((a.id > b.id) ? 1 : -1));
  }
  if (sortByName) {
    users.sort((a, b) => ((a.firstname > b.firstname) ? 1 : -1));
  }
  if (sortByWorkHours) {
    users.sort((a, b) => ((a.workHours < b.workHours) ? 1 : -1));
  }

  const timePeriodMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="text" onClick={() => setTimePeriod(1)}>1 month</Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="text" onClick={() => setTimePeriod(3)}>3 months</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="text" onClick={() => setTimePeriod(6)}>6 months</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="text" onClick={() => setTimePeriod(12)}>12 months</Button>
      </Menu.Item>
    </Menu>
  );

  const sortByMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="text"
          onClick={() => {
            setSortById(true);
            setSortByName(false);
            setSortByWorkHours(false);
          }}
        >
          ID
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="text"
          onClick={() => {
            setSortById(false);
            setSortByName(true);
            setSortByWorkHours(false);
          }}
        >
          Name
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          type="text"
          onClick={() => {
            setSortById(false);
            setSortByName(false);
            setSortByWorkHours(true);
          }}
        >
          Work Hours
        </Button>
      </Menu.Item>
    </Menu>
  );

  function dateDiffFinder(date) {
    const currentDate = new Date().toLocaleDateString();

    const day1 = new Date(date);
    const day2 = new Date(currentDate);
    // const day2 = new Date('6/30/2021');

    const difference = Math.abs(day2 - day1);
    const months = difference / (1000 * 3600 * 24) / 30;
    return months;
  }

  const userList = [];
  users.forEach((user) => {
    if (user.records.length === 0) { userList.push(user); }
    user.records.forEach((record) => {
      const diff = dateDiffFinder(record.date);
      if (diff <= timePeriod) {
        userList.push(user);
      }
    });
  });

  const filteredUser = users.filter((user) => (
    user.id.toLowerCase() + user.firstname.toLowerCase() + user.lastname.toLowerCase())
    .includes(searchField.toLowerCase()));

  return (
    <div className="settings">
      <h1>Admin Stats Page</h1>
      {isAdminLoggedin
        ? (

          <div className="settings-container">
            <SearchBox
              placeholder="Search Employee"
              setSearchField={setSearchField}
            />

            {filteredUser.length > 0 && searchField !== ''
              ? (
                filteredUser.map((user) => (
                  <div className="user-row searched-data" key={user.id}>
                    <p className="user-id">{user.id}</p>
                    <p className="user-name">
                      {user.firstname}
                      {' '}
                      {user.lastname}
                    </p>
                    <p className="user-workhours">
                      {user.records.length > 0 ? user.records[user.records.length - 1].workHours : 'Not logged in yet'}
                    </p>
                    <p className="user-workhours">{user.avgWorkHours}</p>
                  </div>
                )))
              : null}

            <div className="users">
              <div className="dropdown-menus">
                <Dropdown overlay={sortByMenu} placement="bottomCenter" arrow>
                  <Button
                    type="text"
                    className="dropdown-button"
                  >
                    Sort by
                    <DownOutlined />
                  </Button>
                </Dropdown>

                <Dropdown overlay={timePeriodMenu} placement="bottomCenter" arrow>
                  <Button
                    type="text"
                    className="dropdown-button"
                  >
                    Time Period
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div className="user-row">
                <p className="user-id"><strong>ID</strong></p>
                <p className="user-name"><strong>Name</strong></p>
                <p className="user-workhours"><strong>Work Hours</strong></p>
                <p className="user-workhours"><strong>Avg. Work Hours</strong></p>
              </div>

              {userList
                ? (
                  userList.map((user) => (
                    <div
                      className="user-row"
                      key={Math.random()}
                    >
                      <p className="user-id">{user.id}</p>
                      <p className="user-name">
                        {user.firstname}
                        {' '}
                        {user.lastname}
                      </p>
                      {
                        user.records.length > 0 ? <p className="user-workhours">{user.records[user.records.length - 1].workHours}</p> : <p className="user-workhours">Not logged in yet</p>
                      }

                      <p className="user-workhours">{user.avgWorkHours}</p>
                    </div>
                  )))
                : null}
            </div>
          </div>
        ) : null}

    </div>
  );
};

export default AdminStatsPage;
