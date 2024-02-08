// FilterPriority.jsx
import React from 'react';

const FilterPriority = ({ filterCriteria, setFilterCriteria, priorityCounts }) => {
    return (
        <div className="filterPriorityConfig">
            <label className="selectFilterPriority" htmlFor="filterPriority">
                Filter by Priority:
            </label>
            <select
                className="selectFilterPriority"
                id="filterPriority"
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
            >
                <option value="">All</option>
                <option value="HIGH">HIGH ({priorityCounts.HIGH || 0})</option>
                <option value="MEDIUM">MEDIUM ({priorityCounts.MEDIUM || 0})</option>
                <option value="LOW">LOW ({priorityCounts.LOW || 0})</option>
            </select>
        </div>
    );
};

export default FilterPriority;
