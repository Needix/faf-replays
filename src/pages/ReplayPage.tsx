import NavbarComponent from "../components/NavbarComponent.tsx";
import {Col, Row} from "react-bootstrap";
import "./css/ReplayPage.css";
import ReplayPreviewComponent from "../components/replay/ReplayPreviewComponent.tsx";
import ReplayListComponent from "../components/replay/ReplayListComponent.tsx";
import {useState} from "react";
import {Replay} from "../api/Api.ts";
import LoadingSpinner from "../components/utils/LoadingSpinner.tsx";

const ReplayPage = () => {
    const [previewData, setPreviewData] = useState<Replay | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState("Game Details");

    return (
        <div className={"body"}>
            <NavbarComponent/>
            <Row className={"mt-2"} style={{maxWidth: "100vw"}}>
                <Col sm={"3"} className={"ms-2"}>
                    <ReplayListComponent
                        setPreviewData={setPreviewData}
                        setIsLoading={setIsLoading}
                    />
                </Col>
                <Col>
                    {isLoading &&
                        <LoadingSpinner/>
                    }
                    {!isLoading && previewData &&
                        <div>
                            <ReplayPreviewComponent
                                data={previewData}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />
                        </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ReplayPage;