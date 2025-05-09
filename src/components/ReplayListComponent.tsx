import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import PaginationComponent from "./PaginationComponent.tsx";
import {Api, Page, Replay} from "../api/Api.ts";
import {useState} from "react";
import SearchComponent from "./SearchComponent.tsx";

const ReplayListComponent = ({setPreviewData, setIsLoading, isLoading}: {
    setPreviewData: (data: Replay) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean
}) => {
    const ApiController = new Api().api;

    const [idsOnPage, setIdsOnPage] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // For holding user input

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        performSearch(searchTerm, page - 1);
    };

    const performSearch = (searchTerm: string, page: number = 0) => {
        if (isLoading) return;
        setIsLoading(true);

        setSearchTerm(searchTerm);
        ApiController.searchReplays({query: searchTerm, page}).then(data => {
            setPageInformation(data.data as Page);
            setIsLoading(false);
        });
    };

    function setPageInformation(page: Page) {
        setIdsOnPage(page.content ? page.content.map(id => Number(id)) : []);
        setTotalPages(page.totalPages ?? 1);
    }

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
    );
}

export default ReplayListComponent;

