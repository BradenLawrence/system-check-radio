import React from "react"

const VoteTile = (props) => {
  const voteValue = props.submission.currentUserVote
  const upvoteState = voteValue === 1 ? "active" : "inactive"
  const downvoteState = voteValue === -1 ? "active" : "inactive"

  const handleClick = (event) => {
    event.preventDefault()
    props.handleVoteChange(event.currentTarget.value)
  }

  let upvoteDisplay
  let downvoteDisplay
  if(props.submission.isMember) {
    upvoteDisplay = (
      <button
        name="upvote"
        value="1"
        onClick={handleClick}
        className={`upvote ${upvoteState}`}
      >
        <i className="fa fa-caret-up"></i>
      </button>
    )
    downvoteDisplay = (
      <button
        name="downvote"
        value="-1"
        onClick={handleClick}
        className={`downvote ${downvoteState}`}
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
