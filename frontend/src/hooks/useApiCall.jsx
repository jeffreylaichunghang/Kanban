import useAsync from './useAsync'
import axios from 'axios'

// const DEFAULT_OPTIONS = {
//     headers: { "Content-Type": "application/json" },
// }
const baseURL = import.meta.env.VITE_API_URL

export default function useApiCall(
    endpoint,
    verb = 'GET',
    options = {},
    dependencies = []
) {
    return useAsync(() => {
        return axios({
            method: verb,
            baseURL: baseURL,
            url: endpoint,
            params: options
        }).then((res) => {
            if (res.statusText === 'OK') return res.data
            return Promise.reject(res.data)
        })

        // return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
        //     if (res.ok) return res.json()
        //     return res.json().then(json => Promise.reject(json))
        // })
    }, dependencies)
}
