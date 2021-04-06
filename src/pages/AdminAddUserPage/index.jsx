import './styles.css';

import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { notification } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addUserAction } from '../../store/actions';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  role: yup.string().required(),
});

const openNotification = (type) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const AddUserPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const { isAdminLoggedin, lastIdReached } = useSelector((state) => state);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const storeUser = () => {
    dispatch(
      addUserAction({
        firstname,
        lastname,
        email,
        department,
        role,
        firstTime: true,
        avgWorkHours: 0,
        available: 'Not Available',
        records: [],
        // {
        //   date: '',
        //   workHours: 0,
        //   timeIn: '',
        //   timeOut: '',
        // },
      }),
    );
    setFirstname('');
    setLastname('');
    setEmail('');
    setDepartment('');
    setRole('');
  };

  return (
    <div className="adduser">
      <div className="adduser-container">
        <h1>Add User Page</h1>
        {isAdminLoggedin ? (
          <form onSubmit={handleSubmit(storeUser)}>
            <div className="adduser-group">
              <input
                name="firstname"
                type="text"
                value={firstname}
                className="adduser-control"
                placeholder="Enter Firstname"
                onChange={(e) => setFirstname(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.firstname?.message}</p>
            </div>
            <div className="adduser-group">
              <input
                name="lastname"
                type="text"
                value={lastname}
                className="adduser-control"
                placeholder="Enter Lastname"
                onChange={(e) => setLastname(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.lastname?.message}</p>

            </div>
            <div className="adduser-group">
              <input
                name="email"
                type="text"
                value={email}
                className="adduser-control"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.email?.message}</p>

            </div>
            <div className="adduser-group">
              <input
                name="department"
                type="text"
                value={department}
                className="adduser-control"
                placeholder="Enter Department"
                onChange={(e) => setDepartment(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.department?.message}</p>
            </div>
            <div className="adduser-group">
              <input
                name="role"
                type="text"
                value={role}
                className="adduser-control"
                placeholder="Enter Role"
                onChange={(e) => setRole(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.role?.message}</p>

            </div>
            <div className="adduser-group">
              <input
                type="submit"
                onClick={() => openNotification('success')}
                className="adduser-btn"
                value="Add User"
              />
            </div>
            {lastIdReached === true ? (
              <Alert style={{ textAlign: 'center', color: 'red' }}>
                ID 999 HAS BEEN REACHED
              </Alert>
            ) : ''}
          </form>

        ) : null}
      </div>
    </div>
  );
};

export default AddUserPage;
