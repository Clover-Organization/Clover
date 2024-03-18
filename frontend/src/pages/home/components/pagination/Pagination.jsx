// Pagination.jsx
import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import React from 'react';


export const Pagination = ({ currentPage, handlePreviousPage, handleNextPage, role }) => {
    return (
        <>
            <PaginationContent className="cursor-pointer">
                <PaginationItem>
                    <PaginationPrevious className={"text-secondary-foreground"} onClick={handlePreviousPage} disabled={currentPage === 0} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className={"text-secondary-foreground"}>{currentPage + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={"text-secondary-foreground"} onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </>

    );
};

