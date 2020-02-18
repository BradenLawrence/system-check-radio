import React from "react"
import { Link } from "react-router-dom"

const UserListTile = (props) => {
  let numSubmissions
  if(props.user.submissions) {
    numSubmissions = props.user.submissions.length
  } else {
    numSubmissions = 0
  }

  return(
    <>
      <div className="name-col small-5 medium-7 columns">
        <Link to={`/users/${props.user.id}`}>{ props.user.name }</Link>
      </div>
      <div className="submission-col small-4 medium-3 columns">
        <Link to={`/users/${props.user.id}`}>{ props.user.submissions.length }</Link>
      </div>
      <div className="member-col small-3 medium-2 columns">
        <input
          type="checkbox"
          checked={ props.user.member }
          onChange={ props.handleMembershipClick }
        />
      </div>
    </>
  )
}

export default UserListTile
