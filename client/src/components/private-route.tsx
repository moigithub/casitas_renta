import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'

export default function PrivateRoute() {
  const { currentUser } = useAppSelector(state => state.user)
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
}
