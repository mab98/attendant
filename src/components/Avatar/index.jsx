import { Avatar } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const AvatarLogo = ({ word }) => (
  <Avatar
    style={{
      backgroundColor: '#ff5959',
      verticalAlign: 'middle',
    }}
    size="large"
    gap={5}
  >
    {word}
  </Avatar>

);

AvatarLogo.propTypes = {
  word: PropTypes.string.isRequired,
};

export default AvatarLogo;
