import React, { useState, useEffect } from "react"

const VoteTile = (props) => {
  const [upvoteActive, setUpvoteActive] = useState(false)
  const [downvoteActive, setDownvoteActive] = useState(false)

  useEffect(() => {
    setUpvoteActive(props.userVote.value === 1)
    setDownvoteActive(props.userVote.value === -1)
  }, [props.userVote.value])

  const handleClick = (event) => {
    event.preventDefault()
    let change = event.currentTarget.value
    props.handleVoteChange(change, props.userVote.id)
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
