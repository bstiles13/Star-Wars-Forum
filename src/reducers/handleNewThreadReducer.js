export default function (state = {
    poster: null,
    topic_id: null,
    title: null,
    message: null,
}, action) {
    switch (action.type) {
        case "HANDLE_NEW_THREAD":
            state = { ...state, ...action.payload }
            break;
        case "RESET_NEW_THREAD":
            return action.payload;
            break;
    }
    return state;
}