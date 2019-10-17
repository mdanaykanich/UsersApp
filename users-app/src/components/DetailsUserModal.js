import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class DetailsUserModal extends Component {
    constructor(props) {
        super(props);
        // this.state = { snackbaropen: false, snackbarmsg: '' };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            User details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form>
                                    <Form.Group controlId="Id">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control
                                        className="font-weight-bold"
                                        plaintext
                                        name="Id" 
                                        readOnly
                                        defaultValue={this.props.userid} />
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                        className="font-weight-bold"
                                        plaintext
                                        name="Name" 
                                        readOnly
                                        defaultValue={this.props.username}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}