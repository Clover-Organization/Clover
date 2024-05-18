import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import React from 'react';

export const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
    return (
        <>
            <PaginationContent className="cursor-pointer">
                <PaginationItem>
                    <PaginationPrevious className={`text-secondary-foreground ${currentPage === 0 && "opacity-80"}`} onClick={handlePreviousPage} disabled={currentPage === 0} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink className={"text-secondary-foreground"}>{currentPage + 1} / {totalPages}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={`text-secondary-foreground ${currentPage >= totalPages - 1 && "opacity-80"}`} onClick={handleNextPage} disabled={currentPage >= totalPages - 1} />
                </PaginationItem>
            </PaginationContent>
        </>
    );
};
