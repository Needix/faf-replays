import {Card, Table} from "react-bootstrap";
import StringUtils from "../../utils/StringUtils.ts";
import TimeUtils from "../../utils/TimeUtils.ts";
import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";

const ReplayGameDetailsComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const completeMapPath = data.mapName ?? "Unknown";

    const title = data.replayTitle ?? "Unknown";
    const gameStart = data.gameStart ?? -1;
    const gameEnd = data.gameEnd ?? -1;
    const gameVersion = data.supComVersion ?? "Unknown";
    const playerCount = data.numberOfPlayers ?? -1;
    const featureMod = data.featuredMod ?? "Unknown";
    const replayVersion = data.replayVersion ?? -1;
    const recorder = data.recorder ?? "Unknown";
    const cheatsEnabled = data.cheatsEnabled ?? false;
    const randomSeed = data.randomSeed ?? -1;

    return (<Card className={"preview-card"}>
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
    </Card>);
}
export default ReplayGameDetailsComponent;