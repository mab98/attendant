import './styles.css';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { notification } from 'antd';
import routes from '../../routes.json';

import AdminForm from '../../components/AdminForm';
import AppContext from '../../context/app-context';

const openNotification = (type) => {
  notification[type]({
    message: 'User Updated Successfully',
  });
};

const UpdateUserPage = () => {
  const history = useHistory();
  const { users, updateUserAction } = useContext(AppContext);

  const { userId } = useParams();

  const updateUser = users.find((user) => user.id === userId);

  const [firstname, setFirstname] = useState(updateUser.firstname);
  const [lastname, setLastname] = useState(updateUser.lastname);
  const [email, setEmail] = useState(updateUser.email);
  const [department, setDepartment] = useState(updateUser.department);
  const [role, setRole] = useState(updateUser.role);

  const updateUserSubmit = () => {
    updateUserAction({
      id: userId, firstname, lastname, email, department, role,
    });
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
