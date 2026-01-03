import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {Button, Col, Row} from "react-bootstrap";

import "../css/ReplayPreviewComponent.css";
import ReplayGameDetailsComponent from "./ReplayGameDetailsComponent.tsx";
import ReplayGameLobbyComponent from "./ReplayGameLobbyComponent.tsx";
import ReplaySummaryGraphs from "./ReplaySummaryGraphs.tsx";

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    // Map of menu options to components
    const componentsMap: Record<string, React.ReactNode> = {
        "Game Details": <ReplayGameDetailsComponent data={data} selectedOption={props.selectedOption}
                                                    setSelectedOption={props.setSelectedOption}/>,
        "Lobby": <ReplayGameLobbyComponent data={data} selectedOption={props.selectedOption}
                                           setSelectedOption={props.setSelectedOption}/>,
        "Analysis": <ReplaySummaryGraphs data={data} selectedOption={props.selectedOption}
                                         setSelectedOption={props.setSelectedOption}/>
    };

    // Menu options
    const options = ["Game Details", "Lobby", "Analysis"];

    // Color classes to cycle through
    const colorClasses = ["primary", "success", "danger", "warning"];

    return (
        <Row className="replay-preview-container">
            {/* Button List */}
            <Col md={2}>
                <div className="button-list">
                    {options.map((option, index
                    ) => (
                        <Button
                            key={option}
                            variant={
                                props.selectedOption === option
                                    ? colorClasses[index % colorClasses.length]
                                    : `outline-${colorClasses[index % colorClasses.length]}`
                            }
                            className="menu-button nav-item small-tabs w-100"
                            onClick={() => props.setSelectedOption?.(option)}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </Col>

            {/* Dynamic Content */}
            <Col md={10}>
                {/*<div>*/}
                {componentsMap[props?.selectedOption ?? "Game Details"]}
                {/*</div>*/}
            </Col>
        </Row>
    );
}
export default ReplayPreviewComponent;