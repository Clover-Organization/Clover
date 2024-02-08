// Pagination.jsx
import React from 'react';

export const Pagination = ({ currentPage, handlePreviousPage, handleNextPage, role }) => {
    return (
        <div className="page">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                Back
            </button>
            <span>Página {currentPage + 1}</span>
            <button onClick={handleNextPage}>
                Next
            </button>
        </div>
    );
};

