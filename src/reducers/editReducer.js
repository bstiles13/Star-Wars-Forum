export default function (state = {
    threadToDelete: null,
    threadToEdit: null,
    replyToDelete: null,
    replyToEdit: null
}, action) {
    switch (action.type) {
        case 'STAGE_REPLY':
            state = { ...state, ...action.payload }
            break;
        case 'STAGE_THREAD':
            state = { ...state, ...action.payload }
            break;
        case 'STAGE_EDIT':
            state = { ...state, ...action.payload }
            break;
        case 'RESET':
            return action.payload
            break;
    }
    return state;
}