import { useContext } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

import { AuthContext } from '../../contexts/AuthProvider'
function Login() {
    const {login} = useContext(AuthContext);
    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            <Button block variant="danger" onClick={login}>Login With Google</Button>
                            <Button block variant="primary" onClick={login}>Login With Facebook</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Login
