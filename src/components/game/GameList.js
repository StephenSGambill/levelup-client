import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {
  const [games, setGames] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getGames().then(data => setGames(data))
  }, [])


  const handleDelete = (id) => {
    deleteGame(id).then(() => {
      // Refresh game list after deletion
      getGames().then((data) => setGames(data))
    })
  }

  const handleEdit = (id) => {
    navigate(`/games/edit/${id}`)
  }

  return (<>
    <article className="games">
      <button className="btn btn-2 btn-sep icon-create icon-send"
        onClick={() => {
          navigate({ pathname: "/games/new" })
        }}
      >Register New Game</button>
    </article>
    <article className="games pageBox">
      {
        games.map(game => {
          return <section key={`game--${game.id}`} className="game itemBox">
            <h2><div className="game__title">{game.title} by {game.maker}</div></h2>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
            <button
              className="btn btn-3 btn-delete"
              onClick={() => handleDelete(game.id)}
            >Delete</button>
            <button
              className="btn btn-1 btn-edit"
              onClick={() => handleEdit(game.id)}
            >Edit</button>
          </section>
        })
      }
    </article></>
  )
}