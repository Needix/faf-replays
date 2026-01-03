import {Card, ListGroup} from "react-bootstrap";
import {Api, Player} from "../../api/Api.ts";
import {useEffect, useRef, useState} from "react";
import SearchWithFilters from "../SearchWithFilters.tsx";

// import "./../../css/ReplayListComponent.css";
import LoadingSpinner from "../utils/LoadingSpinner.tsx";
import StringUtils from "../../utils/StringUtils.ts";
import {PlayerListFilters} from "../utils/PlayerListFilters.tsx";


const PlayerListComponent = ({setPreviewData, setIsLoading}: {
    setPreviewData: (data: Player) => void;
    setIsLoading: (isLoading: boolean) => void
}) => {
    const ApiController = new Api().api;

    const [players, setPlayers] = useState<Player[]>([]); // All loaded replays
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [listIsLoading, setListIsLoading] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null); // Server-side cursor for paging
    const [filters, setFilters] = useState<PlayerListFilters>({
        searchTerm: ""
    });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPlayerElementRef = useRef<HTMLAnchorElement | null>(null);

    // Function to load more replays using the cursor
    const loadPlayers = (applyFilters = false, searchFilters: PlayerListFilters = filters) => {
        if (listIsLoading) return;
        setListIsLoading(true);

        ApiController.searchPlayers({
            query: searchFilters.searchTerm,
            cursor: applyFilters ? undefined : cursor ? Number(cursor) : undefined, // Clear cursor if applying new filters
        })
            .then(data => {
                const newPlayers = data.data as unknown as Player[]
                setPlayers(applyFilters ? newPlayers : [...players, ...newPlayers]); // Append or replace
                setCursor(applyFilters ? "0" : (newPlayers.length > 0 ? newPlayers[newPlayers.length - 1]?.ownerId ?? "0" : "0")); // Update cursor
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
            if (entries[0].isIntersecting) loadPlayers();
        });
        if (lastPlayerElementRef.current) observer.current.observe(lastPlayerElementRef.current);
    }, [lastPlayerElementRef.current, cursor]);

    // Initial load
    useEffect(() => {
        loadPlayers();
    }, []);

    const applyFilters = (newFilters: PlayerListFilters) => {
        setFilters(newFilters);
        setCursor(null); // Clear the cursor
        loadPlayers(true, newFilters); // Reload data with new filters
    };

    function onClickSelectPlayer(player: Player) {
        setIsLoading(true);
        setPreviewData(player);
        setSelectedPlayer(player);
        setIsLoading(false);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-0">
                <span style={{color: "#fff"}} className={"ms-2"}>Available Players</span>
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
                    {players.map((player, index) => (
                        <ListGroup.Item
                            key={player.ownerId}
                            ref={players.length === index + 1 ? lastPlayerElementRef : null} // Attach ref to the last element for infinite scrolling
                            action
                            onClick={() => onClickSelectPlayer(player)} // Handle click to select and preview
                            className={player === selectedPlayer ? "selected-player" : ""} // Apply selected style
                        >
                            <div className="player-item">
                                <div
                                    className="player-title">{StringUtils.ellipsis(player.name || `Player with id ${player.ownerId}`, 45)}</div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </>
    );
}

export default PlayerListComponent;

