import React, {useRef, useState} from "react";
import {PlayerListFilters} from "../utils/PlayerListFilters.tsx"; // Import the gear icon from react-icons


const SearchWithFilters = ({
                               performFilteredSearch,
                           }: {
    performFilteredSearch: (filters: PlayerListFilters) => void;
}) => {
    const debounceTimeout = useRef<number | undefined>(undefined); // UseRef for debounce timeout management
    const [filters, setFilters] = useState({
        searchTerm: "",
    });

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        updateFilter("searchTerm", value);

        // If a previous debounce timeout exists, clear it
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Start a new debounce timeout
        debounceTimeout.current = window.setTimeout(() => {
            performFilteredSearch(filters); // Trigger search
        }, 500); // 500ms debounce period
    }

    function handleSearchEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            // If "Enter" is pressed, immediately trigger the search and clear the debounce
            performFilteredSearch(filters); // Trigger search
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    }

    // Update filters state
    const updateFilter = (key: string, value: unknown) => {
        setFilters((prevFilters) => ({...prevFilters, [key]: value}));
    };

    return (
        <>
            {/* Search Input */}
            <div className="d-flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control me-2"
                    value={filters.searchTerm}
                    onChange={handleSearchInput} // On input change, start debounce logic
                    onKeyDown={handleSearchEnter} // On pressing Enter, perform search
                />
            </div>
        </>
    );
};

export default SearchWithFilters;