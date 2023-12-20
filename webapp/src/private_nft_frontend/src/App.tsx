import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Unlock from "./pages/Unlock";
import Collections from "./pages/Collections/Collections";
import Layout from "./components/Layout";
import Mint from "./pages/Mint/Mint";

const App = () => {

    return <div>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="unlock" element={<Unlock />} />
                <Route path="mint" element={<Collections />} />
                <Route path="mint/:address" element={<Mint />} />

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                {
                    /*
                    <Route path="*" element={<NoMatch />} />
                     */
                }
            </Route>
        </Routes>
    </div>;
};

export default App;
