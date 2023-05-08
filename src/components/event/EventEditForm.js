import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGamers } from "../../managers/GamerManager.js"
import { getGames } from "../../managers/GameManager.js"
import { getEventById, updateEvent } from "../../managers/EventManager.js"


export const EventEditForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [gamers, setGamers] = useState([])
    const [games, setGames] = useState([])

    const [event, setEvent] = useState({
        description: "",
        date: "",
        time: "",
        organizer: "",
        attendees: [],
        game: ""
    })

    useEffect(() => {
        Promise.all([getEventById(id), getGamers(), getGames()])
            .then(([eventData, gamersData, gamesData]) => {
                setEvent(eventData);
                setGamers(gamersData);
                gamesData.sort((a, b) => a.title.localeCompare(b.title));
                setGames(gamesData);
            });
    }, [id]);


    const changeEventState = evt => {
        const { name, value } = evt.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
    };

    const toggleAttendee = (gamerId) => {
        setEvent(prevState => {
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
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="event-date">Date: </label>
                    <input type="date" name="date" id="event-date" value={event.date} onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event-time">Time: </label>
                    <input type="time" name="time" id="event-time" value={event.time} onChange={changeEventState} />
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
                                    <input type="checkbox" name="attendees" value={gamer.id} checked={event.attendees.includes(gamer.id)} onChange={() => toggleAttendee(gamer.id)} />
                                    {`${gamer.user.last_name}, ${gamer.user.first_name}`}
                                </label>
                            </div>
                        ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game:</label>
                    <select name="game" id="game" value={event.game} onChange={changeEventState}>
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

                    const updatedEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        organizer: parseInt(event.organizer),
                        attendees: event.attendees,
                        game: parseInt(event.game)
                    }

                    // Send POST request to your API
                    updateEvent(updatedEvent, id)
                        .then(updatedEventData => {
                            setEvent(updatedEventData)
                            navigate("/events")
                        })

                }}
                className="btn btn-2 btn-primary" > Update</button >
        </form >
    )
}