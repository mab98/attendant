import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    <div className="main">
      {children}
    </div>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default MainLayout;
