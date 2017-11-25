export default (state=null, action) => {
    switch (action.type) {
        case 'GET_TOPICS':
            return action.payload
            break;
    }
    return state;
}