import NavbarComponent from "../components/NavbarComponent.tsx";
import {Col, Row} from "react-bootstrap";
import {useState} from "react";
import PlayerPreviewComponent from "../components/player/PlayerPreviewComponent.tsx";
import LoadingSpinner from "../components/utils/LoadingSpinner.tsx";
import PlayerListComponent from "../components/player/PlayerListComponent.tsx";
import {Player} from "../api/Api.ts";

const PlayersPage = () => {
    const [previewData, setPreviewData] = useState<Player>();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={"body"}>
            <NavbarComponent/>
            <Row className={"mt-2"} style={{maxWidth: "100vw"}}>
                <Col sm={"3"} className={"ms-2"}>
                    <PlayerListComponent
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