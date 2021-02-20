import { useContext } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { PlaceContext } from "../../contexts/PlaceProvider";
function Navbar() {

    const { setModal } = useContext(PlaceContext);

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
                    <Nav className="mr-auto">
                        <Nav.Link href="!#" onClick={handleShow}>Add Your Place</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}

export default Navbar
