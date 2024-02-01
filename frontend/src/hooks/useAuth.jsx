import { useContext } from "react";

import { AuthContext } from "../Auth/AuthProvider";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext)

    if (user === undefined) {
        throw new Error('useAuth must be used within Auth Provider')
    }

    return { user, setUser }
}
