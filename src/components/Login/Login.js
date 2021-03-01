import { useContext } from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";

import { AuthContext } from '../../contexts/AuthProvider';
import { googleProvider } from "../../firebase/config";
function Login() {
    const {login, error} = useContext(AuthContext);
    return (
        <Container>
            <Row className="justify-content-center my-3">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            {error ? (<Alert variant="danger">{error}</Alert>) : ''}
                            <Button block variant="danger" onClick={() => login(googleProvider)}>Login With Google</Button>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Login
