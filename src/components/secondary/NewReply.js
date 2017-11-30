import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleWarning, clearWarnings } from '../../actions/handleWarningsAction.js';
import { resetNewReply } from '../../actions/handleNewReplyAction.js';

class NewReply extends React.Component {

    submitReply() {
        this.props.clearWarnings();
        if (this.props.newReply.message == '' || this.props.newReply.message == null) return this.props.handleWarning('invalidMessage');
        axios.post('/newreply', this.props.newReply).then(data => {
            this.props.resetNewReply();
            document.getElementById('quick-message').value = '';
            this.props.getReplies(this.props.threadId);
        })
    }

    renderWarning(type) {
        if (this.props.warnings[type]) {
            return (<div className='warning'>{this.props.warnings.text[type]}</div>)
        }
    }

    render() {
        return (
            <div id='new-reply'>
                {
                    this.props.user
                        ? (
                            <div>
                                {this.renderWarning('invalidMessage')}
                                <div className="form-group">
                                    <label className="label" htmlFor="quick-message">Quick Reply:</label>
                                    <textarea type="text" className="form-control" id="quick-message"
                                        placeholder="Share what's on your mind" name="message" onChange={this.props.handleNewReply}></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-danger" onClick={this.submitReply.bind(this)}>Reply</button>
                            </div>
                        )
                        : <h5 className="warning"><Link to={'/login'} className="warning-color">Sign in to leave a reply</Link></h5>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        newReply: state.newReply,
        warnings: state.warnings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleWarning: handleWarning,
        clearWarnings: clearWarnings,
        resetNewReply: resetNewReply
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(NewReply);