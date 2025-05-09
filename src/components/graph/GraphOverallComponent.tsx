import ReactECharts from 'echarts-for-react';
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import "../css/GraphComponent.css";
import GraphUtils from "../utils/graphs/GraphUtils.ts";
import {GraphComponentProps} from "../types/GraphComponentProps.ts";

const GraphOverallComponent = (props: GraphComponentProps) => {

    const data = props.data?.playerScores ?? [];

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h3>Overall</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs id="controlled-tab-example" variant="underline" defaultActiveKey="score"
                              className="mb-3 small-tabs">
                            <Tab eventKey="score" title="Score">
                                <ReactECharts option={GraphUtils.getScoreOption(data)}/>
                            </Tab>
                            <Tab eventKey="mass" title="Total mass produced">
                                <ReactECharts option={GraphUtils.getTotalMassOption(data)}/>
                            </Tab>
                            <Tab eventKey="energy" title="Total energy produced">
                                <ReactECharts option={GraphUtils.getTotalEnergyOption(data)}/>
                            </Tab>
                            <Tab eventKey="units" title="Total units built">
                                <ReactECharts option={GraphUtils.getTotalUnitsBuiltOption(data)}/>
                            </Tab>
                            <Tab eventKey="structures" title="Total structures built">
                                <ReactECharts option={GraphUtils.getTotalStructuresBuiltOption(data)}/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default GraphOverallComponent;