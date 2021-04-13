import { Avatar } from 'antd';
import React from 'react';

// eslint-disable-next-line react/prop-types
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

export default AvatarLogo;
