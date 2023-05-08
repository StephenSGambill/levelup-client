import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => {
  if (localStorage.getItem("lu_token")) {
    // goes to Routes
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}
