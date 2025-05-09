import {useEffect, useRef, useState} from "react";

const SearchComponent = ({performSearch}:
                         {
                             performSearch: (value: string) => void
                         }) => {
    const [searchTerm, setSearchTerm] = useState(""); // For holding user input
    const debounceTimeout = useRef<number | undefined>(undefined); // UseRef for debounce timeout management

    // Fetch default replays on initial load
    useEffect(() => {
        performSearch("");
    }, []);

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state

        // If a previous debounce timeout exists, clear it
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Start a new debounce timeout
        debounceTimeout.current = window.setTimeout(() => {
            doSearch(value); // Trigger the search after the graze period
        }, 500); // 500ms debounce period
    }

    function handleSearchEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            // If "Enter" is pressed, immediately trigger the search and clear the debounce
            doSearch(searchTerm);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    }

    function doSearch(searchTerm: string) {
        if (searchTerm.trim().length == 0) {
            performSearch("");
        } else {
            performSearch(searchTerm);
        }
    }

    return (<input
        type="text"
        placeholder="Search..."
        className="form-control form-control-sm w-50"
        value={searchTerm}
        onChange={handleSearchInput} // On input change, start debounce logic
        onKeyDown={handleSearchEnter} // On pressing Enter, perform search
    />);
}
export default SearchComponent;