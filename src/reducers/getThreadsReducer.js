export default function (state=null, action) {
    switch (action.type) {
        case "GET_THREADS":
            return action.payload
            break;
    }
    return state;
}