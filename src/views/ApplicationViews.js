import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { GameEditForm } from "../components/game/GameEditForm"
import { EventEditForm } from "../components/event/EventEditForm"



export const ApplicationViews = () => {
    return <>
        <h1>Level Up Game Space</h1>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games/edit/:id" element={<GameEditForm />} />
                <Route path="/events/edit/:id" element={<EventEditForm />} />
            </Route>
        </Routes>
    </>
}
