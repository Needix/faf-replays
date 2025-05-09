import {Player, ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {Card, Col, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import LOG from "../../utils/Logger.ts";

import uefLogo from "../../assets/uef.png";
import aeonLogo from "../../assets/aeon.png";
import cybranLogo from "../../assets/cybran.png";
import seraphimLogo from "../../assets/seraphim.png";
import StringUtils from "../../utils/StringUtils.ts";

import "../css/ReplayPreviewComponent.css";
import ReplaySummaryGraphs from "./ReplaySummaryGraphs.tsx";
import ReplayGameDetailsComponent from "./ReplayGameDetailsComponent.tsx";
import ReplayGameLobbyComponent from "./ReplayGameLobbyComponent.tsx";

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const completeMapPath = data.mapName ?? "Unknown";

    const [imageError, setImageError] = useState(false);
    const mapName = completeMapPath.split('/')[2].toLowerCase().replace('.scmap', '');
    const url = `https://content.faforever.com/maps/previews/large/${mapName}.png`;


    return (
        <>
            <Row>
                <Col>
                    <ReplayGameDetailsComponent data={data}/>
                </Col>
                <Col sm={"3"}>
                    <ReplayGameLobbyComponent data={data}/>
                </Col>
                <Col sm={"3"}>
                    <Card className={"preview-card"}>
                        <Card.Title>
                                <span className={"ms-3 pt-2"}
                                      style={{fontSize: "20px"}}>Map: {StringUtils.ellipsis(mapName, 25)}</span>
                        </Card.Title>
                        <Card.Body>
                            {!imageError ? (
                                <img
                                    className={"map-preview"}
                                    src={url}
                                    alt={completeMapPath}
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <span className="no-image-text">No image</span>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={"mt-2"}>
                <Col>
                    <ReplaySummaryGraphs data={data}/>
                </Col>
            </Row>
        </>
    )
}
export default ReplayPreviewComponent;