import React, { useState } from "react"

const SubmissionTile = (props) => {
  const [submission, setSubmission] = useState(props.submission)
  const [descriptionInput, setDescriptionInput] = useState(submission.description)
  const [editEnabled, setEditEnabled] = useState(false)

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
          id: submission.id,
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
  }

  const handleDelete = (event) => {
    event.preventDefault()
    console.log("Delete Submission")
  }

  const editButtonState = editEnabled ? "edit-active" : "edit-inactive"

  const editButton = (
    <div className="submission-edit small-2 large-1 columns">
      <button
        className={`edit-btn ${editButtonState}`}
        type="button"
        onClick={handleEditToggle}
      >
        <i className="fa fa-pencil"></i>
      </button>
    </div>
  )

  let descriptionArea

  if(editEnabled) {
    descriptionArea = (
      <div className="submission-form-area small-10 large-11 columns">
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
      <div className="small-10 large-11 columns submission-description">"{submission.description}"</div>
    )
  }

  return(
    <div className="submission-listing">
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
          { editButton }
          { descriptionArea }
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
