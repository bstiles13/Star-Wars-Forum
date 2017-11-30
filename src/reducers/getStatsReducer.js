export default function (state = {
    userCount: null,
    threadCount: null,
    replyCount: null
}, action) {
    switch (action.type) {
        case 'GET_STATISTICS':
            state = { ...state, ...action.payload }
            break;
    }
    return state;
}