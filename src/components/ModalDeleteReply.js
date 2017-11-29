import React from 'react';
import axios from 'axios';

class ModalDeleteReply extends React.Component {

    deleteReply() {
        axios.get('/deletereply/' + this.props.stagedReply).then(data => {
            this.props.getReplies();
            this.props.reset();
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modal-delete-reply" tabIndex="-1" role="dialog" aria-labelledby="modal-delete" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modal-delete">Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete your post?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteReply.bind(this)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDeleteReply;