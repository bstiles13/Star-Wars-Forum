export default function (state = {
    user: null,
    topic_id: null,
    title: null,
    message: null,
}, action) {
    switch (action.type) {
        case "HANDLE_NEW_THREAD":
            state = { ...state, [Object.keys(action.payload)[0]]: action.payload[Object.keys(action.payload)[0]] }
            break;
    }
    return state;
}