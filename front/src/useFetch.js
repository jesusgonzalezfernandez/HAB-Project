import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useFetch(url, key) {
  const [data, setData] = useState()
  const login = useSelector(s => s.login)

  useEffect(async () => {
    const opts = {}
    if (login) {
      opts.headers = { 'Authorization': 'Bearer ' + login.token }
    }
    await fetch(url, opts)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }, [url, login, key])

  return data
}

export default useFetch;
