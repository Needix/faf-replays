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

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const completeMapPath = data.mapName ?? "Unknown";

    const [imageError, setImageError] = useState(false);
    const mapName = completeMapPath.split('/')[2].toLowerCase().replace('.scmap', '');
    const url = `https://content.faforever.com/maps/previews/large/${mapName}.png`;

    const [playerData, setPlayerData] = useState<Player[]>([]);

    useEffect(() => {
        const playerDataArray: Player[] = [];

        if (data.players && data.playerScores) {
            Object.entries(data.players).forEach(([playerId, player]) => {
                const playerScore = data.playerScores?.find(score => score.name === player.name); // Find the score by matching `name` or fallback to a default
                const playerDataEntry: Player = {
                    id: player.id ?? 0,
                    name: player.name ?? "",
                    position: parseInt(playerId),
                    playerId: player.playerId ?? 0,
                    score: playerScore?.general?.score ?? -1,
                    faction: playerScore?.faction ?? -1
                };
                playerDataArray.push(playerDataEntry);
            });
        }

        setPlayerData(playerDataArray);
        LOG.debug(JSON.stringify(playerDataArray));
    }, [data]);

    LOG.debug(JSON.stringify(playerData));

    return (
        <>
            <Row>
                <Col>
                    <ReplayGameDetailsComponent data={data}/>
                </Col>
                <Col sm={"3"}>
                    <Card className={"preview-card"}>
                        <Card.Title>
                            <span className={"ms-3 pt-2"} style={{fontSize: "20px"}}>Players</span>
                        </Card.Title>
                        <Card.Body>

                            <Table className={"table-sm custom-table"} hover striped borderless>
                                <tbody>
                                {playerData.map((player, index) => (
                                    <tr key={player.id + index}>
                                        <td className="py-0">{player.playerId}</td>
                                        <td className="py-0">{StringUtils.ellipsis(player.name, 15)}</td>
                                        <td className="py-0">
                                            {player.faction === 1 && (
                                                <img
                                                    height={"15em"}
                                                    className={"mb-1"}
                                                    src={uefLogo}
                                                    alt="UEF"
                                                    title={"UEF"}
                                                />
                                            )}
                                            {player.faction === 3 && (
                                                <img
                                                    height={"15em"}
                                                    className={"mb-1"}
                                                    src={cybranLogo}
                                                    alt="Cybran"
                                                    title={"Cybran"}
                                                />
                                            )}
                                            {player.faction === 2 && (
                                                <img
                                                    height={"15em"}
                                                    className={"mb-1"}
                                                    src={aeonLogo}
                                                    alt="Aeon"
                                                    title={"Aeon"}
                                                />
                                            )}
                                            {player.faction === 4 && (
                                                <img
                                                    height={"15em"}
                                                    className={"mb-1"}
                                                    src={seraphimLogo}
                                                    alt="Seraphim"
                                                    title={"Seraphim"}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
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