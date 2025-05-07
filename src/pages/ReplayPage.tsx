import {useEffect, useRef, useState} from "react";
import NavbarComponent from "../components/NavbarComponent.tsx";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.tsx";
import "./css/ReplayPage.css";
import {Api, Page, Replay} from "../api/Api.ts";
import ReplayPreviewComponent from "../components/ReplayPreviewComponent.tsx";

const ReplayPage = () => {
    const ApiController = new Api().api;

    const [idsOnPage, setIdsOnPage] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [previewData, setPreviewData] = useState<ReplayData | undefined>(undefined);
    const [previewData, setPreviewData] = useState<Replay | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ApiController.getReplayIds().then((data: { content: number[]; totalPages: number }) => {
            setIdsOnPage(data.content);
            setTotalPages(data.totalPages);
        });
    }, []);

    const handlePageChange = (page: number) => {
        if (isLoading) return;

        setCurrentPage(page);

        if (searchTerm.length == 0) {
            setIsLoading(true);
            ApiController.getAllReplayIds({page: page - 1}).then(data => {
                setPageInformation(data.data as Page);
                setIsLoading(false);
            });

        } else {
            performSearch(searchTerm, page - 1);
        }
    };

    const handleSearch = (searchTerm: string) => {
        const filteredIds = ids.filter((id) => id.toString().includes(searchTerm));
        const pageSize = 25;
        setTotalPages(Math.ceil(filteredIds.length / pageSize));
        setCurrentPage(1); // Reset to the first page after a new search
        setIdsOnPage(filteredIds.slice(0, pageSize)); // Show the first page of search results
    };

    const resetSearch = () => {
        ApiController.getAllReplayIds().then(data => {
            setPageInformation(data.data as Page);
        });
    }

    function setPageInformation(page: Page) {
        setIdsOnPage(page.content ? page.content.map(id => Number(id)) : []);
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


    const handlePreviewClicked = (id: number) => {
        setIsLoading(true);
        ApiController.getReplayById(id).then(data => {
            setTimeout(() => {
                setIsLoading(false);
                setPreviewData(data.data as Replay);
            });
        })
    }

    const handleCopyIdClicked = (id: number) => {
        navigator.clipboard.writeText(id.toString())
            .then(() => {
                alert("ID copied to clipboard!");
            })
            .catch(() => {
                alert("Failed to copy ID to clipboard.");
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
                                    onChange={(e) => {
                                        handleSearch(e.target.value);
                                    }}
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

                                    {idsOnPage.map(id => {
                                        return (
                                            <Accordion.Item eventKey={"" + id} key={id}>
                                                <Accordion.Header>Replay: {id}</Accordion.Header>
                                                <Accordion.Body>
                                                    <Row>
                                                        <Col>
                                                            <Button className={"btn-sm float-end"}
                                                                    onClick={() => handlePreviewClicked(id)}>Preview</Button>
                                                            <Button className={"btn-sm float-start me-2"}
                                                                    onClick={() => handleCopyIdClicked(id)}>Copy
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
                            <ReplayPreviewComponent
                                data={previewData}
                            />
                        </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ReplayPage;