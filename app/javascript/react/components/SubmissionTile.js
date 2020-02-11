import React from 'react'

const SubmissionTile = ({ submission }) => {
  return(
    <ul className="track-listing">
      <li className="track-name">Track name: {submission.track}</li>
      <li className="track-description">Description: {submission.description}</li>
    </ul>
  )
}

export default SubmissionTile
