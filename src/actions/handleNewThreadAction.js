import axios from 'axios';

export const handleNewThread = (event, topicId) => {
    return {
        type: "HANDLE_NEW_THREAD",
        payload: {
            [event.target.name]: event.target.value,
            topic_id: topicId         
        }
    }
}