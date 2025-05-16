import React, {useRef, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {DatePicker} from "@mui/lab"; // Install Material UI for date pickers
import TextField from "@mui/material/TextField";
import {FaCog} from "react-icons/fa";
import {Filters} from "./utils/Filters.tsx"; // Import the gear icon from react-icons


class TextFieldVariants {
}

const SearchWithFilters = ({
                               performFilteredSearch,
                           }: {
    performFilteredSearch: (searchTerm: string, filters: Filters) => void;
}) => {
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [searchTerm, setSearchTerm] = useState(""); // Text search term
    const debounceTimeout = useRef<number | undefined>(undefined); // UseRef for debounce timeout management
    const [filters, setFilters] = useState({
        completeStatus: "all", // all, complete, incomplete
        mods: [] as string[], // List of selected mods
        gameTypes: [] as string[], // List of selected game types
        numberOfPlayers: {min: null, max: null}, // Player range
        timeFrame: {start: null, end: null}, // Time frame start and end
        rankedOnly: false, // true/false for ranked filter
    });

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state

        // If a previous debounce timeout exists, clear it
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Start a new debounce timeout
        debounceTimeout.current = window.setTimeout(() => {
            performFilteredSearch(searchTerm, {...filters}); // Trigger search
        }, 500); // 500ms debounce period
    }

    function handleSearchEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            // If "Enter" is pressed, immediately trigger the search and clear the debounce
            performFilteredSearch(searchTerm, {...filters}); // Trigger search
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    }


    // Toggles modal visibility
    const toggleModal = () => setShowModal(!showModal);

    // Update filters state
    const updateFilter = (key: string, value: unknown) => {
        setFilters((prevFilters) => ({...prevFilters, [key]: value}));
    };

    // Submit filters and search term
    const applyFilters = () => {
        toggleModal(); // Close modal
        performFilteredSearch(searchTerm, {...filters}); // Trigger search
    };

    return (
        <>
            {/* Search Input */}
            <div className="d-flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control me-2"
                    value={searchTerm}
                    onChange={handleSearchInput} // On input change, start debounce logic
                    onKeyDown={handleSearchEnter} // On pressing Enter, perform search
                />
                <Button variant="secondary" onClick={toggleModal} className="d-flex align-items-center">
                    <FaCog size={20}/> {/* Icon rendering with size 20 */}
                </Button>
            </div>

            {/* Filters Modal */}
            <Modal show={showModal} onHide={toggleModal} className={"body"} size="lg" bg="dark" data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Complete Status */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Complete Status</Form.Label>
                                <Form.Select
                                    value={filters.completeStatus}
                                    onChange={(e) => updateFilter("completeStatus", e.target.value)}
                                >
                                    <option value="all">Show All</option>
                                    <option value="complete">Complete Replays</option>
                                    <option value="incomplete">Incomplete Replays</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        {/* Mods Multi-Select */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Featured Mods</Form.Label>
                                <Form.Control
                                    as="select"
                                    multiple
                                    value={filters.mods}
                                    onChange={(e) =>
                                        updateFilter(
                                            "mods",
                                            Array.from((e.target as unknown as HTMLSelectElement).selectedOptions, (option) => option.value)
                                        )
                                    }
                                >
                                    <option value="faf">faf</option>
                                    <option value="coop">coop</option>
                                    <option value="fafbeta">fafbeta</option>
                                    <option value="nomads">nomads</option>
                                    <option value="fafdevelop">fafdevelop</option>
                                </Form.Control>
                            </Col>
                        </Row>

                        {/* Game Type Multi-Select */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Game Types</Form.Label>
                                <Form.Control
                                    as="select"
                                    multiple
                                    value={filters.gameTypes}
                                    onChange={(e) =>
                                        updateFilter(
                                            "gameTypes",
                                            Array.from((e.target as unknown as HTMLSelectElement).selectedOptions, (option) => option.value)
                                        )
                                    }
                                >
                                    <option value="0">Assassination</option>
                                    <option value="1">Domination</option>
                                    <option value="2">Demoralization</option>
                                    <option value="3">Sandbox</option>
                                    {/* Additional options can be dynamically mapped */}
                                </Form.Control>
                            </Col>
                        </Row>

                        {/* Player Count Range */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Number of Players</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Min"
                                            value={filters.numberOfPlayers.min ?? ""}
                                            onChange={(e) =>
                                                updateFilter("numberOfPlayers", {
                                                    ...filters.numberOfPlayers,
                                                    min: +e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            placeholder="Max"
                                            value={filters.numberOfPlayers.max ?? ""}
                                            onChange={(e) =>
                                                updateFilter("numberOfPlayers", {
                                                    ...filters.numberOfPlayers,
                                                    max: +e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Time Frame */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Time Frame</Form.Label>
                                <Row>
                                    <Col>
                                        <DatePicker
                                            label="Start Date"
                                            value={filters.timeFrame.start}
                                            onChange={(date: Date | null) =>
                                                updateFilter("timeFrame", {...filters.timeFrame, start: date})
                                            }
                                            renderInput={(params: TextFieldVariants) => <TextField {...params} />}
                                        />
                                    </Col>
                                    <Col>
                                        <DatePicker
                                            label="End Date"
                                            value={filters.timeFrame.end}
                                            onChange={(date: Date | null) =>
                                                updateFilter("timeFrame", {...filters.timeFrame, end: date})
                                            }
                                            renderInput={(params: TextFieldVariants) => <TextField {...params} />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Ranked Only Checkbox */}
                        <Row>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    label="Show Ranked Replays Only"
                                    checked={filters.rankedOnly}
                                    onChange={(e) => updateFilter("rankedOnly", e.target.checked)}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchWithFilters;