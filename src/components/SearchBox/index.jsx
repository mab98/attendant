/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

const SearchBox = ({ placeholder, setSearchField }) => (
  <input
    className="search-box"
    type="search"
    placeholder={placeholder}
    onChange={(e) => setSearchField(e.target.value)}
  />
);

export default SearchBox;
