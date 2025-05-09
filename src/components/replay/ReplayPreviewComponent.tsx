import {Player, ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {Card, Col, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import LOG from "../../utils/Logger.ts";

import uefLogo from "../../assets/uef.png";
import aeonLogo from "../../assets/aeon.png";
import cybranLogo from "../../assets/cybran.png";
import seraphimLogo from "../../assets/seraphim.png";
import StringUtils from "../../utils/StringUtils.ts";

import TimeUtils from "../../utils/TimeUtils.ts";

import "../css/ReplayPreviewComponent.css";
import ReplaySummaryGraphs from "./ReplaySummaryGraphs.tsx";

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const title = data.replayTitle ?? "Unknown";
    const completeMapPath = data.mapName ?? "Unknown";
    const gameStart = data.gameStart ?? -1;
    const gameEnd = data.gameEnd ?? -1;
    const gameVersion = data.supComVersion ?? "Unknown";
    const playerCount = data.numberOfPlayers ?? -1;
    const featureMod = data.featuredMod ?? "Unknown";
    const replayVersion = data.replayVersion ?? -1;
    const recorder = data.recorder ?? "Unknown";
    const cheatsEnabled = data.cheatsEnabled ?? false;
    const randomSeed = data.randomSeed ?? -1;

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
                    <Card className={"preview-card"}>
                        <Card.Title>
                            <span className={"ms-3 pt-2"} style={{fontSize: "20px"}}>Game Stats</span>
                        </Card.Title>
                        <Card.Body>
                            <Table className={"table-sm custom-table"} hover striped borderless>
                                <tbody>
                                <tr>
                                    <td className="py-0"><span>Title </span></td>
                                    <td className="py-0"><span title={title}>{StringUtils.ellipsis(title, 60)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Map </span></td>
                                    <td className="py-0"><span
                                        title={completeMapPath}>{StringUtils.ellipsis(completeMapPath, 60)}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Duration </span></td>
                                    <td className="py-0">
                                        <span>{TimeUtils.calculateDurationBetweenEpochs(gameStart, gameEnd)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Player Count </span></td>
                                    <td className="py-0"><span>{playerCount}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Game start </span></td>
                                    <td className="py-0">
                                        <span> {TimeUtils.convertEpochToLocalDateTime(gameStart)}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Game end </span></td>
                                    <td className="py-0"><span> {TimeUtils.convertEpochToLocalDateTime(gameEnd)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Game Version </span></td>
                                    <td className="py-0"><span
                                        title={gameVersion}>{StringUtils.ellipsis(gameVersion, 60)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Feature Mod </span></td>
                                    <td className="py-0"><span
                                        title={featureMod}>{StringUtils.ellipsis(featureMod, 60)}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Replay Version </span></td>
                                    <td className="py-0"><span
                                        title={"" + replayVersion}>{StringUtils.ellipsis("" + replayVersion, 60)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Recorder </span></td>
                                    <td className="py-0"><span
                                        title={recorder}>{StringUtils.ellipsis(recorder, 60)}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Cheats Enabled </span></td>
                                    <td className="py-0"><span>{cheatsEnabled ? "Yes" : "No"}</span></td>
                                </tr>
                                <tr>
                                    <td className="py-0"><span>Random Seed </span></td>
                                    <td className="py-0"><span>{randomSeed}</span></td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
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