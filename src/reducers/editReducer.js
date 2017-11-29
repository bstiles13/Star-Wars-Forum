export default function (state = {
    stagedThread: null,
    stagedReply: null,
    stagedEdit: null
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
    }
    return state;
}