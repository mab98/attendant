import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import SearchBox from '../SearchBox';

const ShowModal = ({ currentUser }) => {
  const [searchField, setSearchField] = useState('');
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

  const filteredRecord = currentUser.records
    .filter((user) => user.date.includes(searchField));

  return (
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
                  <td className="records-table-cells">
                    {currentUser.avgWorkHours !== null ? currentUser.avgWorkHours : ' '}
                  </td>
                </tr>
              ))) : null}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

ShowModal.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default ShowModal;
