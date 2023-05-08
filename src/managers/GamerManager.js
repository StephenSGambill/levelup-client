import { getToken } from "../utils/getToken"

export const getGamers = () => {
    return fetch("http://localhost:8000/gamers", {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}
