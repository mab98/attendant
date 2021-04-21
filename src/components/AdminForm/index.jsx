/* eslint-disable react/jsx-props-no-spreading */
import './styles.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Select,
} from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AdminForm = ({
  // eslint-disable-next-line no-unused-vars
  submitForm, firstname, lastname, email, department, role, setFirstname, setLastname, setEmail,
  setDepartment, setRole, btnName,
}) => {
  const [form] = Form.useForm();

  const [fields] = useState([
    { name: ['firstname'], value: firstname },
    { name: ['lastname'], value: lastname },
    { name: ['email'], value: email },
    { name: ['department'], value: department === '' ? null : department },
    { name: ['role'], value: role === '' ? null : role },
  ]);

  function handleDepartment(value) {
    setDepartment(value);
  }
  function handleRole(value) {
    setRole(value);
  }

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={submitForm}
      fields={fields}
    >
      <div className="adduser-group">
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="Enter Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Item>
      </div>
      <div className="adduser-group">
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="Enter Lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Item>
      </div>
      <div className="adduser-group">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input
            // value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
      </div>
      <div className="adduser-group">
        <Form.Item
          name="department"
          label="Department"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a Department"
            // value={department === '' ? null : department}
            style={{ width: '100%' }}
            onChange={handleDepartment}
            allowClear
          >
            <Option value="SE">Software Engineering</Option>
            <Option value="DE">Design Engineering</Option>
            <Option value="DV">DevOps Engineering</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="adduser-group">
        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a Role"
            // value={role === '' ? null : role}
            style={{ width: '100%' }}
            onChange={handleRole}
            allowClear
          >
            <Option value="Manager">Manager</Option>
            <Option value="Mentor">Mentor</Option>
            <Option value="Developer">Developer</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="adduser-group">
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {`${btnName} User`}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

AdminForm.propTypes = {
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
  btnName: PropTypes.string.isRequired,
};

export default AdminForm;
