import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogin } from '../actions/handleLoginAction.js';

class Login extends React.Component {

    renderWarning(type) {
        if (this.props.warnings[type].toggle) {
            return (<div className='login-warning'>{this.props.warnings[type].warning}</div>)
        }
    }

    submitLogin(userStatus) {
        switch (userStatus) {
            case false:
                axios.post('/login', this.props.userForm).then(data => {
                    console.log(data);
                })
                break;
            case true:
                axios.post('/register', this.props.userForm).then(data => {
                    console.log(data);

                })
                break;
            case null:
                axios.get('/guest').then(data => {
                    console.log(data);
                })
                break;
        }
    }

    render() {
        return (
            <div id='login'>
                <h1>Welcome!</h1>
                <h5 className="custom-color">Sign In Options</h5>
                <br />
                {this.renderWarning('invalidUser')}
                {this.renderWarning('invalidName')}
                {this.renderWarning('invalidPassword')}
                {this.renderWarning('invalidText')}
                <div id="user-container">
                    <div id="existing-user">
                        <h3>Existing User</h3>
                        <div className="form-group">
                            <label htmlFor="username" className="login-label">username address</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" name="existingUsername" onChange={this.props.handleLogin} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="password" placeholder="Password" name="existingPassword" onChange={this.props.handleLogin} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => this.submitLogin(false)}>Sign In</button>
                    </div>
                    <div id="new-user">
                        <h3>New User</h3>
                        <div className="form-group">
                            <label htmlFor="username" className="login-label">username address</label>
                            <input type="text" className="form-control login-input" id="username" placeholder="Enter username" name="newUsername" onChange={this.props.handleLogin} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword1" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="newPassword1" placeholder="Password" name="newPassword1" onChange={this.props.handleLogin} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword2" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="newPassword2" placeholder="Re-Enter Password" name="newPassword2" onChange={this.props.handleLogin} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => this.submitLogin(true)}>Create Account</button>
                    </div>
                </div>
                <div id="guest-container">
                    <h3>Guest</h3>
                    <button type="submit" className="btn btn-primary" onClick={this.submitLogin}>Sign in as "Anonymous" user</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userForm: state.userForm,
        warnings: state.warnings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleLogin: handleLogin
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);