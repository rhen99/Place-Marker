import { useContext } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { PlaceContext } from "../../contexts/PlaceProvider";
import { AuthContext } from "../../contexts/AuthProvider";
function Navbar() {

    const { setModal } = useContext(PlaceContext);
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleShow = (e) => {
        e.preventDefault();
        setModal(true);
    }


    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="#home">LAGS Place Marker</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    { isAuthenticated ? (
                        <>
                        <Nav className="mr-auto">
                            <Nav.Link href="!#" onClick={handleShow}>Add Your Place</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="!#" onClick={logout}>Logout</Nav.Link>
                        </Nav>
                        </>
                    ) : null}
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}

export default Navbar
