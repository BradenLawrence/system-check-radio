import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
import SearchResultTile from "./SearchResultTile"
import SubmissionTile from "./SubmissionTile"
import {
  fetchUser,
  fetchPlaylist,
  postSubmission
} from "../../helpers/fetch_helpers"

const PlaylistIndexContainer = (props) => {
  const defaultPlaylist = {
    name: "",
    submissions: []
  }
  const defaultUser = {
    name: "",
    role: null,
    member: false
  }
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const [user, setUser] = useState(defaultUser)
  const [playerSource, setPlayerSource] = useState("")
  const [submissions, setSubmissions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchUser()
    .then(response => {
      if(response) {
        setUser(response)
      } else {
        setUser(defaultUser)
      }
    })
    .then(
      fetchPlaylist(props.match.path)
      .then(response => {
        if(response) {
          setPlaylist(response)
          setSubmissions(response.submissions.sort((a, b) => {
            return b.vote_total - a.vote_total
          }))
        } else {
          setPlaylist(defaultPlaylist)
        }
      })
    )
  }, [])

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  const handleCreateSubmission = (submissionData) => {
    postSubmission(submissionData)
    .then(response => {
      if(response.errors) {
        setErrors(response.errors)
      } else {
        setSubmissions([response, ...submissions])
        setSearchResults([])
      }
    })
  }

  let searchBarDisplay
  if(user.member && !playlist.compilation) {
    searchBarDisplay = <SearchBar handleSearchResults={handleSearchResults} />
  }

  const searchResultsList = searchResults.map(result => {
    return(
      <li key={result.id} className="small-12 medium-8 columns">
        <SearchResultTile
          result={result}
          handleCreateSubmission={handleCreateSubmission}
        />
      </li>
    )
  })

  let searchResultDisplay
  if(searchResults.length > 0) {
    searchResultDisplay = (
      <ul className="row align-center">
        { searchResultsList }
      </ul>
    )
  }

  let playerDisplay
  if(playerSource !== "") {
    playerDisplay = (
      <iframe
        src={playerSource}
        height="80"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    )
  }

  const playSubmission = (trackId) => {
    setPlayerSource(`https://open.spotify.com/embed/track/${trackId}`)
  }

  const updateSubmission = (updated_submission) => {
    let subToUpdate = submissions.find(sub => sub.id === updated_submission.id)
    let indexToUpdate = submissions.indexOf(subToUpdate)
    let updatedSubmissions = [
      ...submissions.slice(0, indexToUpdate),
      updated_submission,
      ...submissions.slice(indexToUpdate+1)
    ]
    setSubmissions(updatedSubmissions.sort((a, b) => {
      return b.vote_total - a.vote_total
    }))
  }

  const removeSubmission = (removed_submission) => {
    let subToRemove = submissions.find(sub => sub.id === removed_submission.id)
    let indexToRemove = submissions.indexOf(subToRemove)
    setSubmissions([
      ...submissions.slice(0, indexToRemove),
      ...submissions.slice(indexToRemove+1)
    ])
  }

  const submissionList = submissions.map(sub => {
    return(
      <li key={sub.id}>
        <SubmissionTile
          editActive={!playlist.compilation}
          user={user}
          submission={sub}
          playSubmission={playSubmission}
          updateSubmission={updateSubmission}
          removeSubmission={removeSubmission}
        />
      </li>
    )
  })

  return(
    <div className="center-column">
      <h1>{ playlist.name }</h1>
      <ul className="errors">
        { errors }
      </ul>
      { searchBarDisplay }
      { searchResultDisplay }
      { playerDisplay }
      <ul className="submission-list">
        { submissionList }
      </ul>
    </div>
  )
}

export default PlaylistIndexContainer
