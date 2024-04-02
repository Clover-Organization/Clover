// FilterBar.js
import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ handleSearch, searchTerm }) => {
  return (
    <div className="subNav">
      <div className="lupaSearch">
        <div className="lupa">
          <Search width={20}/>
        </div>
        <input
          className='bg-secondary'
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