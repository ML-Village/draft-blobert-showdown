import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Home, BattleRoom} from "./pages";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/battle/:id" element={<BattleRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
