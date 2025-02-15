import ReactECharts from 'echarts-for-react';
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import "../css/GraphComponent.css";
import GraphUtils from "../utils/graphs/GraphUtils.ts";
import {GraphComponentProps} from "../types/GraphComponentProps.ts";

const GraphUnitsLostComponent = (props: GraphComponentProps) => {

    const data = props.data;

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h3>Units lost</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tabs id="controlled-tab-example" variant="underline" defaultActiveKey="tech1"
                              className="mb-3 small-tabs">
                            <Tab eventKey="tech1" title="Tech 1">
                                <ReactECharts option={GraphUtils.getTotalTech1UnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="tech2" title="Tech 2">
                                <ReactECharts option={GraphUtils.getTotalTech2UnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="tech3" title="Tech 3">
                                <ReactECharts option={GraphUtils.getTotalTech3UnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="experimental" title="Experimental">
                                <ReactECharts option={GraphUtils.getTotalTech4UnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="structures" title="Structures">
                                <ReactECharts option={GraphUtils.getTotalStructuresLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="air" title="Air">
                                <ReactECharts option={GraphUtils.getTotalAirUnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="land" title="Land">
                                <ReactECharts option={GraphUtils.getTotalLandUnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="naval" title="Naval">
                                <ReactECharts option={GraphUtils.getTotalNavalUnitsLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="sacu" title="S-ACU">
                                <ReactECharts option={GraphUtils.getTotalSacuLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="transportation" title="Transportation">
                                <ReactECharts option={GraphUtils.getTotalTransportationLostOption(data)}/>
                            </Tab>
                            <Tab eventKey="engineer" title="Engineer">
                                <ReactECharts option={GraphUtils.getTotalEngineerLostOption(data)}/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default GraphUnitsLostComponent;