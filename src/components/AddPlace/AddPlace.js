import { useContext } from "react";
import { PlaceContext } from "../../contexts/PlaceProvider";
import {Modal, Button, Form, Alert} from 'react-bootstrap'

function AddPlace() {
    const { show, setModal, place, setPlace, useCurrentLocation, setUseCurrentLocation, error, success, handleSubmit } = useContext(PlaceContext)
    return (
        <Modal show={show} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error ? 
            <Alert variant="danger">
                {error}
            </Alert>
            : ''}
            {success ? 
            <Alert variant="success">
                {success}
            </Alert>
            : ''}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control name="title" id="title" onChange={(e) => setPlace({...place, [e.target.name]: e.target.value})} value={place.title}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control as="textarea" name="description" id="title" onChange={(e) => setPlace({...place, [e.target.name]: e.target.value})} value={place.description}/>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox"  label="Use Your Current Location" checked={useCurrentLocation ? true : false} onChange={() => setUseCurrentLocation(!useCurrentLocation)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="latitude">Latitude</Form.Label>
                    <Form.Control name="latitude" id="latitude" onChange={(e) => setPlace({...place, [e.target.name]: e.target.value})} value={place.latitude} disabled={useCurrentLocation ? true : false}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="longitude">Longitude</Form.Label>
                    <Form.Control name="longitude" id="longitude" onChange={(e) => setPlace({...place, [e.target.name]: e.target.value})} value={place.longitude} disabled={useCurrentLocation ? true : false}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Place
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}

export default AddPlace
