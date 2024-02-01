import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const navigate = useNavigate()

    console.log(user)
    useEffect(() => {
        if (user === null) {
            navigate('/signin', { replace: true })
        }
    }, [user, navigate])

    return children
}
