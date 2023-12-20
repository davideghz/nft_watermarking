import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CollectionModal from "./CollectionModal";
import { ContractEvent, useAddress, useContract, useStorage } from "@thirdweb-dev/react";
import { ABI as CollectionFactoryABI } from "../../constants/collectionFactory";
import { ABI as EditionFactoryABI } from "../../constants/editionFactory";
import { useContractEvents } from "@thirdweb-dev/react";
import { HttpProvider, Web3 } from "web3";
import { ABI as CollectionABI } from "../../constants/collection";
import { ABI as EditionABI } from "../../constants/edition";
import './Collections.css';
import { useNavigate } from "react-router-dom";

type CollectionItem = {
    name: string,
    img: string|undefined,
    hash: string,
    address: string,
    isSingle: boolean
};

const Collections = () => {
    const [showModal, setShowModal] = useState(false);
    const address = useAddress();
    const web3 = new Web3(new HttpProvider(process.env.REACT_APP_PROVIDER!));
    const storage = useStorage();
    const navigate = useNavigate();

    const {contract: collection} = useContract(
        process.env.REACT_APP_COLLECTION,
        CollectionFactoryABI
    );
    const {contract: edition} = useContract(
        process.env.REACT_APP_EDITION,
        EditionFactoryABI
    );

    const [
        items,
        setItems
    ] = useState([] as CollectionItem[]);

    const transform = async (isSingleEdition: boolean, events: ContractEvent[]) => {
        for (const t of events) {
            try {
                const contract = new web3.eth.Contract(
                    isSingleEdition ? CollectionABI : EditionABI,
                    t.data.contractAddress
                );
                const result = await contract.methods['contractURI']().call() as string;
                const res = await storage?.download(result);
                if (res) {
                    const json = await res.json();
                    items.push({
                        name: json.name,
                        img: json.image,
                        address: t.data.contractAddress,
                        hash: t.transaction.transactionHash,
                        isSingle: isSingleEdition
                    });
                    setItems([...items]);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    }

    const { data: collectionEvents } = useContractEvents(
        collection,
        "Created",
        {
            queryFilter: {
                filters: {
                    creator: address,
                },
                fromBlock: 0,
                toBlock: 'latest',
                order: "asc",
            },
            subscribe: true,
        },
    );

    useEffect(() => {
        transform(true, collectionEvents || []).then();
    }, [collectionEvents]);

    return <div>
        <Row>
            <Col xs={{span: true}}>
                <h1>Your collections</h1>
            </Col>
            <Col xs={'auto'}>
                <Button onClick={() => setShowModal(true)}>Create new</Button>
            </Col>
        </Row>
        <Row>
            {
                items.map((el) => {
                    return <Col
                        className={'mt-4 d-flex justify-content-center'}
                        xs={3}
                        key={el.hash}
                    >
                        <Card
                            className={'card cursor-pointer'}
                            onClick={() => navigate(
                                `/mint/${el.address}`,
                                {
                                    state: {
                                        name: el.name
                                    }
                                }
                            )}
                        >
                            <Card.Img
                                variant="top"
                                src={el.img ? `https://ipfs.io/ipfs/${el.img.slice(7)}` : 'images/emptyCollection.png'}
                                className={'card-image'}
                            />
                            <Card.Body>
                                <Card.Title>{el.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                })
            }
        </Row>
        <CollectionModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            collection={collection}
            edition={edition}
            address={address}
        />
    </div>
};

export default Collections;
