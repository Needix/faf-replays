import {Card} from "react-bootstrap";
import StringUtils from "../../utils/StringUtils.ts";
import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {useState} from "react";
import {Api} from "../../api/Api.ts";

import './../css/ReplayMapPreviewComponent.css';

const ReplayMapPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const completeMapPath = data.mapName ?? "Unknown";

    const [imageError, setImageError] = useState(false);
    const mapName = completeMapPath.split('/')[2].toLowerCase().replace('.scmap', '');
    const url = new Api().baseUrl + `/api/v1/maps/preview?mapName=${encodeURIComponent(mapName)}`;


    return (<Card className={"preview-card map-preview-component"}>
        <Card.Title>
                                <span className={"ms-3 pt-2"}
                                      style={{fontSize: "20px"}}
                                      title={mapName}>Map: {StringUtils.ellipsis(mapName, 25)}</span>
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
    </Card>)
        ;
}
export default ReplayMapPreviewComponent;