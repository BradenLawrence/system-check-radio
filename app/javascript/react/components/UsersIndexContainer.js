import React, { useState, useEffect } from "react"
import UserListTile from "./UserListTile"

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
        setUsers(
          json.sort((a, b) => {
            return (a.id > b.id) ? 1 : -1
          })
        )
      } else {
        setUsers([])
      }
    })
    .catch(error => console.error("Error fetching users: " + error.message))
  }, [])

  const setMembershipStatus = (userId, status) => {
    fetch(`/api/v1/users/${userId}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        member: status
      })
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(updated_user => {
      if(updated_user.errors) {
        setErrors(updated_user.errors)
      } else {
        let userToUpdate = users.find(item => item.id === updated_user.id)
        let indexOfUser = users.indexOf(userToUpdate)
        setUsers([
          ...users.slice(0, indexOfUser),
          updated_user,
          ...users.slice(indexOfUser+1)
        ])
        setErrors([])
      }
    })
    .catch(error => console.error("Error updating user: " + error.message))
  }

  const userList = users.map(user => {
    const handleMembershipClick = () => {
      return setMembershipStatus(user.id, !user.member)
    }

    return(
      <li key={user.id} className="category-listing user-item row align-middle">
        <UserListTile
          user={user}
          handleMembershipClick={handleMembershipClick}
        />
      </li>
    )
  })

  return(
    <div className="center-column">
      <h1>All Users</h1>
      <ul>
        <li className="category-listing user-item row align-bottom">
          <div className="header-col small-8 medium-7 columns">Username</div>
          <div className="header-col submission-col medium-3 columns hide-for-small-only">Submissions</div>
          <div className="header-col member-col small-3 medium-2 columns">
            Member
          </div>
        </li>
        { userList }
      </ul>
    </div>
  )
}

export default UsersIndexContainer
