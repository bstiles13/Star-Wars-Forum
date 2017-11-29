export const stageThread = (id) => {
    return {
        type: 'STAGE_REPLY',
        payload: {stagedThread: id}
    }
}

export const stageReply = (id) => {
    return {
        type: 'STAGE_REPLY',
        payload: {stagedReply: id}
    }
}

export const stageEdit = (id) => {
    return {
        type: 'STAGE_EDIT',
        payload: {stagedEdit: id}
    }
}