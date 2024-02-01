import { useState, createContext } from "react"

export const AuthContext = createContext(null)

export default function AuthProvider({
    children
}) {
    const [user, setUser] = useState(localStorage.getItem('secret_token') || null)
    // need variable like isLoggedIn ?
    return (
        <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
    )
}
