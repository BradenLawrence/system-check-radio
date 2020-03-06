import React, { useState, useEffect } from "react"
import VoteTile from "./VoteTile"
import {
  fetchVote,
  updateSubmission,
  deleteSubmission
} from "../../helpers/fetch_helpers"

const SubmissionTile = (props) => {
  const [descriptionInput, setDescriptionInput] = useState(props.submission.description)
  const [userVote, setUserVote] = useState({})
  const [editEnabled, setEditEnabled] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if(props.user.member) {
      fetchVote(props.submission.id, props.user.id)
      .then(json => {
        setUserVote(json)
      })
    }
  }, [])

  const handleInputChange = (event) => {
    setDescriptionInput(event.currentTarget.value)
  }

  const handleEditSave = (event) => {
    event.preventDefault()
    updateSubmission(props.submission.id)
    .then(updatedSubmission => {
      if(updatedSubmission.errors) {
        setErrors(updatedSubmission.errors)
      } else {
        setEditEnabled(false)
        props.updateSubmission(updatedSubmission)
      }
    })
  }

  const handleEditToggle = (event) => {
    event.preventDefault()
    setEditEnabled(!editEnabled)
    setErrors([])
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteSubmission(props.submission.id)
    .then(deleted_submission => {
      if(deleted_submission.errors) {
        setErrors(deleted_submission.errors)
      } else {
        props.removeSubmission(deleted_submission)
      }
    })
  }

  const handleVoteChange = (value, voteId) => {
    updateVote(value, props.submission.id, voteId)
    .then(updatedSubmission => {
      if(updatedSubmission.errors) {
        setErrors(updatedSubmission.errors)
      } else {
        let updatedVote = updatedSubmission.votes.find(vote => vote.id === id)
        setUserVote(updatedVote)
        props.updateSubmission(updatedSubmission)
      }
    })
  }

  const editButtonState = editEnabled ? "edit-active" : "edit-inactive"

  let editButton
  if(
    (props.user.id === props.submission.author.id && props.editActive)
    || props.user.role === "admin"
  ) {
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
  if(props.user.id === props.submission.author.id) {
    author = "You"
  } else {
    author = props.submission.author.name
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
        <span className="description-text">{props.submission.description}</span><i className="fa fa-quote-right"></i>
        <div className="author-name">
          -{ author } said on { props.submission.updated_at }
        </div>
      </div>
    )
  }

  let errorDisplay
  if(errors.length > 0) {
    errorDisplay = (
      <ul className="errors">
        { errors }
      </ul>
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
          editActive={props.editActive}
          user={props.user}
          userVote={userVote}
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
      { errorDisplay }
      <div className="row align-middle align-center">
        { voteArea }
        <div className="play-wrapper small-2 medium-2 row align-center">
          <button
            type="button"
            onClick={handlePlayClick}
            ><i className="play-btn fa fa-play-circle"></i>
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
