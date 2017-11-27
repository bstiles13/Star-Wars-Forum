import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NewThread extends React.Component {

    renderOptions() {
        let topics = this.props.topics;
        return topics.map((topic, index) => {
            return <option key={index} selected={this.props.match.params.id == topic.order ? true : false}>{topic.topic}</option>
        })
    }

    render() {
        return (
            <div id="new-thread">
                <form>
                    <div class="form-group">
                        <label for="form-topic">Topic</label>
                        <select class="form-control" id="form-topic">
                            {this.renderOptions()}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="form-title">Title</label>
                        <input type="text" class="form-control" id="form-title" placeholder="Title" />
                    </div>
                    <div class="form-group">
                        <label for="form-post">Message</label>
                        <textarea type="text" class="form-control" id="form-post" placeholder="Share what's on your mind"></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline-primary">Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        topics: state.topics
    }
}

export default connect(mapStateToProps)(NewThread);