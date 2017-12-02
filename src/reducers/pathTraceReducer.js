export default function(state='/', action) {
    if (action.type === "SET_PATH") {
        return action.payload;
    } else {
        return state;
    }
}