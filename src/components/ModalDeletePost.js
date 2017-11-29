import React from 'react';

class ModalDeletePost extends React.Component {
    render() {
        return (
            <div>
                <i class="fa fa-trash option-icon" aria-hidden="true" data-toggle="modal" data-target="#modal-delete-post"></i>
                <div class="modal fade" id="modal-delete-post" tabindex="-1" role="dialog" aria-labelledby="modal-delete" aria-hidden="true">
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
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDeletePost;