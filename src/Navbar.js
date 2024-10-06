import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/rewards">Rewards</Link>
            <Link to="/profile">Profile</Link>
        </div>
    );
};

export default Navbar;
