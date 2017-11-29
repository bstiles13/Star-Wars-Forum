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

export const handleNewQuote = (poster, message) => {
    let test = message.split("<br/>");
    if (test.length > 1) {
      message = test[1];
    } else {
      message = test[0];
    }
    return {
        type: "HANDLE_NEW_REPLY",
        payload: {
            quotedPoster: poster,
            quotedMessage: message
        }
    }
}