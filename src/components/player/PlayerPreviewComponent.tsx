import {PlayerPreviewComponentProps} from "./../types/PlayerPreviewComponentProps.ts";
import {Card, CardBody, CardHeader, Table} from "react-bootstrap";

const PlayerPreviewComponent = (props: PlayerPreviewComponentProps) => {

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
                        <td>Total replays</td>
                        <td>{props.data.playerSummary?.totalReplays}</td>
                    </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
export default PlayerPreviewComponent;