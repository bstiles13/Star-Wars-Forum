export const handleLogin = (event) => {
    return {
        type: "HANDLE_LOGIN",
        payload: {
            [event.target.name]: event.target.value
        }
    }
}