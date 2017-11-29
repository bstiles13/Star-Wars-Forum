import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ModalDeleteReply extends React.Component {

    deleteReply() {
        axios.get('/deletereply/' + this.props.stagedEdits.stagedReply).then(data => {
            this.props.getReplies();
        })
    }

    render() {
        return (
            <div>
                <div class="modal fade" id="modal-delete-reply" tabindex="-1" role="dialog" aria-labelledby="modal-delete" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal-delete">Delete</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete your post?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.deleteReply.bind(this)}>Confirm</button>
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
        stagedEdits: state.stagedEdits
    }
}

export default connect(mapStateToProps)(ModalDeleteReply);