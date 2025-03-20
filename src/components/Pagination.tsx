import React from "react";

interface PaginationProps {
    metaData: {
        currentPage: number;
        totalMatchedItems: number;
        nextPage: number | null;
        previousPage: number | null;
        numberOfPages: number;
    };
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    metaData,
    pageSize,
    onPageChange,
    onPageSizeChange
}) => {
    const { currentPage, previousPage, nextPage, numberOfPages } = metaData;
    const pageSizeOptions: { [key: number]: string } = {
        2: "2",
        5: "5",
        10: "10",
        20: "20",
        50: "50",
    };

    const getPages = () => {
        const pages: (number | string)[] = [];
        if (numberOfPages <= 5) {
            for (let i = 1; i <= numberOfPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(numberOfPages - 1, currentPage + 1);

            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < numberOfPages - 1) pages.push('...');

            pages.push(numberOfPages);
        }
        return pages;
    };

    return (
        <div className="pagination mt-10 py-10 border-t border-t-muted">
            <div className="flex gap-5 justify-between items-center">
                <div className="flex items-center gap-4">
                    <label htmlFor="pageSize" className="text-sm font-medium">
                        العناصر لكل صفحة :
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = parseInt(e.target.value, 10);
                            if (newSize > 0) onPageSizeChange(newSize);
                        }}
                        className="w-16 px-2 py-1 border rounded dark:bg-dark-light dark:border-muted-dark dark:text-light"
                    >
                        {Object.entries(pageSizeOptions).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <ol className="flex justify-center gap-1 text-xs font-medium">
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

                    {getPages().map((page, index) => (
                        <React.Fragment key={index}>
                            {typeof page === 'number' ? (
                                <li>
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
                            ) : (
                                <li>
                                    <span className="size-8 flex items-center justify-center">...</span>
                                </li>
                            )}
                        </React.Fragment>
                    ))}

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
        </div>
    );
};

export default Pagination;