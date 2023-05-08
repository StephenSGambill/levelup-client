import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from '../../managers/EventManager.js'
import { getGamers } from '../../managers/GamerManager.js'



export const EventForm = () => {
    const navigate = useNavigate()
    const [gamers, setGamers] = useState([])
    const [games, setGames] = useState([])

    const [newEvent, setNewEvent] = useState({
        description: "",
        date: "",
        time: "",
        organizer: 1,
        attendees: [],
        game: 0
    })

    useEffect(() => {
        getGamers()
            .then((res) => {
                setGamers(res)
            })
    }, [])
    useEffect(() => {
        getGames()
            .then((res) => {
                res.sort((a, b) => a.title.localeCompare(b.title))
                setGames(res)
            })
    }, [])

    const changeEventState = (domEvent) => {
        const { name, value } = domEvent.target
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const toggleAttendee = (gamerId) => {
        setNewEvent(prevState => {
            const isSelected = prevState.attendees.includes(gamerId);
            if (isSelected) {
                return {
                    ...prevState,
                    attendees: prevState.attendees.filter(id => id !== gamerId)
                }
            } else {
                return {
                    ...prevState,
                    attendees: [...prevState.attendees, gamerId]
                }
            }
        })
    }

    return (
        <form className="eventForm pageBox">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="event-date">Date: </label>
                    <input type="date" name="date" id="event-date" value={newEvent.date} onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event-time">Time: </label>
                    <input type="time" name="time" id="event-time" value={newEvent.time} onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="attendees">Attendees:</label>
                    <br />
                    {gamers
                        .sort((a, b) => a.user.last_name < b.user.last_name ? -1 : 1)
                        .map(gamer => (
                            <div key={gamer.id}>
                                <label >
                                    <input type="checkbox" name="attendees" value={gamer.id} checked={newEvent.attendees.includes(gamer.id)} onChange={() => toggleAttendee(gamer.id)} />
                                    {`${gamer.user.last_name}, ${gamer.user.first_name}`}
                                </label>
                            </div>
                        ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game:</label>
                    <select name="game" id="game" value={newEvent.game} onChange={changeEventState}>
                        <option value="">Select a game</option>
                        {games.map(game => (
                            <option key={game.id} value={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            < button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        description: newEvent.description,
                        date: newEvent.date,
                        time: newEvent.time,
                        organizer: parseInt(newEvent.organizer),
                        attendees: newEvent.attendees,
                        game: parseInt(newEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-2 btn-primary" > Create</button >
        </form >
    )
}