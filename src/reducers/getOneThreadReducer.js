export default function (state=null, action) {
    switch (action.type) {
        case 'GET_ONE_THREAD':
            return action.payload
            break;
    }
    return state;
}