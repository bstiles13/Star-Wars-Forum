export default function (state=null, action) {
    switch (action.type) {
        case "GET_REPLIES":
            return action.payload
            break;
    }
    return state;
}