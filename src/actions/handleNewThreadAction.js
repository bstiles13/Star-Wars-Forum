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

export const setThreadUser = (user) => {
    return {
        type: "HANDLE_NEW_THREAD",
        payload: {
            poster: user
        }
    }
}

export const resetNewThread = () => {
    return {
        type: "RESET_NEW_THREAD",
        payload: {
            poster: null,
            topic_id: null,
            title: null,
            message: null,
        }
    }
}