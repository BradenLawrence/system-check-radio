import React, { useState } from "react"

const VoteTile = (props) => {
  const voteId = props.userVote.id
  const voteValue = props.userVote.value
  const [upvoteActive, setUpvoteActive] = useState(voteValue === 1)
  const [downvoteActive, setDownvoteActive] = useState(voteValue === -1)

  const handleClick = (event) => {
    event.preventDefault()
    let change = event.currentTarget.value
    props.handleVoteChange(change, voteId)
    if(change === "1") {
      setUpvoteActive(!upvoteActive)
      setDownvoteActive(false)
    } else {
      setDownvoteActive(!downvoteActive)
      setUpvoteActive(false)
    }
  }

  let upvoteDisplay
  let downvoteDisplay
  if(props.user.member && props.editActive) {
    upvoteDisplay = (
      <button
        name="upvote"
        value="1"
        onClick={handleClick}
        className={`upvote ${upvoteActive ? "active" : "inactive"}`}
      >
        <i className="fa fa-caret-up"></i>
      </button>
    )
    downvoteDisplay = (
      <button
        name="downvote"
        value="-1"
        onClick={handleClick}
        className={`downvote ${downvoteActive ? "active" : "inactive"}`}
      >
        <i className="fa fa-caret-down"></i>
      </button>
    )
  }

  return(
    <div>
      <div>
        { upvoteDisplay }
        <div className="vote-total">{ props.submission.vote_total }</div>
        { downvoteDisplay }
      </div>
    </div>
  )
}

export default VoteTile
