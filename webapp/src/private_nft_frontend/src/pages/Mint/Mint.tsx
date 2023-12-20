import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MintModal from "./MintModal";

const Mint = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!location.state.name) {
            navigate('/');
        }
    }, [location]);


    return <div>
        <Button onClick={() => navigate('/mint')} className={'mb-3'} variant="light" size={'sm'}>Back</Button>
        <Row>
            <Col xs={{span: true}}>
                <h1>{location.state.name}</h1>
            </Col>
            <Col xs={'auto'}>
                <Button onClick={() => setShowModal(true)}>Mint new</Button>
            </Col>
        </Row>
        <MintModal showModal={showModal} handleCloseModal={() => setShowModal(false)} />
    </div>;
};

export default Mint;
