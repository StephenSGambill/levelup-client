import React, { useEffect, useState } from "react"
import { getGames, deleteGame, getGameTypes } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {
  const [games, setGames] = useState([])
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState("")
  const [gameTypes, setGameTypes] = useState([])

  useEffect(() => {
    getGames()
      .then(data => setGames(data))
  }, [])
  useEffect(() => {
    getGameTypes()
      .then(data => setGameTypes(data))
  }, [])


  const handleDelete = (id) => {
    deleteGame(id).then(() => {
      getGames().then((data) => setGames(data))
    })
  }

  const handleEdit = (id) => {
    navigate(`/games/edit/${id}`)
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  };

  const filteredGames = selectedType
    ? games.filter((game) => game.game_type === parseInt(selectedType))
    : games


  return (<>
    <article className="games">
      <button className="btn btn-2 btn-sep icon-create icon-send"
        onClick={() => {
          navigate({ pathname: "/games/new" })
        }}
      >Register New Game</button>
    </article>

    <article className="games pageBox">
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">All</option>
        {gameTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.label}
          </option>
        ))}
      </select>
    </article>

    <article className="games pageBox">

      {
        filteredGames.map(game => {
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