import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            {/* <h1>this is header</h1> */}
            <Link to="/"> Home </Link>
            <Link to="/Login">Login</Link>
        </div>
    );
};

export default Header;