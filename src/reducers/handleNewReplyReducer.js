export default function (state = {
    poster: null,
    topic_id: null,
    thread_id: null,
    message: null,
    quotedPoster: null,
    quotedMessage: null
}, action) {
    switch (action.type) {
        case "HANDLE_NEW_REPLY":
            state = { ...state, ...action.payload }
            break;
        case "RESET_NEW_REPLY":
            return action.payload
            break;
    }
    return state;
}