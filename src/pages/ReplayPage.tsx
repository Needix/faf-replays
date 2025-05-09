import {useEffect, useRef, useState} from "react";
import NavbarComponent from "../components/NavbarComponent.tsx";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.tsx";
import "./css/ReplayPage.css";
import {Api, Page, Replay} from "../api/Api.ts";
import ReplayPreviewComponent from "../components/ReplayPreviewComponent.tsx";
import ReplayListComponent from "../components/ReplayListComponent.tsx";

const ReplayPage = () => {
    const ApiController = new Api().api;

    const [idsOnPage, setIdsOnPage] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // For holding user input
    const [previewData, setPreviewData] = useState<Replay | undefined>(undefined);
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
            ApiController.getAllReplayIds({page: page - 1}).then(data => {
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
        ApiController.searchReplays({query: query, page: page}).then(data => {
            setCurrentPage(page + 1);
            setPageInformation(data.data as Page);
            setIsLoading(false);
        });
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
                    <ReplayListComponent
                        setPreviewData={setPreviewData}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                    />
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