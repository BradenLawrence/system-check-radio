import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const UsersIndexContainer = (props) => {
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/api/v1/users")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(json => {
      if(json.errors) {
        setErrors([...json.errors])
      } else if(json) {
        setUsers(json)
      } else {
        setUsers([])
      }
    })
    .catch(error => console.error("Error fetching users: " + error.message))
  }, [])

  const userList = users.map(user => {
    return(
      <li key={user.id} className="category-listing row align-middle">
        <div className="name-col small-5 medium-7 columns">
          <Link to={`/users/${user.id}`}>{ user.name }</Link>
        </div>
        <div className="submission-col small-4 medium-3 columns">
          <Link to={`/users/${user.id}`}>{ user.submissions.length }</Link>
        </div>
        <div className="member-col small-3 medium-2 columns">
          <input type="checkbox"/>
        </div>
      </li>
    )
  })

  return(
    <div className="center-column">
      <h1>All Users</h1>
      <ul>
        <li className="category-listing row align-bottom">
          <div className="header-col small-5 medium-7 columns">Username</div>
          <div className="header-col submission-col small-4 medium-3 columns">Submissions</div>
          <div className="header-col member-col small-3 medium-2 columns">Member</div>
        </li>
        { userList }
      </ul>
    </div>
  )
}

export default UsersIndexContainer
