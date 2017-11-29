export default function (state = null, action) {
    switch (action.type) {
        case 'GET_USER':
            return action.payload
            break;
    }
    return state;
}