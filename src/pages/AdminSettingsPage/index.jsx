import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { Link } from 'react-router-dom';
import routes from '../../routes.json';
import SearchBox from '../../components/SearchBox';
import { changeHours, deleteUserAction } from '../../store/actions';
import './styles.css';

const openNotification = (type) => {
  notification[type]({
    message: 'Time Changed Successfully',
  });
};

function insertUrlParams(params) {
  const actualRoute = routes.AdminUpdateUser;
  const updatedRoute = actualRoute.replace(':userId', params);
  return updatedRoute;
}

const SettingsPage = () => {
  const isAdminLoggedin = useSelector((state) => state.isAdminLoggedin);
  const users = useSelector((state) => state.users);
  const minWorkHours = useSelector((state) => state.minWorkHours);
  const officeStartHours = useSelector((state) => state.officeStartHours);
  const officeEndHours = useSelector((state) => state.officeEndHours);

  const [officeStartHoursS, setOfficeStartHoursS] = useState(officeStartHours);
  const [officeEndHoursInComp, setOfficeEndHoursInComp] = useState(officeEndHours);

  const [searchField, setSearchField] = useState('');
  const filteredUser = users
    .filter((user) => user.id.toLowerCase()
      .includes(searchField.toLowerCase()));

  const dispatch = useDispatch();

  const submitHours = (e) => {
    e.preventDefault();
    dispatch(
      changeHours({
        officeStartHours: officeStartHoursS,
        officeEndHours: officeEndHoursInComp,
      }),
    );
  };

  return (
    <div className="settings">
      <h1>Admin Settings Page</h1>
      {isAdminLoggedin
        ? (
          <div className="settings-container">
            <div className="users">
              <SearchBox
                placeholder="Search by ID"
                setSearchField={setSearchField}
              />

              <div className="user-row">
                <p className="user-id"><strong>ID</strong></p>
                <p className="user-fname"><strong>Firstname</strong></p>
                <p className="user-lname"><strong>Lastname</strong></p>
                <p className="user-email"><strong>Email</strong></p>
                <p className="user-dept"><strong>Department</strong></p>
                <p className="user-role"><strong>Role</strong></p>
                <p className="user-space" />
                <p className="user-space" />
                <p className="user-space" />
                <p className="user-space" />
              </div>

              {filteredUser
                ? (
                  filteredUser.map((user) => (
                    <div className="user-row" key={user.id}>
                      <p className="user-id">{user.id}</p>
                      <p className="user-fname">{user.firstname}</p>
                      <p className="user-lname">{user.lastname}</p>
                      <p className="user-email">{user.email}</p>
                      <p className="user-dept">{user.department}</p>
                      <p className="user-role">{user.role}</p>
                      <Link
                        to={{
                          pathname: insertUrlParams(user.id),
                        }}
                      >
                        <button
                          type="button"
                          className="user-update"
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="user-delete"
                        onClick={() => dispatch(deleteUserAction({ id: user.id }))}
                      >
                        Delete
                      </button>

                    </div>
                  )))
                : ''}
            </div>
            <div className="settings-group">
              <Link to={routes.AdminAddUser}>
                <button type="button" className="settings-btn">Add New User</button>
              </Link>
            </div>

            <form className="settings-form" onSubmit={submitHours}>
              <div className="settings-change-hours">
                <div className="settings-group">
                  <label htmlFor="minWorkHours">
                    Minimum Work Hours
                    <input
                      type="button"
                      id="minWorkHours"
                      className="settings-control"
                      value={minWorkHours}
                    />
                  </label>

                </div>
                <div className="settings-group">
                  <label htmlFor="officeStartHours">
                    Office Start Time
                    <input
                      type="time"
                      id="officeStartHours"
                      className="settings-control"
                      value={officeStartHoursS}
                      onChange={(e) => setOfficeStartHoursS(e.target.value)}
                    />
                  </label>
                </div>
                <div className="settings-group">
                  <label htmlFor="officeEndHours">
                    Office End Time
                    <input
                      type="time"
                      id="officeEndHours"
                      className="settings-control"
                      value={officeEndHoursInComp}
                      onChange={(e) => setOfficeEndHoursInComp(e.target.value)}
                    />
                  </label>
                </div>

              </div>

              <div className="settings-group">
                <button
                  type="submit"
                  onClick={() => openNotification('success')}
                >
                  Change Hours

                </button>
              </div>
            </form>
          </div>
        ) : null}

    </div>
  );
};

export default SettingsPage;
