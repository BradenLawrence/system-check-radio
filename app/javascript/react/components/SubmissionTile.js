import React from 'react'

const SubmissionTile = ({ submission }) => {
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
        <ul className="small-9 medium-10 columns">
          <li className="submission-description">"{submission.description}"</li>
        </ul>
      </div>
    </div>
  )
}

export default SubmissionTile
