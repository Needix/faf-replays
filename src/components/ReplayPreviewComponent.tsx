import {Player, ReplayPreviewComponentProps} from "./types/ReplayPreviewComponentProps.ts";
import {Card, Col, Row, Table} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import LOG from "../utils/Logger.ts";

import uefLogo from "../assets/uef.png";
import aeonLogo from "../assets/aeon.png";
import cybranLogo from "../assets/cybran.png";
import seraphimLogo from "../assets/seraphim.png";
import StringUtils from "../utils/StringUtils.ts";

import map from "../assets/maps/dualgap_reworked.png";
import TimeUtils from "../utils/TimeUtils.ts";
import GraphOverallComponent from "./graph/GraphOverallComponent.tsx";
import GraphUnitsBuiltComponent from "./graph/GraphUnitsBuiltComponent.tsx";

import "./css/ReplayPreviewComponent.css";
import GraphUnitsLostComponent from "./graph/GraphUnitsLostComponent.tsx";
import GraphUnitsKilledComponent from "./graph/GraphUnitsKilledComponent.tsx";

const ReplayPreviewComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const title = data.replayTitle;
    const mapName = data.mapName;
    const gameStart = data.gameStart;
    const gameEnd = data.gameEnd;
    const gameVersion = data.supComVersion;
    const playerCount = data.numberOfPlayers;
    const featureMod = data.featuredMod;
    const replayVersion = data.replayVersion;
    const recorder = data.recorder;
    const cheatsEnabled = data.cheatsEnabled;
    const randomSeed = data.randomSeed;

    const [playerData, setPlayerData] = useState<Player[]>([]);
    const [currentSection, setCurrentSection] = useState(0);

    const cardBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const playerDataArray: Player[] = [];

        if (data.players && data.playerScores) {
            Object.entries(data.players).forEach(([playerId, player]) => {
                const playerScore = data.playerScores.find(score => score.name === player.name); // Find the score by matching `name` or fallback to a default
                const playerDataEntry: Player = {
                    id: player.id,
                    name: player.name,
                    position: parseInt(playerId),
                    playerId: player.playerId,
                    score: 0,
                    faction: 0
                };
                if (playerScore) {
                    playerDataEntry.score = playerScore.general.score;
                    playerDataEntry.faction = playerScore.faction;
                }
                playerDataArray.push(playerDataEntry);
            });
        }

        setPlayerData(playerDataArray);
        LOG.debug(JSON.stringify(playerDataArray));
    }, [data]);

    useEffect(() => {
        const cardBody = cardBodyRef.current;
        if (cardBody) cardBody.addEventListener("scroll", handleScroll);

        return () => {
            if (cardBody) cardBody.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const cardBody = cardBodyRef.current;

        if (cardBody) {
            const sectionHeight = cardBody.clientHeight; // Get the visible height of the container
            const scrollTop = cardBody.scrollTop; // Get the scroll position
            const totalSections = cardBody.childElementCount; // Number of sections

            // Ensure we calculate the current section correctly
            const sectionIndex = Math.round(scrollTop / sectionHeight);

            // Prevent index out of bounds (if scrolling ends are imprecise)
            setCurrentSection(Math.min(Math.max(sectionIndex, 0), totalSections - 1));
        }
    };

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
                                        title={mapName}>{StringUtils.ellipsis(mapName, 60)}</span></td>
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
                                      style={{fontSize: "20px"}}>Map: {StringUtils.ellipsis(data.mapName.split("/")[data.mapName.split("/").length - 1], 25)}</span>
                        </Card.Title>
                        <Card.Body>
                            <img className={"map-preview"} src={map} alt={data.mapName}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={"mt-2"}>
                <Col>
                    <Card className={"preview-card-graph"}>
                        <Card.Body className="scrollable-card-body" ref={cardBodyRef}>

                            <div className="scroll-section">
                                <GraphOverallComponent data={data}/>
                            </div>


                            <div className="scroll-section">
                                <GraphUnitsBuiltComponent data={data}/>
                            </div>

                            <div className="scroll-section">
                                <GraphUnitsLostComponent data={data}/>
                            </div>

                            <div className="scroll-section">
                                <GraphUnitsKilledComponent data={data}/>
                            </div>
                        </Card.Body>


                        <div className="indicator-container">
                            {[...Array(4)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`indicator ${currentSection === index ? "active" : ""}`}
                                ></div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default ReplayPreviewComponent;