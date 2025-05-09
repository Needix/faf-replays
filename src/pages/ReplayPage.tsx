import NavbarComponent from "../components/NavbarComponent.tsx";
import {Col, Row} from "react-bootstrap";
import "./css/ReplayPage.css";
import ReplayPreviewComponent from "../components/ReplayPreviewComponent.tsx";
import ReplayListComponent from "../components/ReplayListComponent.tsx";
import {useState} from "react";
import {Replay} from "../api/Api.ts";

const ReplayPage = () => {
    const [previewData, setPreviewData] = useState<Replay | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

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