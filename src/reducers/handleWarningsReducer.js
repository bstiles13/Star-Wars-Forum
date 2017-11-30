export default function (state = {
    invalidUser: false,
    invalidName: false,
    invalidPassword: false,
    invalidText: false,
    invalidTitle: false,
    invalidMessage: false,
    text: {
        invalidUser: 'Invalid username and/or password.',
        invalidName: 'User already exists.',
        invalidPassword: "Passwords do not match.",
        invalidText: "Username and/or password is incomplete.",
        invalidTitle: "Invalid title. Please try again.",
        invalidMessage: "Invalid message. Please try again.",
    }
}, action) {
    switch (action.type) {
        case 'HANDLE_WARNING':
            state = { ...state, ...action.payload }
            break;
        case 'CLEAR_WARNINGS':
            state = { ...state, ...action.payload }
            break;
    }
    return state;
}