import {Card, ListGroup} from "react-bootstrap";
import {Api, Replay} from "../../api/Api.ts";
import {useEffect, useRef, useState} from "react";
import SearchWithFilters from "../SearchWithFilters.tsx";
import {Filters} from "../utils/Filters.tsx";

import "./../css/ReplayListComponent.css";
import LoadingSpinner from "../utils/LoadingSpinner.tsx";
import StringUtils from "../../utils/StringUtils.ts";

const ReplayListComponent = ({setPreviewData, setIsLoading}: {
    setPreviewData: (data: Replay) => void;
    setIsLoading: (isLoading: boolean) => void
}) => {
    const ApiController = new Api().api;

    const [replays, setReplays] = useState<Replay[]>([]); // All loaded replays
    const [listIsLoading, setListIsLoading] = useState(false);
    const [cursor, setCursor] = useState<number | null>(null); // Server-side cursor for paging
    const [filters, setFilters] = useState<Filters>({
        searchTerm: "",
        completeStatus: "all",
        mods: [],
        gameTypes: [],
        numberOfPlayers: {min: null, max: null},
        timeFrame: {start: null, end: null},
        rankedOnly: false
    });
    const [selectedReplayId, setSelectedReplayId] = useState<number | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastReplayElementRef = useRef<HTMLAnchorElement | null>(null);

    // Function to load more replays using the cursor
    const loadReplays = (applyFilters = false, searchFilters: Filters = filters) => {
        if (listIsLoading) return;
        setListIsLoading(true);

        ApiController.searchReplays({
            query: searchFilters.searchTerm,
            completeStatus: searchFilters.completeStatus,
            mods: searchFilters.mods,
            gameTypes: searchFilters.gameTypes,
            numberOfPlayersMin: searchFilters.numberOfPlayers.min ?? undefined,
            numberOfPlayersMax: searchFilters.numberOfPlayers.max ?? undefined,
            timeFrameStart: searchFilters.timeFrame.start?.toISOString() ?? undefined,
            timeFrameEnd: searchFilters.timeFrame.end?.toISOString() ?? undefined,
            rankedOnly: searchFilters.rankedOnly,
            cursor: applyFilters ? undefined : cursor ?? undefined, // Clear cursor if applying new filters
        })
            .then(data => {
                const newReplays = data.data as unknown as Replay[]
                setReplays(applyFilters ? newReplays : [...replays, ...newReplays]); // Append or replace
                setCursor(applyFilters ? 0 : (newReplays.length > 0 ? newReplays[newReplays.length - 1]?.id ?? null : null)); // Update cursor
                setListIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setListIsLoading(false);
            });
    };

    // Use IntersectionObserver for infinite scrolling
    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) loadReplays();
        });
        if (lastReplayElementRef.current) observer.current.observe(lastReplayElementRef.current);
    }, [lastReplayElementRef.current, cursor]);

    // Initial load
    useEffect(() => {
        loadReplays();
    }, []);

    const applyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
        setCursor(null); // Clear the cursor
        loadReplays(true, newFilters); // Reload data with new filters
    };

    const handleReplaySelection = (id: number) => {
        setSelectedReplayId(id); // Set the selected replay
        setIsLoading(true);
        ApiController.getReplayById(id).then(data => {
            setIsLoading(false);
            setPreviewData(data.data as Replay); // Show the replay preview
        }).catch(error => {
            console.error(error);
            alert("Could not open replay. Please try again.");
        });
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-0">
                <span style={{color: "#fff"}} className={"ms-2"}>Available Replays</span>
            </div>
            <SearchWithFilters performFilteredSearch={applyFilters}/>
            <Card className={"scrollable-card position-relative"}>
                {listIsLoading && (
                    <div className="loading-overlay">
                        <LoadingSpinner/>
                    </div>
                )}

                <ListGroup variant="flush"
                           className={listIsLoading ? "gray-out" : ""}
                >
                    {replays.map((replay, index) => (
                        <ListGroup.Item
                            key={replay.id}
                            ref={replays.length === index + 1 ? lastReplayElementRef : null} // Attach ref to the last element for infinite scrolling
                            action
                            onClick={() => handleReplaySelection(replay?.id ?? 0)} // Handle click to select and preview
                            className={replay.id === selectedReplayId ? "selected-replay" : ""} // Apply selected style
                        >
                            <div className="replay-item">
                                <div
                                    className="replay-title">{StringUtils.ellipsis(replay.replayTitle || `Replay ${replay.id}`, 45)}</div>
                                <div className="replay-details">Players: {replay.numberOfPlayers} | Game
                                    Type: {replay.gameType}</div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </>
    );
}

export default ReplayListComponent;

