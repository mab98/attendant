/* eslint-disable react/prop-types */
import './styles.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const { Option } = Select;

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
});

const AdminForm = ({
  submitForm, firstname, lastname, email, department, role, setFirstname, setLastname, setEmail,
  setDepartment, setRole, btnName,
}) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  function handleDepartment(value) {
    setDepartment(value);
  }
  function handleRole(value) {
    setRole(value);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
        <Select
          className="adduser-control"
          defaultValue={department === '' ? 'Choose Department' : department}
          style={{ width: '100%' }}
          onChange={handleDepartment}
        >
          <Option value="SE">Software Engineering</Option>
          <Option value="DE">Design Engineering</Option>
          <Option value="DV">DevOps Engineering</Option>
        </Select>
      </div>
      <div className="adduser-group">
        <Select className="adduser-control" defaultValue={role === '' ? 'Choose Role' : role} style={{ width: '100%' }} onChange={handleRole}>
          <Option value="Manager">Manager</Option>
          <Option value="Mentor">Mentor</Option>
          <Option value="Developer">Developer</Option>
        </Select>
      </div>

      <div className="adduser-group">
        <input
          type="submit"
          className="adduser-btn"
          value={`${btnName} User`}
        />
      </div>
    </form>
  );
};

AdminForm.protoTypes = {
  submitForm: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setFirstname: PropTypes.func.isRequired,
  setLastname: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setDepartment: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
  btnName: PropTypes.bool.isRequired,
};

export default AdminForm;
