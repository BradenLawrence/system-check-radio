import React, { useState, useEffect } from "react"

const UsersShowContainer = (props) => {
  const defaultUser = {
    name: "",
    submissions: []
  }
  const [user, setUser] = useState(defaultUser)
  const [errors, setErrors] = useState([])
  
  useEffect(() => {
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
        <li key={ sub.id } className="category-listing row align-bottom">
          <div className="name-col small-8 medium-9 columns">
            { sub.name }
          </div>
          <div className="date-col small-4 medium-3 columns">
            { sub.updated_at }
          </div>
        </li>
      )
    })
  } else {
    let authorDisplay
    if(user.isCurrentUser) {
      authorDisplay = "You have"
    } else {
      authorDisplay = user.name + " has"
    }
    submissionList = (
      <li className="category-listing">
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
          <li className="category-listing row">
            <div className="header-col small-4 columns">Email:</div>
            <div className="text-col small-8 columns">{ user.email }</div>
          </li>
          <li className="category-listing row">
            <div className="header-col small-4 columns">Member status:</div>
            <div className="text-col small-8 columns">{ membershipDisplay }</div>
          </li>
          <li className="category-listing row">
            <div className="header-col small-4 columns">Role:</div>
            <div className="text-col small-8 columns">{ user.role }</div>
          </li>

        </ul>
        <h2>Submissions</h2>
        <ul>
          <li className="category-listing row align-bottom">
            <div className="header-col small-8 medium-9 columns">Song</div>
            <div className="header-col date-col small-4 medium-3 columns">Date</div>
          </li>
          { submissionList }
        </ul>
      </div>
    </div>
  )
}

export default UsersShowContainer
