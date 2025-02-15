import ReactECharts from 'echarts-for-react';
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import "../css/GraphComponent.css";
import GraphUtils from "../utils/graphs/GraphUtils.ts";
import {GraphComponentProps} from "../types/GraphComponentProps.ts";

const GraphUnitsKilledComponent = (props: GraphComponentProps) => {

    const data = props.data;

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h3>Units killed</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs id="controlled-tab-example" variant="underline" defaultActiveKey="tech1"
                              className="mb-3 small-tabs">
                            <Tab eventKey="tech1" title="Tech 1">
                                <ReactECharts option={GraphUtils.getTotalTech1UnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="tech2" title="Tech 2">
                                <ReactECharts option={GraphUtils.getTotalTech2UnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="tech3" title="Tech 3">
                                <ReactECharts option={GraphUtils.getTotalTech3UnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="experimental" title="Experimental">
                                <ReactECharts option={GraphUtils.getTotalTech4UnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="structures" title="Structures">
                                <ReactECharts option={GraphUtils.getTotalStructuresKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="air" title="Air">
                                <ReactECharts option={GraphUtils.getTotalAirUnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="land" title="Land">
                                <ReactECharts option={GraphUtils.getTotalLandUnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="naval" title="Naval">
                                <ReactECharts option={GraphUtils.getTotalNavalUnitsKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="sacu" title="S-ACU">
                                <ReactECharts option={GraphUtils.getTotalSacuKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="transportation" title="Transportation">
                                <ReactECharts option={GraphUtils.getTotalTransportationKilledOption(data)}/>
                            </Tab>
                            <Tab eventKey="engineer" title="Engineer">
                                <ReactECharts option={GraphUtils.getTotalEngineerKilledOption(data)}/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default GraphUnitsKilledComponent;