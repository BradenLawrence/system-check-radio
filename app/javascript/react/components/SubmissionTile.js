import React, { useState } from "react"
import VoteTile from "./VoteTile"

const SubmissionTile = (props) => {
  const [descriptionInput, setDescriptionInput] = useState(props.submission.description)
  const [editEnabled, setEditEnabled] = useState(false)
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setDescriptionInput(event.currentTarget.value)
  }

  const handleEditSave = (event) => {
    event.preventDefault()
    fetch(`/api/v1/submissions/${props.submission.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        submissionData: {
          description: descriptionInput
        }
      })
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(updatedSubmission => {
      if(updatedSubmission.errors) {
        setErrors(updatedSubmission.errors)
      } else {
        setEditEnabled(false)
        props.updateSubmission(updatedSubmission)
      }
    })
    .catch(error => console.error("Error searching tracks: " + error.message))
  }

  const handleEditToggle = (event) => {
    event.preventDefault()
    setEditEnabled(!editEnabled)
    setErrors([])
  }

  const handleDelete = (event) => {
    event.preventDefault()
    fetch(`/api/v1/submissions/${props.submission.id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(deleted_submission => {
      if(deleted_submission.errors) {
        setErrors(deleted_submission.errors)
      } else {
        props.removeSubmission(deleted_submission)
      }
    })
    .catch(error => console.error("Error deleting submission: " + error.message))
  }

  const handleVoteChange = (value, id) => {
    if(props.submission.currentUserVote.id) {
      fetch(`/api/v1/votes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          voteData: {
            id: id,
            value: value,
            submission_id: props.submission.id
          }
        })
      })
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + ": " + response.statusText)
        }
      })
      .then(updatedSubmission => {
        if(updatedSubmission.errors) {
          setErrors(updatedSubmission.errors)
        } else {
          props.updateSubmission(updatedSubmission)
        }
      })
      .catch(error => console.error("Error modifying vote: " + error.message))
    } else {
      fetch(`/api/v1/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          voteData: {
            value: value,
            submission_id: props.submission.id
          }
        })
      })
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + ": " + response.statusText)
        }
      })
      .then(updatedSubmission => {
        if(updatedSubmission.errors) {
          setErrors(updatedSubmission.errors)
        } else {
          props.updateSubmission(updatedSubmission)
        }
      })
      .catch(error => console.error("Error creating vote: " + error.message))
    }
  }

  const editButtonState = editEnabled ? "edit-active" : "edit-inactive"

  let editButton
  if(props.submission.isCurrentUser || props.submission.isAdmin) {
    editButton = (
      <button
        className={`edit-btn ${editButtonState}`}
        type="button"
        onClick={handleEditToggle}
      >
        <i className="fa fa-pencil"></i>
      </button>
    )
  } else {
    editButton = (
      <div className="edit-btn"></div>
    )
  }

  let author
  if(props.submission.isCurrentUser) {
    author = "You"
  } else {
    author = props.submission.author
  }

  let descriptionArea
  if(editEnabled) {
    descriptionArea = (
      <div className="submission-form-area">
        <form className="submission-edit-form row" onSubmit={ handleEditSave }>
          <input
            name="description"
            type="text"
            value={descriptionInput}
            onChange={handleInputChange}
            className="small-9 columns"
          />
          <button
            type="submit"
            className="small-2 columns check-btn"
          >
            <i className="fa fa-check"></i>
          </button>
        </form>
      </div>
    )
  } else {
    descriptionArea = (
      <div className="submission-description">
        <i className="fa fa-quote-left fa-pull-left"></i>
        {props.submission.description} 
        <i className="fa fa-quote-right"></i>
        <span className="author-name">-{ author } said on { props.submission.updated_at }</span>
      </div>
    )
  }

  let submissionBtnArea
  if(editEnabled) {
    submissionBtnArea = (
      <button type="submit" onClick={handleDelete} className="submission-delete small-1 columns">
        <i className="fa fa-times"></i>
      </button>
    )
  } else {
    submissionBtnArea = (
    <a href={props.submission.preview_url} className="submission-play small-1 columns">
      <i className="fa fa-caret-right fa-large"></i>
    </a>
    )
  }

  return(
    <div className="category-listing track">
      <ul className="errors">
        { errors }
      </ul>
      <div className="row align-middle">
        <div className="submission-vote small-2 columns">
          <VoteTile
            submission={props.submission}
            handleVoteChange={handleVoteChange}
          />
        </div>
        <div className="album-cover small-2 columns">
          <img src={props.submission.image} />
        </div>
        <ul className="submission-info small-7 columns">
          <li className="submission-name">{props.submission.name}</li>
          <li className="submission-details">
            {props.submission.album} | {props.submission.artists}
          </li>
        </ul>
        { submissionBtnArea }
      </div>
      <div className="submission-user-content row align-top">
        <div className="submission-edit small-2 columns">
          { editButton }
        </div>
        <div className="description-area small-10 columns">
          { descriptionArea }
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
