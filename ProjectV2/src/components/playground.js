import React, { useState, useEffect } from 'react';
import './styles/playground.css';

const Playground = ({ logoSrc }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [vel, setVel] = useState({ x: 1, y: 1 });
    const spUp = 0.1;

    useEffect(() => {
        const updPosition = () => {
            setVel((pVel) => {
                const nX = pos.x + pVel.x + spUp;
                const nY = pos.y + pVel.y + spUp;

                const maxX = window.innerWidth - 50;
                const maxY = window.innerHeight - 50;

                let nVelx = pVel.x + spUp;
                let nVelY = pVel.y + spUp;

                if (nX <= 0 || nX >= maxX) {
                    nVelx = -pVel.x + spUp;
                }

                if (nY <= 0 || nY >= maxY) {
                    nVelY = -pVel.y + spUp;
                }

                return { x: nVelx, y: nVelY };
            });

            setPos((prPos) => ({
                x: prPos.x + vel.x,
                y: prPos.y + vel.y,
            }));
        };

        const an = setInterval(updPosition, 1000 / 60);

        return () => clearInterval(an);
    }, [vel]);

    return (
        <div
            className="bouncing-dvd"
            style={{ left: pos.x, top: pos.y, backgroundImage: `url(${logoSrc})` }}
        />
    );
};

export default Playground;
