import './styles.css';
import React, { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { changeAvailabilityUserAction, onNoPunchOutUserAction } from '../../store/actions';
import AvatarLogo from '../../components/Avatar';
import ShowModal from '../../components/Modal';

const PunchCardPage = () => {
  const {
    users, currentUser, officeStartHours, officeEndHours,
  } = useSelector((state) => state);

  const [late, setLate] = useState(false);

  const dispatch = useDispatch();
  let availability;
  if (currentUser) {
    availability = users.find((user) => user.id === currentUser.id).available;
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > officeEndHours) {
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
                      ? <Button onClick={() => dispatch(changeAvailabilityUserAction('Not Available'))}>Punch Out</Button>
                      : (<Button disabled>Punch Out</Button>)
                  }
                    {' '}
                    { parseInt((new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })), 10) > parseInt(officeStartHours, 10) + 1
                      ? (<Button disabled onClick={() => dispatch(changeAvailabilityUserAction('On Leave'))}>Leave</Button>)
                      : <Button onClick={() => dispatch(changeAvailabilityUserAction('On Leave'))}>Leave</Button> }

                  </>
                ) : (
                  <Button onClick={() => dispatch(changeAvailabilityUserAction('Available'))}>Punch In</Button>
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
