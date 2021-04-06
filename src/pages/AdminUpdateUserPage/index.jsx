import './styles.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { notification } from 'antd';
import { updateUserAction } from '../../store/actions';
import AdminForm from '../../components/AdminForm';

const openNotification = (type) => {
  notification[type]({
    message: 'User Updated Successfully',
  });
};

const UpdateUserPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { userId } = useParams();
  const updateUser = users.find((user) => user.id === userId);

  const [firstname, setFirstname] = useState(updateUser.firstname);
  const [lastname, setLastname] = useState(updateUser.lastname);
  const [email, setEmail] = useState(updateUser.email);
  const [department, setDepartment] = useState(updateUser.department);
  const [role, setRole] = useState(updateUser.role);

  const updateUserSubmit = () => {
    dispatch(updateUserAction({
      id: userId, firstname, lastname, email, department, role,
    }));
    setFirstname('');
    setLastname('');
    setEmail('');
    setDepartment('');
    setRole('');
    openNotification('success');
    setTimeout(() => {
      history.push('/admin/settings');
    }, 200);
  };

  return (
    <div className="dashboard">
      <div className="updateuser">
        <div className="updateuser-container">
          <h1>Update User Page</h1>
          <AdminForm
            submitForm={updateUserSubmit}
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
            btnName="Update"
          />
        </div>

      </div>
    </div>
  );
};

export default UpdateUserPage;
