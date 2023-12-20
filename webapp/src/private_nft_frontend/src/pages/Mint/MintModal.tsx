import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import Dropzone from "../../components/Dropzone/Dropzone";

const MintModal = (props: {
    showModal: boolean
    handleCloseModal: () => void
}) => {
    const {showModal, handleCloseModal} = props;
    const [file, setFile] = useState(undefined as undefined|File);

    return <Modal show={showModal} onHide={handleCloseModal} centered size={"xl"}>
        <Modal.Header closeButton>
            <Modal.Title>Mint NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form>
                        <Stack gap={2}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" />
                                <Form.Text className="text-muted">
                                    The title of the NFT
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as={"textarea"}  type="text" rows={4} />
                                <Form.Text className="text-muted">
                                    The description of the NFT
                                </Form.Text>
                            </Form.Group>
                        </Stack>
                    </Form>
                </Col>
                <Col>
                    <Dropzone setFile={setFile} />
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
            </Button>
            <Button variant="primary">
                Mint
            </Button>
        </Modal.Footer>
    </Modal>;
}

export default MintModal;
