export default function (state = null, action) {
    switch (action.type) {
        case 'HANDLE_EDIT':
            state = { ...state, ...action.payload }
            break;
        case 'RESET_EDIT':
            return action.payload;
            break;
    }
    return state;
}