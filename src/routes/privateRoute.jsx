import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/sign-in', { state: { path: location.pathname } })
    }
  }, [token, navigate])

  return children
}

export default PrivateRoute
