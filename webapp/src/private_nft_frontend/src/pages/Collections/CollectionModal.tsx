import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row, Stack } from "react-bootstrap";
import Dropzone from "../../components/Dropzone/Dropzone";
import { SmartContract, useContractWrite, useStorage } from "@thirdweb-dev/react";

const CollectionModal = (props: {
    showModal: boolean
    closeModal: () => void,
    collection: SmartContract|undefined,
    edition: SmartContract|undefined,
    address: string|undefined
}) => {
    const {
        showModal,
        closeModal,
        collection,
        edition,
        address
    } = props;

    const [title, setTitle] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [isSingleEdition, setIsSingleEdition] = useState(true);
    const [url, setUrl] = useState("");
    const [image, setImage] = useState(undefined as File|undefined);
    const [
        imageUrl,
        setImageUrl
    ] = useState(undefined as string|undefined);

    const storage = useStorage();

    const {mutateAsync: createCollection} = useContractWrite(
        collection,
        "createCollection"
    );
    const {mutateAsync: createEdition} = useContractWrite(
        edition,
        "createEdition"
    );


    const handleCloseModal = () => {
        closeModal();
        setTitle("");
        setSymbol("");
        setDescription("");
        setIsSingleEdition(true);
        setUrl("");
        setImage(undefined);
        setImageUrl(undefined);
    }

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const dataURL = e.target?.result;
                setImageUrl(dataURL as string);
            };
            reader.readAsDataURL(image);
        } else {
            setImageUrl(undefined);
        }
    }, [image]);

    return <Modal show={showModal} onHide={handleCloseModal} centered size={"xl"}>
        <Modal.Header closeButton>
            <Modal.Title>Create new collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form>
                        <Stack gap={2}>
                            <Form.Group className="flex-grow-1" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    This is the title of the collection
                                </Form.Text>
                            </Form.Group>
                            {
                                isSingleEdition && <Form.Group className="flex-grow-1" controlId="symbol">
                                    <Form.Label>Symbol</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={symbol}
                                        onChange={(event) => setSymbol(event.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        This is the symbol of the collection
                                    </Form.Text>
                                </Form.Group>
                            }
                            <Form.Group className="flex-grow-1" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    This is the description of the collection
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="flex-grow-1" controlId="projectURI">
                                <Form.Label>Project url</Form.Label>
                                <Form.Control
                                    type="url"
                                    value={url}
                                    onChange={(event) => setUrl(event.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    This is the URL of the project
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="flex-grow-1" controlId="type">
                                <Form.Label>Type</Form.Label>
                                <Form.Check
                                    type={'radio'}
                                    checked={isSingleEdition}
                                    onChange={() => setIsSingleEdition(!isSingleEdition)}
                                    label={`Single edition`}
                                />
                                <Form.Check
                                    type={'radio'}
                                    checked={!isSingleEdition}
                                    onChange={() => setIsSingleEdition(!isSingleEdition)}
                                    label={`Multiple editions`}
                                />
                                <Form.Text className="text-muted">
                                    {
                                        isSingleEdition ?
                                            "Each NFT will have only one copy" :
                                            "Each NFT can have multiple copies."
                                    }
                                </Form.Text>
                            </Form.Group>
                        </Stack>
                    </Form>
                </Col>
                <Col>
                    <p className={"form-label"}>Collection image</p>
                    {
                        imageUrl ?
                            <div>
                                <Image className={'d-flex'} src={imageUrl} rounded />
                                <p
                                    className={'mt-2'}
                                    onClick={() => setImage(undefined)}
                                >
                                    <u><small className={'cursor-pointer'}>Remove image</small></u>
                                </p>
                            </div>
                            :
                            <Dropzone setFile={setImage} />
                    }
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
            </Button>
            <Button variant="primary" onClick={async () => {
                if (storage) {
                    const imageURI = await storage.upload(image, { uploadWithoutDirectory: true });
                    const contractURI = await storage.upload(
                        JSON.stringify({
                            "name": title || "",
                            "description": description || "",
                            "image": imageURI || "",
                            "external_link": url || "",
                            "collaborators": [address]
                        }),
                        { uploadWithoutDirectory: true }
                    );
                    let tx;
                    try {
                        if (isSingleEdition) {
                            tx = await createCollection({
                                args: [title, symbol, contractURI]
                            });
                        } else {
                            tx = await createEdition({
                                args: [title, contractURI]
                            });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    console.log(tx);
                    // handleCloseModal();
                } else {

                }
            }}>
                Create
            </Button>
        </Modal.Footer>
    </Modal>
};

export default CollectionModal;
