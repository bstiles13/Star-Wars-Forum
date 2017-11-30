import React from 'react';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleNewReply } from '../../actions/handleNewReplyAction.js';
import { setReplyUser } from '../../actions/handleNewReplyAction.js';

class ModalQuote extends React.Component {

    componentDidMount() {
        this.props.setReplyUser(this.props.user);
    }

    submitReply() {
        axios.post('/newreply', this.props.newReply).then(data => {
            this.props.getReplies(this.props.threadId);            
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modal-quote" tabIndex="-1" role="dialog" aria-labelledby="modal-quote" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modal-quote">New Reply</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>Quote</h6>
                                <div className="quote">
                                    <div className="quote-poster">Posted by {this.props.newReply.quotedPoster}</div>
                                    <div className="quote-body">{this.props.newReply.quotedMessage}</div>
                                </div>
                                <textarea type="text" className="form-control" placeholder="Reply..." name="message" onChange={(event) => this.props.handleNewReply(event, this.props.toggledTopic._id, this.props.threadId )}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.submitReply.bind(this)}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newReply: state.newReply,
        user: state.user
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleNewReply: handleNewReply,
        setReplyUser: setReplyUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ModalQuote);