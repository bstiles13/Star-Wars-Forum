export default function (state = {
    invalidUser: {
        toggle: false,
        warning: 'Username and/or password is incorrect.'
    },
    invalidName: {
        toggle: false,
        warning: 'Username already exists.'      
    },
    invalidPassword: {
        toggle: false,
        warning: "Passwords do not match."   
    },
    invalidText: {
        toggle: false,
        warning: "Username and/or password is incomplete."
    }
}, action) {
    switch (action.type) {
        case "HANDLE_WARNING":
            state = { ...state, ...action.payload }
            break;
        case "CLEAR_WARNINGS":
            return action.payload;
        break;
    }
    return state;
}