import NavbarComponent from "../components/NavbarComponent.tsx";
import {Api, Page, Replay, ReplayPlayer} from "../api/Api.ts";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.tsx";
import {useEffect, useRef, useState} from "react";
import PlayerPreviewComponent from "../components/PlayerPreviewComponent.tsx";

const PlayersPage = () => {
    const ApiController = new Api().api;

    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // For holding user input
    const [previewData, setPreviewData] = useState<ReplayPlayer | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimeout = useRef<number | undefined>(undefined); // UseRef for debounce timeout management

    // Fetch default replays on initial load
    useEffect(() => {
        resetSearch();
    }, []);

    const handlePageChange = (page: number) => {
        if (isLoading) return;

        setCurrentPage(page);

        if (searchTerm.length == 0) {
            setIsLoading(true);
            ApiController.getPlayerNames({page: page - 1}).then(data => {
                setPageInformation(data.data as Page);
                setIsLoading(false);
            });

        } else {
            performSearch(searchTerm, page - 1);
        }
    };

    const performSearch = (query: string, page: number = 0) => {
        if (isLoading) return;

        if (!query.trim()) {
            // Reset to default if search is empty
            resetSearch();
            return;
        }


        setIsLoading(true);
        ApiController.searchPlayerNames({searchTerm: query, page}).then(data => {
            setPageInformation(data.data as Page);
            setIsLoading(false);
        });
    };

    const resetSearch = () => {
        ApiController.getPlayerNames().then(data => {
            setPageInformation(data.data as Page);
        });
    }

    function setPageInformation(page: Page) {
        setPlayerNames(page.content ? page.content.map(id => String(id)) : []);
        setTotalPages(page.totalPages ?? 1);
    }

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state

        // If a previous debounce timeout exists, clear it
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Start a new debounce timeout
        debounceTimeout.current = window.setTimeout(() => {
            performSearch(value); // Trigger the search after the graze period
        }, 500); // 500ms debounce period
    };

    const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // If "Enter" is pressed, immediately trigger the search and clear the debounce
            performSearch(searchTerm);
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        }
    };


    const handlePreviewClicked = (playerName: string) => {
        setIsLoading(true);
        ApiController.getReplaysByPlayerName(playerName).then(data => {
            setIsLoading(false);
            setPreviewData(data.data as Replay);
        });
    }

    const handleCopyPlayerNameClicked = (playerName: string) => {
        navigator.clipboard.writeText(playerName.toString())
            .then(() => {
                alert("Player name copied to clipboard!");
            })
            .catch(() => {
                alert("Failed to copy player name to clipboard.");
            });
    };

    return (
        <div className={"body"}>
            <NavbarComponent/>
            <Row className={"mt-2"} style={{maxWidth: "100vw"}}>
                <Col sm={"3"} className={"ms-2"}>
                    <Card className={""}>
                        <Card.Header>
                            <div className="d-flex justify-content-between align-items-center mb-0">
                                <span style={{color: "#fff"}} className={"ms-2"}>Available Replays</span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control form-control-sm w-50"
                                    value={searchTerm}
                                    onChange={handleSearchInput} // On input change, start debounce logic
                                    onKeyDown={handleSearchEnter} // On pressing Enter, perform search
                                />
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => handlePageChange(page)}
                            />
                            <Accordion defaultActiveKey="0" flush>
                                <div style={{maxHeight: "79vh", overflowY: "auto", overflowX: "hidden"}}>
                                    {playerNames.map(playerName => {
                                        return (
                                            <Accordion.Item eventKey={"" + playerName} key={playerName}>
                                                <Accordion.Header>{playerName}</Accordion.Header>
                                                <Accordion.Body>
                                                    <Row>
                                                        <Col>
                                                            <Button className={"btn-sm float-end"}
                                                                    onClick={() => handlePreviewClicked(playerName)}>Preview</Button>
                                                            <Button className={"btn-sm float-start me-2"}
                                                                    onClick={() => handleCopyPlayerNameClicked(playerName)}>Copy
                                                                ID</Button>
                                                        </Col>
                                                    </Row>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        );
                                    })}
                                </div>
                            </Accordion>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    {isLoading &&

                        <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}>
                            <div className="spinner-border spinner-color" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    {!isLoading && previewData &&
                        <div>
                            <PlayerPreviewComponent
                                data={previewData}
                            />
                        </div>
                    }
                </Col>
            </Row>
        </div>);
}
export default PlayersPage;