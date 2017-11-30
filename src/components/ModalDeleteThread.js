import React from 'react';
import axios from 'axios';

class ModalDeleteThread extends React.Component {

    deleteThread(id) {
        axios.get('/deletethread/' + this.props.threadToDelete).then(data => {
            this.props.getThreads();
            this.props.reset();
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="modal-delete-thread" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete your thread?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.deleteThread(this.props.threadId)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDeleteThread;