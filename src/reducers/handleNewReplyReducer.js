export default function (state = {
    poster: null,
    topic_id: null,
    thread_id: null,
    message: null,
}, action) {
    switch (action.type) {
        case "HANDLE_NEW_REPLY":
            state = { ...state, ...action.payload }
            break;
    }
    return state;
}