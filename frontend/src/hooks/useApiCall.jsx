import { useCallback, useState } from 'react'
import axios from 'axios'

import { useAuth } from './useAuth'

const baseURL = import.meta.env.VITE_API_URL

export default function useApiCall(
    endpoint,
    verb = 'GET',
    url = baseURL
) {
    const [value, setValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useAuth()

    const callApi = useCallback((options = {}) => {
        setLoading(true)
        axios({
            method: verb,
            baseURL: url,
            url: endpoint,
            data: options,
            params: {
                secret_token: user,
            }
        }).then((res) => {
            if (res.statusText === 'OK') {
                setValue(res.data)
            }
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [endpoint, verb, user, url])

    return { value, loading, error, callApi }
}
