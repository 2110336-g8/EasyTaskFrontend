import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';

const PaginationNumber: React.FC<{
    pageNumber: number;
    setPage: (pageNumber: number) => void;
    isActive: boolean;
}> = ({ pageNumber, setPage, isActive }) => {
    return (
        <PaginationItem>
            <PaginationLink
                onClick={() => setPage(pageNumber)}
                isActive={isActive}
            >
                <p>{pageNumber}</p>
            </PaginationLink>
        </PaginationItem>
    );
};

const PaginationContainer: React.FC<{
    setPage: (pageNumber: number) => void;
    totalPageCount: number;
    siblingCount?: number;
    currentPage?: number;
}> = ({ setPage, totalPageCount, siblingCount = 1, currentPage = 1 }) => {
    const paginationRange: number[] = usePagination({
        totalPageCount,
        siblingCount,
        currentPage,
    });

    const onNext = () => {
        setPage(currentPage + 1);
    };

    const onPrevious = () => {
        setPage(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Pagination className='text-slate-600 my-[40px]'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={currentPage === 1 ? undefined : onPrevious}
                    />
                </PaginationItem>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === 0) {
                        return (
                            <PaginationItem
                                key={`paginationNumber${pageNumber}`}
                            >
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationNumber
                            key={`paginationNumber${pageNumber}`}
                            pageNumber={pageNumber}
                            setPage={setPage}
                            isActive={currentPage == pageNumber}
                        />
                    );
                })}
                <PaginationItem>
                    <PaginationNext
                        onClick={currentPage === lastPage ? undefined : onNext}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationContainer;
