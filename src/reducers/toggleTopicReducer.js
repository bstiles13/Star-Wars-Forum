import axios from 'axios';

export default function (state = null, action) {
    switch (action.type) {
        case "TOGGLE_TOPIC":
            return action.payload
            break;
    }
    return state;
}