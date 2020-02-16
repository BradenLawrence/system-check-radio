import React, { useState, useEffect } from "react"

const UsersIndexContainer = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("api/v1/users")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(json => {
      setUsers(json)
    })
  }, [])

  return(
    <div>Hello from the Users Index Container!</div>
  )
}

export default UsersIndexContainer
