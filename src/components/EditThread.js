import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset } from '../actions/editAction.js';
import { handleEdit } from '../actions/handleEditAction.js';
import { getReplies } from '../actions/getRepliesAction.js';

class EditThread extends React.Component {

    saveEdit() {
        axios.post('/editthread', { id: this.props.pendingEdits.threadToEdit, title: this.props.edit.title, message: this.props.edit.message }).then(data => {
            console.log('edit thread', data);
            this.props.getOneThread();
            this.props.reset();
        })
    }

    render() {
        return (
            <div>
                <div>Title</div>
                <input type="text" className="form-control" id="edit-title-label" defaultValue={this.props.originalTitle} name="title" onChange={this.props.handleEdit} />
                <div>Message</div>
                <textarea type="text" className="form-control" id="edit-message-label" defaultValue={this.props.originalMessage} name="message" onChange={this.props.handleEdit}></textarea>
                <button className="btn btn-default btn-sm">Cancel</button>
                <button className="btn btn-info btn-sm" onClick={this.saveEdit.bind(this)}>Save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        edit: state.edit,
        pendingEdits: state.pendingEdits
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleEdit: handleEdit,
        reset: reset,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditThread);