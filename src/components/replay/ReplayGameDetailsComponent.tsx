import {Button, Card, Table} from "react-bootstrap";
import StringUtils from "../../utils/StringUtils.ts";
import TimeUtils from "../../utils/TimeUtils.ts";
import {ReplayPreviewComponentProps} from "../types/ReplayPreviewComponentProps.ts";
import {Api} from "../../api/Api.ts";

const ReplayGameDetailsComponent = (props: ReplayPreviewComponentProps) => {
    const data = props.data;

    const ApiController = new Api().api;

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

    function downloadReplay(replayId: number) {
        ApiController.getReplayFile(replayId).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to download replay file: ${response.statusText}`);
            }

            const fileName = `${replayId}.fafreplay`;
            const mimeType = 'application/octet-stream';

            // Read the response as a Blob
            response.blob().then((replayBlob) => {
                // Create a temporary URL for the downloaded file
                const fileUrl = URL.createObjectURL(replayBlob);

                // Create an invisible anchor element to trigger the download
                const a = document.createElement('a');
                a.href = fileUrl;
                a.download = fileName;
                a.type = mimeType;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Revoke the temporary URL after opening
                URL.revokeObjectURL(fileUrl);
            }).catch((error) => {
                console.error('Error viewing replay:', error);
                alert('An error occurred while trying to download the replay. Please try again.');
            });
        });
    }

    return (<Card className={"preview-card"}>
        <Card.Title>
            <span className={"ms-3 pt-2"} style={{fontSize: "20px"}}>Game Stats</span>
        </Card.Title>
        <Card.Body>
            <Table className={"table-sm custom-table"} hover striped borderless>
                <thead>
                <tr>
                    <td style={{width: "15%"}}></td>
                    <td className="py-0"></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-0"><span>Title </span></td>
                    <td className="py-0"><span title={title}>{StringUtils.ellipsis(title, 100)}</span>
                    </td>
                </tr>
                <tr>
                    <td className="py-0"><span>Map </span></td>
                    <td className="py-0"><span
                        title={completeMapPath}>{StringUtils.ellipsis(completeMapPath, 100)}</span></td>
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
            <Button className={"btn-sm float-end me-2"}
                    onClick={() => downloadReplay(data.id ?? 0)}>
                Download</Button>
        </Card.Body>
    </Card>);
}
export default ReplayGameDetailsComponent;