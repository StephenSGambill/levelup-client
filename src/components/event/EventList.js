import React, { useEffect, useState } from "react"
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../utils/formattedDate.js"
import { formattedTime } from "../../utils/formattedTime.js"


export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()



  useEffect(() => {
    getEvents().then(data => setEvents(data))
  }, [])


  const handleDelete = (eventId) => {
    deleteEvent(eventId)
      .then(() => {
        // Remove the deleted event from the events state
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
      })
  }

  const handleEdit = (id) => {
    navigate(`/events/edit/${id}`)
  }

  const handleRefresh = () => {
    getEvents().then(data => setEvents(data))
  }


  return (<>
    <article className="events ">
      <button className="btn btn-2 btn-sep icon-create icon-send"
        onClick={() => {
          navigate({ pathname: "/events/new" })
        }}>Register New Event</button>
    </article>
    <article className="events pageBox">
      {
        events.map(event => {
          return <section key={`event--${event.id}`} className="event itemBox">
            <h2><div className="event">{event.description} </div></h2>
            <div className="event">Date: {
              formattedDate(event.date)
            } </div>
            <div className="time">Time: {
              formattedTime(event.time)}</div>
            <button className="btn btn-3 btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
            <button
              className="btn btn-1 btn-edit"
              onClick={() => handleEdit(event.id)}
            >Edit</button>
            {event.joined ? <button
              className="btn btn-4"
              onClick={() => {
                leaveEvent(event.id)
                  .then(handleRefresh)
              }}
            >Leave</button> : <button
              className="btn btn-4"
              onClick={() => {
                joinEvent(event.id)
                  .then(handleRefresh)
              }}
            >Join</button>}

          </section>
        })
      }
    </article></>
  )
}