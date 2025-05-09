import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {Col, Row} from "react-bootstrap";

import "../css/ReplayPreviewComponent.css";
import ReplaySummaryGraphs from "./ReplaySummaryGraphs.tsx";
import ReplayGameDetailsComponent from "./ReplayGameDetailsComponent.tsx";
import ReplayGameLobbyComponent from "./ReplayGameLobbyComponent.tsx";
import ReplayMapPreviewComponent from "./ReplayMapPreviewComponent.tsx";

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

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
                    <ReplayMapPreviewComponent data={data}/>
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