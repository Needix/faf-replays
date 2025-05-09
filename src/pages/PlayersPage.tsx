import NavbarComponent from "../components/NavbarComponent.tsx";
import {Api, Page, Replay, ReplayPlayer} from "../api/Api.ts";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.tsx";
import {useState} from "react";
import PlayerPreviewComponent from "../components/PlayerPreviewComponent.tsx";
import SearchComponent from "../components/SearchComponent.tsx";

const PlayersPage = () => {
    const ApiController = new Api().api;

    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [previewData, setPreviewData] = useState<ReplayPlayer | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // For holding user input

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        performSearch(searchTerm, page - 1);
    };

    const performSearch = (searchTerm: string, page: number = 0) => {
        if (isLoading) return;
        setIsLoading(true);

        setSearchTerm(searchTerm);
        ApiController.searchPlayerNames({searchTerm: searchTerm, page}).then(data => {
            setPageInformation(data.data as Page);
            setIsLoading(false);
        });
    };

    function setPageInformation(page: Page) {
        setPlayerNames(page.content ? page.content.map(id => String(id)) : []);
        setTotalPages(page.totalPages ?? 1);
    }

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
                                <SearchComponent performSearch={performSearch}/>
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