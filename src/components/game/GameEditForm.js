import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, updateGame, getGameById } from '../../managers/GameManager.js'


export const GameEditForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({
        title: '',
        game_type: 0,
        maker: 0,
        number_of_players: '',
        skill_level: '',
    });

    useEffect(() => {
        Promise.all([getGameById(id), getGameTypes()])
            .then(([gameData, gameTypesData]) => {
                setGame(gameData)
                console.log(gameTypesData)
                const alphaSortedGameTypes = gameTypesData.sort((a, b) => a.label < b.label ? -1 : 1)
                setGameTypes(alphaSortedGameTypes)
            })
    }, [id])


    const handleInputChange = evt => {
        const { name, value } = evt.target
        setGame(prevState => ({ ...prevState, [name]: value }))
    };



    return (
        <form className="gameForm pageBox">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-type">Game Type: </label>
                    <select name="game_type" value={game.game_type} onChange={handleInputChange}>
                        <option value="0" >Select type...</option>
                        {
                            gameTypes.map(gt =>
                                <option key={`gametype--${gt.id}`} value={gt.id}>{gt.label}</option>)
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={game.maker}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="text" name="number_of_players" required className="form-control"
                        value={game.number_of_players}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <input type="text" name="skill_level" required max="3" className="form-control"
                        value={game.skill_level}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            < button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: game.number_of_players,
                        skill_level: game.skill_level,
                        game_type: game.game_type
                    }
                    updateGame(updatedGame, id)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-2 btn-primary" > Update</button >
        </form >
    )
}