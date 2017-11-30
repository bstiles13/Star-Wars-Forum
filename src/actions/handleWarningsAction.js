export const handleWarning = (type) => {
    return {
        type: 'HANDLE_WARNING',
        payload: {
            [type]: true
        }
    }
}

export const clearWarnings = () => {
    return {
        type: 'CLEAR_WARNINGS',
        payload: {
            invalidUser: false,
            invalidName: false,
            invalidPassword: false,
            invalidText: false,
            invalidTitle: false,
            invalidMessage: false
        }
    }
}