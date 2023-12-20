import ReactDOM from 'react-dom/client';
import React from "react";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter} from "react-router-dom";
import {ThirdwebProvider} from "@thirdweb-dev/react";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<React.StrictMode>
    <BrowserRouter>
        <ThirdwebProvider
            activeChain={"goerli"}
            clientId="a3ef87e2f66ab637808e738bfe1c381f"
        >
            <App />
        </ThirdwebProvider>
    </BrowserRouter>
</React.StrictMode>);
