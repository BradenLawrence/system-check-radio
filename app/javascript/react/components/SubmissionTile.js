import React, { useState } from "react"

const SubmissionTile = (props) => {
  const [submission, setSubmission] = useState(props.submission)
  const [descriptionInput, setDescriptionInput] = useState(submission.description)
  const [editEnabled, setEditEnabled] = useState(false)
  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setDescriptionInput(event.currentTarget.value)
  }

  const handleEditSave = (event) => {
    event.preventDefault()
    fetch(`/api/v1/submissions/${submission.id}`, {
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
    .then(updated_submission => {
      if(updated_submission.errors) {
        setErrors(updated_submission.errors)
      } else {
        setSubmission(updated_submission)
        setEditEnabled(false)
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
    fetch(`/api/v1/submissions/${submission.id}`, {
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
        setErrors(updated_submission.errors)
      } else {
        props.removeSubmission()
      }
    })
    .catch(error => console.error("Error deleting submission: " + error.message))
  }

  const editButtonState = editEnabled ? "edit-active" : "edit-inactive"

  let editButton
  if(submission.isCurrentUser || submission.isAdmin) {
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
  if(submission.isCurrentUser) {
    author = "You"
  } else {
    author = submission.author
  }

  let descriptionArea
  if(editEnabled) {
    descriptionArea = (
      <div className="submission-form-area">
        <form className="submission-edit-form row align-justify" onSubmit={ handleEditSave }>
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
        "{submission.description}"
      </div>
    )
  }

  let deleteButton

  if(editEnabled) {
    deleteButton = (
      <button
        type="submit"
        className="delete-btn"
        onClick={handleDelete}
      >
        <i className="fa fa-times"></i>
      </button>
    )
  }

  return(
    <div className="submission-listing">
      <div className="row align-right">
        <div className="submision-top-bar small-10 columns">
          <ul className="errors">
            { errors }
          </ul>
        </div>
        <div className="delete-area small-2 columns">
          { deleteButton }
        </div>
      </div>
      <div className="row">
        <div className="submission-play small-3 medium-2 columns">
          <a href={submission.preview_url}>
            <i className="fa fa-play-circle"></i>
          </a>
        </div>
        <ul className="submission-info small-9 medium-10 columns">
          <li className="submission-name">{submission.name}</li>
          <li className="submission-details">
            {submission.album} | {submission.artists}
          </li>
        </ul>
        <div className="submission-vote small-3 medium-2">
          <i className="fa fa-thumbs-up"></i>
          <i className="fa fa-thumbs-down"></i>
        </div>
        <div className="submission-user-content small-9 medium-10 columns row align-justify align-middle">
          <div className="submission-edit small-2 large-1 columns">
            { editButton }
          </div>
          <div className="small-10 large-11 columns">
            { descriptionArea }
            <div className="author-name">-{ author } said on { submission.updated_at }</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
