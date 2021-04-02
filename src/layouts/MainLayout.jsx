/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = (props) => (
  <div>
    <Header />
    <div className="main">
      {props.children}
    </div>
    <Footer />
  </div>
);

export default MainLayout;
