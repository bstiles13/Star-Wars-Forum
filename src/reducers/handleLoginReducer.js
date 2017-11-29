export default function (state = {
    existingUsername: '',
    existingPassword: '',
    newUsername: '',
    newPassword1: '',
    newPassword2: ''
}, action) {
    switch (action.type) {
        case "HANDLE_LOGIN":
            state = { ...state, ...action.payload }
            break;
        case "CLEAR_NEW_USER":
            return action.payload
            break;
    }
    return state;
}