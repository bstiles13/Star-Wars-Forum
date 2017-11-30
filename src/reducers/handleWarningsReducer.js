export default function (state = {
    invalidUser: false,
    invalidName: false,
    invalidPassword: false,
    invalidText: false,
    text: {
        invalidUser: 'Invalid username and/or password.',
        invalidName: 'User already exists.',
        invalidPassword: "Passwords do not match.",
        invalidText: "Username and/or password is incomplete."
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