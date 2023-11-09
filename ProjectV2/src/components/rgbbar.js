import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';

const DynamicRainbowBar = () => {
    const [prog, setProg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProg((pProg) => (pProg >= 100 ? 0 : pProg + 1));
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const cRnbwColor = (perc) => {
        const cpick = (perc / 100) * 360;
        return `hsl(${cpick}, 100%, 50%)`;
    };

    return (
        <div className="rainbow-bar">
            <LinearProgress variant="query" value={prog} style={{ backgroundColor: cRnbwColor(prog) }} />
        </div>
    );
};

export default DynamicRainbowBar;