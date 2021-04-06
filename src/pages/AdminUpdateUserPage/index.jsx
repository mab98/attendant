import './styles.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { updateUserAction } from '../../store/actions';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  role: yup.string().required(),
});

const UpdateUserPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { userId } = useParams();
  const updateUser = users.find((user) => user.id === userId);

  const [firstname, setFirstname] = useState(updateUser.firstname);
  const [lastname, setLastname] = useState(updateUser.lastname);
  const [email, setEmail] = useState(updateUser.email);
  const [department, setDepartment] = useState(updateUser.department);
  const [role, setRole] = useState(updateUser.role);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUserSubmit = () => {
    dispatch(
      updateUserAction({
        id: userId,
        firstname,
        lastname,
        email,
        department,
        role,
      }),
    );
  };

  return (
    <div className="dashboard">

      <div className="updateuser">
        <div className="updateuser-container">
          <h1>Update User Page</h1>
          <form onSubmit={handleSubmit(updateUserSubmit)}>
            <div className="updateuser-group">
              <input
                name="firstname"
                type="text"
                className="updateuser-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.firstname?.message}</p>
            </div>
            <div className="updateuser-group">
              <input
                name="lastname"
                type="text"
                className="updateuser-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.lastname?.message}</p>
            </div>
            <div className="updateuser-group">
              <input
                name="email"
                type="text"
                className="updateuser-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.email?.message}</p>
            </div>
            <div className="updateuser-group">
              <input
                name="department"
                type="text"
                className="updateuser-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.department?.message}</p>
            </div>
            <div className="updateuser-group">
              <input
                name="role"
                type="text"
                className="updateuser-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                ref={register}
              />
              <p className="red">{errors.role?.message}</p>
            </div>
            <div className="updateuser-group">
              <input type="submit" className="updateuser-btn" value="Update User" />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UpdateUserPage;
