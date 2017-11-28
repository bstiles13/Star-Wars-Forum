import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div id='login'>
                <h1>Welcome!</h1>
                <h5 className="custom-color">Sign In Options</h5>
                <br />
                <div id="user-container">
                    <div id="existing-user">
                        <h3>Existing User</h3>
                        <div class="form-group">
                            <label for="username" className="login-label">username address</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" />
                        </div>
                        <div class="form-group">
                            <label for="password" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                    <div id="new-user">
                        <h3>New User</h3>
                        <div class="form-group">
                            <label for="username" className="login-label">username address</label>
                            <input type="text" className="form-control login-input" id="username" placeholder="Enter username" />
                        </div>
                        <div class="form-group">
                            <label for="newPassword1" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="newPassword1" placeholder="Password" />
                        </div>
                        <div class="form-group">
                            <label for="newPassword2" className="login-label">Password</label>
                            <input type="password" className="form-control login-input" id="newPassword2" placeholder="Re-Enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                </div>
                <div id="guest-container">
                    <h3>Guest</h3>
                    <button type="submit" className="btn btn-primary">Sign in as "Anonymous" user</button>
                </div>
            </div>
        )
    }
}

export default Login;