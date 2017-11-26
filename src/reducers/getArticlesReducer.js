export default (state = null, action) => {
    switch (action.type) {
        case 'GET_ARTICLES':
            return action.payload
            break;
    }
    return state;
}