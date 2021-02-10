import { useState, useEffect } from 'react'
import { useLogin } from './LoginContext'

function useFetch(url, key) {
    const [data, setData] = useState()
    const [login] = useLogin()

    useEffect(() => {
      const opts = {}
      if (login) {
        opts.headers = { 'Authorization': 'Bearer ' + login.token }
      }
      fetch(url, opts)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }, [url, login, key])

    return data
}

export default useFetch;