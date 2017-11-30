import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleLogin } from '../actions/handleLoginAction.js';
import { handleWarning, clearWarnings } from '../actions/handleWarningsAction.js';

class Login extends React.Component {

    renderWarning(type) {
        if (this.props.warnings[type]) {
            return (<div className='login-warning'>{this.props.warnings.text[type]}</div>)
        }
    }

    submitLogin(existingUser) {
        let userForm = this.props.userForm;
        this.props.clearWarnings();
        switch (existingUser) {
            case true:
                if (userForm.existingUsername == '' || userForm.existingPassword == '') return this.props.handleWarning('invalidText');
                axios.post('/login', userForm).then(data => {
                    console.log(data);
                    if (data.data == false) return this.props.handleWarning('invalidUser');                    
                    window.location.href = '/';
                })
                break;
            case false:
                if (userForm.newUsername == '' || userForm.newPassword1 == '' || userForm.newPassword2 == '') return this.props.handleWarning('invalidText');
                if (userForm.newPassword1 !== userForm.newPassword2) return this.props.handleWarning('invalidPassword');                
                axios.post('/register', userForm).then(data => {
                    console.log('new user', data);
                    if (data.data == false) return this.props.handleWarning('invalidName');                                        
                    window.location.href = '/';
                })
                break;
            case null:
                axios.get('/guest').then(data => {
                    console.log(data);
                    window.location.href = '/';
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
                        <button type="submit" className="btn btn-primary" onClick={() => this.submitLogin(true)}>Sign In</button>
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
                        <button type="submit" className="btn btn-primary" onClick={() => this.submitLogin(false)}>Create Account</button>
                    </div>
                </div>
                <div id="guest-container">
                    <h3>Guest</h3>
                    <button type="submit" className="btn btn-primary" onClick={() => this.submitLogin(null)}>Sign in as "Anonymous" user</button>
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
        handleLogin: handleLogin,
        handleWarning: handleWarning,
        clearWarnings: clearWarnings
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);