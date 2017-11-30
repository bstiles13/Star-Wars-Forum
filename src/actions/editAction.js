export const flagThreadRemoval = (id) => {
    return {
        type: 'STAGE_REPLY',
        payload: {threadToDelete: id}
    }
}

export const flagReplyRemoval = (id) => {
    return {
        type: 'STAGE_REPLY',
        payload: {replyToDelete: id}
    }
}

export const flagThreadEdit = (id) => {
    return {
        type: 'STAGE_EDIT',
        payload: {threadToEdit: id}
    }
}

export const flagReplyEdit = (id) => {
    return {
        type: 'STAGE_EDIT',
        payload: {replyToEdit: id}
    }
}

export const resetEditFlags = () => {
    return {
        type: 'RESET',
        payload: {
            threadToDelete: null,
            threadToEdit: null,
            replyToDelete: null,
            replyToEdit: null
        }
    }
}