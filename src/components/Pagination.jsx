import React, { useState } from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
    const getPageNumbers = () => {
        let pages = [];
        const range = 2; // Number of pages to show on either side of the current page

        // Add page numbers to show before the current page
        for (let i = Math.max(page - range, 1); i <= Math.min(page + range, totalPages); i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center mt-4 space-x-4">
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className={`inline-block ${page === 1 ? 'hidden' : ''} text-3xl`}
                disabled={page === 1}
            >
                &laquo;
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`inline-block px-2 py-1 rounded ${number === page ? 'bg-[#f60] text-white' : ''}`}
                >
                    {number}
                </button>
            ))}

            {totalPages > 5 && page < totalPages - 2 && (
                <p className="text-gray-600">...</p>
            )}

            <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                className={`inline-block ${page >= totalPages ? 'hidden' : ''} text-3xl`}
                disabled={page >= totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
