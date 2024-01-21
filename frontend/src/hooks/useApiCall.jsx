import { useCallback, useState } from 'react'
import useAsync from './useAsync'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

export default function useApiCall(
    endpoint,
    verb = 'GET',
) {
    const [value, setValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const callApi = (options = {}) => {
        setLoading(true)
        axios({
            method: verb,
            baseURL: baseURL,
            url: endpoint,
            data: options
        }).then((res) => {
            if (res.statusText === 'OK') {
                setValue(res.data)
            }
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    return { value, loading, error, callApi }
}
