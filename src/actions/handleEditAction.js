export const handleEdit = (event, originalMessage, originalTitle) => {
    if (originalMessage && originalTitle) {
        return {
            type: 'HANDLE_EDIT',
            payload: {
                message: originalMessage,
                title: originalTitle
            }
        }
    } else if (originalMessage) {
        return {
            type: 'HANDLE_EDIT',
            payload: {
                message: originalMessage
            }
        }
    } else {
        return {
            type: 'HANDLE_EDIT',
            payload: {
                [event.target.name]: event.target.value
            }
        }
    }
}

export const resetEdit = () => {
    return {
        type: 'RESET_EDIT',
        payload: null
    }
}