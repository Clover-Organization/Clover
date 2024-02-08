// FilterBar.js
import React from 'react';
import filtro from '../../assets/filtro.png';
import lupa from '../../assets/lupa.png';

const FilterBar = ({ handleSearch, searchTerm }) => {
  return (
    <div className="subNav">
      <div className="lupaSearch">
        <div className="lupa"><img src={lupa} alt="Search" /></div>
        <input
          type="search"
          placeholder="Search.."
          onChange={handleSearch}
          value={searchTerm}
          title="Search"
        />
      </div>
    </div>
  );
};

export default FilterBar;