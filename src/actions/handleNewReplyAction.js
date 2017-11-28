import axios from 'axios';

export const handleNewReply = (event, topicId, threadId) => {
    return {
        type: "HANDLE_NEW_REPLY",
        payload: {
            [event.target.name]: event.target.value,
            topic_id: topicId,
            thread_id: threadId
        }
    }
}