import React from "react";
import {Pagination} from "react-bootstrap";
import {PaginationComponentProps} from "./types/PaginationComponentProps.ts";

import "./css/PaginationComponent.css";

const PaginationComponent: React.FC<PaginationComponentProps> = ({
                                                                     currentPage,
                                                                     totalPages,
                                                                     onPageChange,
                                                                 }) => {
    const maxPagesToShow = 10;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
        // Wenn es weniger als maxPagesToShow Seiten gibt => alle Seiten anzeigen
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Seiten für größere Paginierung generieren
        pages.push(1); // immer erste Seite anzeigen

        if (currentPage > 4) {
            pages.push("..."); // Auslassungspunkte für den Anfang
        }

        // Zeige nahe Seiten um die aktuelle Seite
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("..."); // Auslassungspunkte für das Ende
        }

        pages.push(totalPages); // immer letzte Seite anzeigen
    }

    // Rendern
    return (
        <Pagination size="sm">
            <Pagination.First
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
            />
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />
            {pages.map((page, index) =>
                typeof page === "number" ? (
                    <Pagination.Item
                        key={index}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                ) : (
                    <Pagination.Ellipsis key={index} disabled/>
                )
            )}
            <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
            <Pagination.Last
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(totalPages)}
            />
        </Pagination>
    );
};

export default PaginationComponent;