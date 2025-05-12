import {Card, Col, Row, Table} from "react-bootstrap";
import StringUtils from "../../utils/StringUtils.ts";
import uefLogo from "../../assets/uef.png";
import cybranLogo from "../../assets/cybran.png";
import aeonLogo from "../../assets/aeon.png";
import seraphimLogo from "../../assets/seraphim.png";
import nomadLogo from "../../assets/nomad.png";
import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import ReplayMapPreviewComponent from "./ReplayMapPreviewComponent.tsx";
import {ReplayPlayer} from "../../api/Api.ts";

const ReplayGameLobbyComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;
    const playerRecords = data?.players ?? {};
    const playerSummaries = data.playerScores ?? [];

    const gameColors = [
        "#FFe80a0a", // (01) Cybran red
        "#ff901427", // (02) dark red
        "#FFFF873E", // (03) Nomads orange
        "#ffb76518", // (04) new brown
        "#ffa79602", // (05) Sera golden
        "#fffafa00", // (06) new yellow
        "#ff9fd802", // (07) Order Green
        "#ff40bf40", // (08) mid green
        "#ff2e8b57", // (09) new green
        "#FF2F4F4F", // (10) olive (dark green)
        "#ff436eee", // (11) new blue1
        "#FF2929e1", // (12) UEF blue
        "#FF5F01A7", // (13) dark purple
        "#ff9161ff", // (14) purple
        "#ff66ffcc", // (15) aqua
        "#ffffffff", // (16) white
        "#ff616d7e", // (17) grey
        "#ffff88ff", // (18) pink
        "#ffff32ff", // (19) new fuschia
    ];

    const players = Object.entries(playerRecords).map(([, value]) => {
        return value
    });

    function getPlayerSummary(player: ReplayPlayer) {
        return playerSummaries?.find((summary) => summary.name === player.name) ?? null;
    }

    function getPlayerPosition(player: ReplayPlayer) {
        return <div style={{textAlign: "center"}}>{player.playerId}</div>
    }

    function getPlayerName(player: ReplayPlayer) {
        return <div style={{textAlign: "left"}}
                    title={player?.name}>
            {StringUtils.ellipsis(player?.name ?? "", 15)}
        </div>
    }

    function getFactionImage(player: ReplayPlayer) {
        const faction = Number.parseInt(player.armyInformation?.["Faction"]?.toString() ?? "-1");
        let title = "Unknown";
        let src = "";
        if (faction === 1) {
            src = uefLogo;
            title = "UEF";
        }
        if (faction === 2) {
            src = aeonLogo;
            title = "Aeon";
        }
        if (faction === 3) {
            src = cybranLogo;
            title = "Cybran";
        }
        if (faction === 4) {
            src = seraphimLogo;
            title = "Seraphim";
        }
        if (faction === 5) {
            src = nomadLogo;
            title = "Nomad";
        }
        return <img
            height={"15em"}
            className={"mb-1"}
            src={src}
            alt={title}
            title={title}
        />
    }

    function getPlayerCountry(player: ReplayPlayer) {
        const countryId = player.armyInformation?.["Country"]?.toString() ?? "earth";

        const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
        const countryName = countryId == "earth" ? "Earth" : regionNames.of(countryId.toUpperCase().substring(0, 2));  // "United States"

        return <img
            height={"15em"}
            className={"mb-1"}
            src={"flags/" + countryId + ".png"}
            alt={countryName}
            title={countryName}
        />
    }

    function getPlayerRating(player: ReplayPlayer) {
        return <div style={{textAlign: "right"}}>{player.armyInformation?.["PL"]?.toString() ?? "1500"}</div>
    }

    function getPlayerGamesPlayed(player: ReplayPlayer) {
        return <div style={{textAlign: "right"}}>{player.armyInformation?.["NG"]?.toString() ?? "0"}</div>
    }

    function getPlayerColor(player: ReplayPlayer) {
        const playerColor = Number.parseInt(player.armyInformation?.["PlayerColor"]?.toString() ?? "0");
        const color = gameColors[playerColor] ?? "#FFe80a0a";
        return <div style={{backgroundColor: color}}
                    role="presentation"
                    aria-label="Player color block"
        >#</div>;
    }

    function getPlayerTeamNumber(player: ReplayPlayer) {
        return Number.parseInt(player.armyInformation?.["Team"]?.toString() ?? "0") - 1;
    }

    function getPlayerCPU(player: ReplayPlayer) {

    }

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
                                <thead>
                                <tr>
                                    <td className="py-0">Position</td>
                                    <td className="py-0">Country</td>
                                    <td className="py-0">Rating</td>
                                    <td className="py-0">Games</td>
                                    <td className="py-0">Name</td>
                                    <td className="py-0">Color</td>
                                    <td className="py-0">Faction</td>
                                    <td className="py-0">Team</td>
                                    <td className="py-0">CPU</td>
                                </tr>
                                </thead>
                                <tbody>
                                {players.map((player, index) => (
                                    <tr key={index}>
                                        <td className="py-0">{getPlayerPosition(player)}</td>
                                        <td className="py-0">{getPlayerCountry(player)}</td>
                                        <td className="py-0">{getPlayerRating(player)}</td>
                                        <td className="py-0">{getPlayerGamesPlayed(player)}</td>
                                        <td className="py-0">{getPlayerName(player)}</td>
                                        <td className="py-0">{getPlayerColor(player)}</td>
                                        <td className="py-0">{getFactionImage(player)}</td>
                                        <td className="py-0">{getPlayerTeamNumber(player)}</td>
                                        <td className="py-0">{getPlayerCPU(player)}</td>
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