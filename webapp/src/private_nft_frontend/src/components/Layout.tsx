import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return <div>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className={'cursor-default'}>Private NFTs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            active={location.pathname === '/unlock'}
                            onClick={() => navigate("unlock")}
                        >
                            Unlock
                        </Nav.Link>
                        <Nav.Link
                            active={location.pathname === '/mint'}
                            onClick={() => navigate("mint")}
                        >
                            Mint
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <ConnectWallet theme={"light"} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container className={'py-4'}>
            <Outlet />
        </Container>
    </div>;
};

export default Layout;
