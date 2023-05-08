import { getToken } from "../utils/getToken"


export const getGames = () => {
  return fetch("http://localhost:8000/games", {
    headers: {
      "Authorization": `Token ${getToken()}`
    }
  })
    .then(response => response.json())
}

export const getGameById = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
      "Authorization": `Token ${getToken()}`
    }
  })
    .then(response => response.json())
}

export const createGame = (game) => {
  return fetch("http://localhost:8000/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(game)
  })
    .then(response => response.json())
}


export const updateGame = (game, id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(game)
  })
    .then(response => response.json())
}

export const getGameTypes = () => {
  return fetch(`http://localhost:8000/gametypes`, {
    headers: {
      "Authorization": `Token ${getToken()}`
    }
  })
    .then(response => response.json())

}
export const deleteGame = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`,
    }
  })
}

