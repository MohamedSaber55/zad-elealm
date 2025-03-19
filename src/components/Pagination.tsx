import React from "react";

interface PaginationProps {
    metaData: {
        pageSize: number;
        currentPage: number;
        totalMatchedItems: number;
        nextPage: number | null;
        previousPage: number | null;
        numberOfPages: number;
    };
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ metaData, onPageChange }) => {
    const { currentPage, previousPage, nextPage, numberOfPages } = metaData;

    return (
        <div className="pagination py-10">
            <ol className="flex justify-center gap-1 text-xs font-medium">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => previousPage && onPageChange(previousPage)}
                        disabled={!previousPage}
                        className={`inline-flex size-8 items-center justify-center rounded-sm border border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-dark rtl:rotate-180 
                            ${!previousPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}

                    >
                        <span className="sr-only">Prev Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`block size-8 rounded-sm border text-center leading-8 
                ${page === currentPage
                                    ? "border-muted-green bg-primary text-white"
                                    : "border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-dark hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => nextPage && onPageChange(nextPage)}
                        disabled={!nextPage}
                        className={`inline-flex size-8 items-center justify-center rounded-sm border border-muted bg-white dark:bg-dark-light dark:text-light dark:border-muted-dark text-dark rtl:rotate-180 
                ${!nextPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                    >
                        <span className="sr-only">Next Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            </ol>
        </div>
    );
};

export default Pagination;
