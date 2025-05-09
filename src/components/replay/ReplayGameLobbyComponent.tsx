import {Card, Col, Row, Table} from "react-bootstrap";
import StringUtils from "../../utils/StringUtils.ts";
import uefLogo from "../../assets/uef.png";
import cybranLogo from "../../assets/cybran.png";
import aeonLogo from "../../assets/aeon.png";
import seraphimLogo from "../../assets/seraphim.png";
import {useEffect, useState} from "react";
import {Player, ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import LOG from "../../utils/Logger.ts";
import ReplayMapPreviewComponent from "./ReplayMapPreviewComponent.tsx";

const ReplayGameLobbyComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

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

    return (<Card className={"preview-card"}>
        <Card.Title>
            <span className={"ms-3 pt-2"} style={{fontSize: "20px"}}>Lobby</span>
        </Card.Title>
        <Card.Body>
            <Row>
                <Col>
                    <Card>
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
                <Col>
                    <ReplayMapPreviewComponent data={data}/>
                </Col>
            </Row>

        </Card.Body>
    </Card>);
}

export default ReplayGameLobbyComponent;