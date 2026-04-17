import {PlayerPreviewComponentProps} from "./../types/PlayerPreviewComponentProps.ts";
import {Accordion, Card, CardBody, CardHeader, Table} from "react-bootstrap";

const PlayerPreviewComponent = (props: PlayerPreviewComponentProps) => {
    const player = props.data;
    const summary = player.playerSummary;

    const ratingHistorySorted = summary?.ratingHistory
        ? [...summary.ratingHistory].sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
        : [];
    const formatNumber = (value?: number) => (value ?? 0).toLocaleString();

    return (
        <Card>
            <CardHeader>
                <h5>{props.data.name}</h5>
            </CardHeader>
            <CardBody>
                <Table className={"table-sm custom-table"} hover striped borderless>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{props.data.name}</td>
                    </tr>
                    <tr>
                        <td>Also known as</td>
                        <td>{summary?.playerNameHistory
                            ? Object.values(summary.playerNameHistory).join(", ")
                            : "No history available"}</td>
                    </tr>
                    <tr>
                        <td>Total replays</td>
                        <td>{summary?.totalReplays}</td>
                    </tr>
                    </tbody>
                </Table>

                <h6 className="mt-4 mb-3">Statistics</h6>
                <Accordion>

                    {ratingHistorySorted.length > 0 && (
                        <Accordion.Item eventKey="rating-history">
                            <Accordion.Header>Rating History</Accordion.Header>
                            <Accordion.Body>
                                <Table size="sm" striped hover className="text-small">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Games</th>
                                        <th>Rating</th>
                                        <th>Mean</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ratingHistorySorted.map((entry, idx) => (
                                        <tr key={idx}>
                                            <td>{entry.date ? new Date(entry.date).toLocaleDateString() : "N/A"}</td>
                                            <td>{entry.gamePlayed}</td>
                                            <td>{entry.rating}</td>
                                            <td>{entry.mean}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {summary?.factionStats && Object.entries(summary.factionStats).map(([factionName, stats]) => (
                        <Accordion.Item eventKey={factionName} key={factionName}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100 me-3">
                                    <span>{factionName}</span>
                                    <small className="text-muted">
                                        Wins: {stats.totalWins} / {stats.totalReplays}
                                    </small>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Resources</h6>
                                        <Table size="sm" className="text-small">
                                            <tbody>
                                            <tr>
                                                <td>Mass Shared</td>
                                                <td>{formatNumber(stats.totalMassShared)}</td>
                                            </tr>
                                            <tr>
                                                <td>Energy Shared</td>
                                                <td>{formatNumber(stats.totalEnergyShared)}</td>
                                            </tr>
                                            <tr>
                                                <td>Mass Received</td>
                                                <td>{formatNumber(stats.totalMassReceived)}</td>
                                            </tr>
                                            <tr>
                                                <td>Energy Received</td>
                                                <td>{formatNumber(stats.totalEnergyReceived)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Mass In</td>
                                                <td>{formatNumber(stats.resourceStats?.massin?.total)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Mass Out</td>
                                                <td>{formatNumber(stats.resourceStats?.massout?.total)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Energy In</td>
                                                <td>{formatNumber(stats.resourceStats?.energyin?.total)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Energy Out</td>
                                                <td>{formatNumber(stats.resourceStats?.energyout?.total)}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Unit Overview</h6>
                                        <Table size="sm" className="text-small">
                                            <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Built</th>
                                                <th>Kills</th>
                                                <th>Lost</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {stats.unitStats && Object.entries(stats.unitStats)
                                                .filter(([_, details]) => details && (details.built || details.kills || details.lost))
                                                .map(([type, details]) => (
                                                    <tr key={type}>
                                                        <td>{type}</td>
                                                        <td>{details.built || 0}</td>
                                                        <td>{details.kills || 0}</td>
                                                        <td>{details.lost || 0}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <h6>Game Types</h6>
                                        <Table size="sm" className="text-small">
                                            <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Played</th>
                                                <th>Won</th>
                                                <th>Win %</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {stats.playedGameTypeCount
                                                ? Object.entries(stats.playedGameTypeCount)
                                                    .sort((a, b) => b[1] - a[1])
                                                    .map(([type, played]) => {
                                                        const won = stats.wonGameTypeCount?.[type] ?? 0;
                                                        const winRate = played > 0 ? Math.round((won / played) * 100) : 0;
                                                        return (
                                                            <tr key={type}>
                                                                <td>{type}</td>
                                                                <td>{played}</td>
                                                                <td>{won}</td>
                                                                <td>{winRate}%</td>
                                                            </tr>
                                                        );
                                                    })
                                                : (
                                                    <tr>
                                                        <td colSpan={4}>No data</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <h6>Colors</h6>
                                        <Table size="sm" className="text-small">
                                            <thead>
                                            <tr>
                                                <th>Color</th>
                                                <th>Played</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {stats.playedColorCount
                                                ? Object.entries(stats.playedColorCount)
                                                    .sort((a, b) => b[1] - a[1])
                                                    .map(([color, count]) => (
                                                        <tr key={color}>
                                                            <td>{color}</td>
                                                            <td>{count}</td>
                                                        </tr>
                                                    ))
                                                : (
                                                    <tr>
                                                        <td colSpan={2}>No data</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </CardBody>
        </Card>
    )
}
export default PlayerPreviewComponent;
