import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: "",
        numberOfPlayers: "",
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
            .then((res) => {
                setGameTypes(res)
                console.log(res)
            })
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const { name, value } = domEvent.target
        // const parsedValue = ["skillLevel", "gameTypeId"].includes(name)
        //     ? parseInt(value, 10)
        //     : value;
        setCurrentGame(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <form className="gameForm pageBox">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-type">Game Type: </label>
                    <select name="gameTypeId" onChange={changeGameState}>
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
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input type="text" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill level: </label>
                    <input type="text" name="skillLevel" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            < button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: currentGame.numberOfPlayers,
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-2  btn-primary" > Create</button >
        </form >
    )
}