import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.png';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser, resetUser } from '../actions/getUserAction.js';

class Navbar extends React.Component {

    componentDidMount() {
        this.props.getUser();
    }

    logout() {
        axios.get('/logout').then(data => {
            this.props.resetUser();
            window.location.href = this.props.pathTrace;
        })
    }

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
                        {
                            this.props.user == null
                                ? <Link to={'/login'} className="nav-item nav-link">Sign In</Link>
                                : this.props.user != 'Anonymous'
                                    ? <Link to={'/'} className="nav-item nav-link" onClick={this.logout.bind(this)}>{'Sign Out (' + this.props.user + ')'}</Link>
                                    : <Link to={'/'} className="nav-item nav-link" onClick={this.logout.bind(this)}>{'Sign Out (Guest)'}</Link>
                        }
                    </div>
                </div>
                <img id="logo" src={logo} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        pathTrace: state.pathTrace
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser: getUser,
        resetUser: resetUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);