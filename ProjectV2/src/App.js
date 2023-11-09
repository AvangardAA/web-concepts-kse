import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/mainpage';
import Navbar from './components/navbar';
import DynamicRainbowBar from './components/rgbbar';
import Cabinet from "./components/cabinet";
import Playground from "./components/playground";
import logo from './logo.svg'

function App() {
    return (
        <Router>
            <Navbar />
            <DynamicRainbowBar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/cabinet" element={<Cabinet/>}/>
                    <Route path="/playground" element={<Playground logoSrc={logo}/>}/>
                </Routes>
            </div>
            <DynamicRainbowBar />
        </Router>
    );
}

export default App;
