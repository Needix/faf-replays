import "./css/HomePage.css";
import NavbarComponent from "../components/NavbarComponent.tsx";
import {Col, Row} from "react-bootstrap";

const HomePage = () => {

    return (
        <div>
            <NavbarComponent />
            <Row style={{maxWidth: "100vw"}}>
                <Col>
                    HOME
                </Col>
            </Row>
        </div>
    )
}
export default HomePage;