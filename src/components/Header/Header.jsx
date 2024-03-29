import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div className='flex'>
            {/* <h1>this is header</h1> */}
            <Link to="/"> Home </Link>
            <h4>About </h4>
            <h4>Visit Us</h4>
            <Link className='back' to="/Login">Login</Link>
        </div>
    );
};

export default Header;