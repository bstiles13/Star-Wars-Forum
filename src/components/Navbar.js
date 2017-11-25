import React from 'react';
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
                        <a className="nav-item nav-link">Home</a>
                        <a className="nav-item nav-link">New Thread</a>
                        <a className="nav-item nav-link">Sign In</a>
                    </div>
                </div>
                <img id="logo" src={logo} />
            </div>
        )
    }
}

export default Navbar;