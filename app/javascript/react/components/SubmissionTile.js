import React, { useState } from 'react'

const SubmissionTile = ({ submission }) => {
  const [descriptionInput, setDescriptionInput] = useState(submission.description)

  const handleInputChange = (event) => {
    setDescriptionInput(event.currentTarget.value)
  }

  const handleEditSave = (event) => {
    event.preventDefault()
    console.log('Edit Saved')
  }

  const handleCancelEdit = (event) => {
    console.log('cancel edit')
  }

  const handleDelete = (event) => {
    event.preventDefault()
    console.log('Delete Submission')
  }

  const editButton = (
    <div>
      <li className="submission-edit"><i className="fa fa-pencil"></i></li>
      <li className="submission-cancel">
        <button
          type="button"
          onClick={handleCancelEdit}
        >
          <i className="fa fa-pencil"></i>
        </button>
      </li>
    </div>
  )

  const descriptionArea = (
    <li className="submission-description">"{submission.description}"</li>
  )

  const editForm = (
    <li className="submission-edit-form">
      <form onSubmit={ handleEditSave }>
        <input
          name="description"
          type="text"
          value={descriptionInput}
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value="Save Changes"
        />
        <input
          type="submit"
          value="Delete Submission"
          onClick={handleDelete}
        />
      </form>
    </li>
  )

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
        <ul className="submission-user-content small-9 medium-10 columns">
          { editButton }
          { descriptionArea }
          { editForm }
        </ul>
      </div>
    </div>
  )
}

export default SubmissionTile
