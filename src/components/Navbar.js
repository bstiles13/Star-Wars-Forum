import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <div id="navbar-primary">
                    <div id="navbar-left" className="navbar-section"></div>
                    <div id="navbar-right" className="navbar-section"></div>
                </div>
                <div id="navbar-secondary">
                    <div id="nav-links">
                        <Link to={'/'} className="nav-item nav-link">Home</Link>
                        <Link to={'/forum'} className="nav-item nav-link">Forums</Link>
                        <Link to={'/login'} className="nav-item nav-link">Sign In</Link>
                    </div>
                </div>
                <img id="logo" src={logo} />
            </div>
        )
    }
}

export default Navbar;