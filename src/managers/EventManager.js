import { getToken } from "../utils/getToken"

export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${getToken()}`,
        }

    })
}

export const updateEvent = (event, id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const leaveEvent = eventId => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${getToken()}`,
        }
    })
}

export const joinEvent = eventId => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: {
            Authorization: `Token ${getToken()}`,
        }
    })
}
