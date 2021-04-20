import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import { Button } from 'antd';
import AvatarLogo from '../../components/Avatar';
import ShowModal from '../../components/Modal';
import AppContext from '../../context/app-context';

const PunchCardPage = () => {
  const {
    users, currentUser, officeStartHours, officeEndHours,
    changeAvailabilityUserAction, onNoPunchOutUserAction,
  } = useContext(AppContext);

  const [late, setLate] = useState(false);

  let availability;
  if (currentUser) {
    availability = users.find((user) => user.id === currentUser.id).available;
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > officeEndHours) {
        setLate(true);
        onNoPunchOutUserAction();
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
                <AvatarLogo word={currentUser.firstname} />
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
                      ? <Button onClick={() => changeAvailabilityUserAction('Not Available')}>Punch Out</Button>
                      : (<Button disabled>Punch Out</Button>)
                  }
                    {' '}
                    { parseInt(currentTime, 10) > parseInt(officeStartHours, 10) + 1
                      ? (<Button disabled onClick={() => changeAvailabilityUserAction('On Leave')}>Leave</Button>)
                      : <Button onClick={() => changeAvailabilityUserAction('On Leave')}>Leave</Button> }

                  </>
                ) : (
                  <Button onClick={() => changeAvailabilityUserAction('Available')}>Punch In</Button>
                )}
                <ShowModal currentUser={currentUser} />

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
