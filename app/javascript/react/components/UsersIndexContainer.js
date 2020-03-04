import React, { useState, useEffect } from "react"
import UserListTile from "./UserListTile"
import { fetchUsers, updateUserMembership } from "../../helpers/fetch_helpers"

const UsersIndexContainer = (props) => {
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchUsers()
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
  }, [])

  const setMembershipStatus = (userId, status) => {
    updateUserMembership(userId, status)
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
