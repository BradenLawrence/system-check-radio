import React, { useState, useEffect } from "react"

const UsersShowContainer = (props) => {
  const defaultUser = {
    id: null,
    name: "",
    submissions: []
  }
  const [user, setUser] = useState(defaultUser)
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/api/v1/users/current")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(json => {
      if(json) {
        setCurrentUser(json)
      } else {
        setCurrentUser(defaultUser)
      }
    })
    .catch(error => console.error("Error fetching current user: " + error.message))

    fetch(`/api/v1${props.location.pathname}`)
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
        setUser(json)
      } else {
        setUser(defaultUser)
      }
    })
    .catch(error => console.error("Error fetching user: " + error.message))
  }, [])

  let submissionList
  if(user.submissions.length > 0) {
    submissionList = user.submissions.map(sub => {
      return(
        <li key={ sub.id } className="category-listing user-item row align-bottom">
          <div className="name-col small-5 medium-7 columns">
            { sub.name }
          </div>
          <div className="score-col small-3 medium-2 columns">
            { sub.vote_total }
          </div>
          <div className="date-col small-4 medium-3 columns">
            { sub.updated_at }
          </div>
        </li>
      )
    })
  } else {
    let authorDisplay
    if(currentUser.id === Number(props.match.params.id)) {
      authorDisplay = "You have"
    } else {
      authorDisplay = user.name + " has"
    }
    submissionList = (
      <li className="category-listing user-item">
        <div className="category-empty">
          { authorDisplay } no submissions
        </div>
      </li>
    )
  }

  let membershipDisplay
  if(user.member) {
    membershipDisplay = "active"
  } else {
    membershipDisplay = "inactive"
  }

  return(
    <div>
      <div className="center-column">
        <h1>{ user.name }</h1>
        <ul className="errors">
          { errors }
        </ul>
        <h2>Profile</h2>
        <ul>
          <li className="category-listing user-item row">
            <div className="header-col small-4 columns">Email:</div>
            <div className="text-col small-8 columns">{ user.email }</div>
          </li>
          <li className="category-listing user-item row">
            <div className="header-col small-4 columns">Member status:</div>
            <div className="text-col small-8 columns">{ membershipDisplay }</div>
          </li>
          <li className="category-listing user-item row">
            <div className="header-col small-4 columns">Role:</div>
            <div className="text-col small-8 columns">{ user.role }</div>
          </li>
        </ul>
        <h2>Submissions</h2>
        <ul>
          <li className="category-listing user-item row align-bottom">
            <div className="header-col small-5 medium-7 columns">Song</div>
            <div className="header-col score-col small-3 medium-2 columns">Score</div>
            <div className="header-col date-col small-4 medium-3 columns">Date</div>
          </li>
          { submissionList }
        </ul>
      </div>
    </div>
  )
}

export default UsersShowContainer
