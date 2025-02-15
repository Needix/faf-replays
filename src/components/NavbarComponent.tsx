import {Nav, Navbar} from "react-bootstrap";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";


const NavbarComponent = () => {
    return (
        <div className={"header"}>
            <Navbar className="" bg="dark" data-bs-theme="dark">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top logo"
                    />
                    Replay Analyzer
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to="/" className="link-uef">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/replays" className="link-aeon">Replays</Link></Nav.Link>
                    <Nav.Link><Link to="/players" className="link-cybran">Players</Link></Nav.Link>
                    <Nav.Link><Link to="/request" className="link-seraphim">Request replay</Link></Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;