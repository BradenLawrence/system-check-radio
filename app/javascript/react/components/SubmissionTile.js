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
      <div className="submission-edit small-2 columns">
        <button
          className={`edit-btn ${editButtonState}`}
          type="button"
          onClick={handleEditToggle}
        >
          <i className="fa fa-pencil"></i>
        </button>
      </div>
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
      <div className="submission-description"><i className="fa fa-quote-left"></i>
        <span className="description-text"> {props.submission.description}</span><i className="fa fa-quote-right"></i>
        <div className="author-name">
          -{ author } said on { props.submission.updated_at }
        </div>
      </div>
    )
  }

  let voteArea
  if(editEnabled) {
    voteArea = (
      <div className="submission-delete-wrapper small-2 columns row">
        <button type="submit" onClick={handleDelete} className="submission-delete small-10">
          <i className="fa fa-times"></i>
        </button>
      </div>
    )
  } else {
    voteArea = (
      <div className="submission-vote small-2 columns">
        <VoteTile
          submission={props.submission}
          handleVoteChange={handleVoteChange}
        />
      </div>
    )
  }

  const handlePlayClick = (event) => {
    event.preventDefault()
    props.playSubmission(props.submission.track_id)
  }

  return(
    <div className="category-listing track">
      <ul className="errors">
        { errors }
      </ul>
      <div className="row align-middle align-center">
        { voteArea }
        <div className="play-wrapper small-2 medium-2 row align-center">
          <button
            type="button"
            onClick={handlePlayClick}
            ><i class="play-btn fa fa-arrow-circle-up"></i>
          </button>
        </div>
          <ul className="submission-info small-7 medium-7 columns">
          <li className="submission-name">{props.submission.name}</li>
          <li className="submission-details">
            {props.submission.album} | {props.submission.artists}
          </li>
        </ul>
      </div>
      <div className="submission-user-content row align-top">
        { editButton }
        <div className="description-area columns">
          { descriptionArea }
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
