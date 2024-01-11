import { useCallback, useEffect, useState } from "react"

export default function useAsync(callback) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [value, setValue] = useState()

    const callbackMemoized = useCallback((options = {}) => {
        setLoading(true)
        setError(undefined)
        setValue(undefined)
        callback(options)
            .then(setValue)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [callback])

    // useEffect(() => {
    //     callbackMemoized()
    // }, [callbackMemoized])

    return { loading, error, value, callbackMemoized }
}
