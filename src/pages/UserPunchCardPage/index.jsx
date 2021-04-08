/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Modal, Button } from 'antd';
import { changeAvailabilityUserAction, onNoPunchOutUserAction } from '../../store/actions';
import './styles.css';
import SearchBox from '../../components/SearchBox';

const PunchCardPage = () => {
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const officeStartHours = useSelector((state) => state.officeStartHours);
  const officeEndHours = useSelector((state) => state.officeEndHours);

  const [searchField, setSearchField] = useState('');
  const [late, setLate] = useState(false);

  let filteredRecord;
  if (currentUser !== '') {
    filteredRecord = currentUser.records
      .filter((user) => user.date.includes(searchField));
  }
  const dispatch = useDispatch();
  let availability;
  if (currentUser) {
    availability = users.find((user) => user.id === currentUser.id).available;
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    const interval = setInterval(() => {
      if (((currentTime > officeEndHours))) {
        setLate(true);
        dispatch(onNoPunchOutUserAction());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="punchcard-page">
      <h1>PUNCH CARD PAGE</h1>

      {
        currentUser !== ''
          ? (
            <>
              <div className="punchcard-card">
                <Avatar
                  style={{
                    backgroundColor: 'orange',
                    verticalAlign: 'middle',
                  }}
                  size="large"
                  gap={4}
                >
                  {currentUser.firstname}
                </Avatar>
                <p>
                  <strong>Firstname: </strong>
                  {currentUser.firstname}
                </p>
                <p>
                  <strong>Lastname: </strong>
                  {currentUser.lastname}
                </p>
                <p>
                  <strong>Email: </strong>
                  {currentUser.email}
                </p>
                <p>
                  <strong>Department: </strong>
                  {currentUser.department}
                </p>
                <p>
                  <strong>Role: </strong>
                  {currentUser.role}
                </p>
                <p>
                  <strong>
                    Availability Status:
                  </strong>
                  {' '}
                  {availability}
                </p>
                {availability === 'Available' ? (
                  <>
                    {
                    currentTime < officeEndHours
                      ? <Button type="button" onClick={() => dispatch(changeAvailabilityUserAction('Not Available'))}>Punch Out</Button>
                      : (<Button type="button" disabled>Punch Out</Button>)
                  }
                    {' '}
                    { parseInt((new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })), 10) > parseInt(officeStartHours, 10) + 1
                      ? (<Button type="button" disabled onClick={() => dispatch(changeAvailabilityUserAction('On Leave'))}>Leave</Button>)
                      : <Button type="button" onClick={() => dispatch(changeAvailabilityUserAction('On Leave'))}>Leave</Button> }

                  </>
                ) : (
                // <>
                // { currentTime < officeEndHours?
                  <Button type="button" onClick={() => dispatch(changeAvailabilityUserAction('Available'))}>Punch In</Button>
                // : <Button type="button" disabled>Punch In</Button>}
                // </>
                )}
                <>
                  {' '}
                  <Button type="primary" onClick={showModal}>
                    Record
                  </Button>
                  <Modal title="Record" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <SearchBox
                      placeholder="Search by Date"
                      setSearchField={setSearchField}
                    />
                    <table className="records-table">
                      <thead>
                        <tr>
                          <th className="records-table-cells">Date</th>
                          <th className="records-table-cells">Time In</th>
                          <th className="records-table-cells">Time Out</th>
                          <th className="records-table-cells">Work Hours</th>
                          <th className="records-table-cells">Avg Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecord ? (

                          filteredRecord.map((record) => (
                            <tr key={record.id} style={{ border: '1px solid black' }}>
                              <td className="records-table-cells">{record.date}</td>
                              <td className="records-table-cells">{record.timeIn}</td>
                              <td className="records-table-cells">{record.timeOut}</td>
                              <td className="records-table-cells">{record.workHours}</td>
                              {currentUser.avgWorkHours !== null ? <td className="records-table-cells">{currentUser.avgWorkHours}</td> : <td className="records-table-cells">{' '}</td>}

                            </tr>
                          ))) : null}
                      </tbody>
                    </table>
                  </Modal>
                </>

                { late === true ? (
                  <Alert style={{ textAlign: 'center', color: 'red', marginTop: '15px' }}>
                    OFFICE HOURS HAVE PASSED
                  </Alert>
                ) : ''}
              </div>
              <div />
            </>

          ) : null
      }

    </div>
  );
};

export default PunchCardPage;
