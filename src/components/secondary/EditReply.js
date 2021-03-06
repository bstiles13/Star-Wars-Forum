import React from 'react';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetEditFlags } from '../../actions/editAction.js';
import { handleEdit } from '../../actions/handleEditAction.js';
import { getReplies } from '../../actions/getRepliesAction.js';

class EditReply extends React.Component {

    saveEdit() {
        axios.post('/editreply', {id: this.props.pendingEdits.replyToEdit, message: this.props.edit.message}).then(data => {
            this.props.getReplies();
            this.props.resetEditFlags();
        })
    }

    resetEdit() {
        this.props.getReplies();
        this.props.resetEditFlags();        
    }

    render() {
        return (
            <div>
                <textarea type="text" className="form-control" id="form-post" defaultValue={this.props.original} name="message" onChange={this.props.handleEdit}></textarea>
                <button className="btn btn-default btn-sm edit-button" onClick={this.resetEdit.bind(this)}>Cancel</button>
                <button className="btn btn-info btn-sm edit-button" onClick={this.saveEdit.bind(this)}>Save</button>
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
        resetEditFlags: resetEditFlags
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditReply);