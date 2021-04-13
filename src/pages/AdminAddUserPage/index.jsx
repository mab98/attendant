import './styles.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { notification } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { addUserAction } from '../../store/actions';
import routes from '../../routes.json';
import AdminForm from '../../components/AdminForm';

const openNotification = (type) => {
  notification[type]({
    message: 'User Added Successfully',
  });
};

const AddUserPage = () => {
  const history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const { isAdminLoggedin, lastIdReached } = useSelector((state) => state);

  const storeUser = () => {
    dispatch(addUserAction({
      firstname, lastname, email, department, role, firstTime: true, avgWorkHours: 0, available: 'Not Available', records: [],
    }));
    setFirstname('');
    setLastname('');
    setEmail('');
    setDepartment('');
    setRole('');
    openNotification('success');
    setTimeout(() => {
      history.push(routes.AdminSettings);
    }, 200);
  };

  return (
    <div className="adduser">
      <div className="adduser-container">
        <h1>Add User Page</h1>
        {isAdminLoggedin ? (
          <>
            <AdminForm
              submitForm={storeUser}
              firstname={firstname}
              lastname={lastname}
              email={email}
              department={department}
              role={role}
              setFirstname={setFirstname}
              setLastname={setLastname}
              setEmail={setEmail}
              setDepartment={setDepartment}
              setRole={setRole}
              btnName="Add"
            />
            {lastIdReached === true ? (
              <Alert style={{ textAlign: 'center', color: 'red' }}>
                ID 999 HAS BEEN REACHED
              </Alert>
            ) : ''}
          </>

        ) : null}
      </div>
    </div>
  );
};

export default AddUserPage;
