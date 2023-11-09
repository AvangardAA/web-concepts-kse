import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import './styles/navbar.css'

const NVbutton = ({ to, lab }) => {
    return (
        <NavLink to={to} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" >{lab}</Button>
        </NavLink>
    );
};

function Navbar() {
    return (
        <div className="navbar-main">
            <ButtonGroup variant="outlined" aria-label="outgroup" >
                <NVbutton to="/" lab="Main page" />
                <NVbutton to="/cabinet" lab="Cabinet" />
                <NVbutton to="/playground" lab="Playground" />
            </ButtonGroup>
        </div>
    );
}

export default Navbar;
