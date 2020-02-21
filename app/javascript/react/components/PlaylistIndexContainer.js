import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
import SearchResultTile from "./SearchResultTile"
import SubmissionTile from "./SubmissionTile"

const PlaylistIndexContainer = (props) => {
  const defaultPlaylist = {
    name: "",
    submissions: []
  }
  const defaultUser = {
    name: "",
    member: false,
    isAdmin: false,
  }
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const [user, setUser] = useState(defaultUser)
  const [submissions, setSubmissions] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/api/v1/playlists")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(json => {
      if(json) {
        setPlaylist(json)
        setSubmissions(json.submissions)
      } else {
        setPlaylist(defaultPlaylist)
      }
    })
    .catch(error => console.error("Error searching tracks: " + error.message))
  }, [])

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  const handleCreateSubmission = (submissionData) => {
    let body = new FormData()
    body.append("submissionData[album]", submissionData.album)
    body.append("submissionData[artists]", submissionData.artists.join(", "))
    body.append("submissionData[description]", submissionData.description)
    body.append("submissionData[duration_ms]", submissionData.duration_ms)
    body.append("submissionData[external_url]", submissionData.external_url)
    body.append("submissionData[image]", submissionData.image)
    body.append("submissionData[name]", submissionData.name)
    body.append("submissionData[preview_url]", submissionData.preview_url)
    body.append("submissionData[track_id]", submissionData.id)
    fetch("/api/v1/submissions", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      },
      body: body
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .then(json => {
      if(json.errors) {
        setErrors(json.errors)
      } else {
        setSubmissions(submissions.concat(json))
        setSearchResults([])
      }
    })
    .catch(error => console.error("Error searching tracks: " + error.message))
  }

  let searchBarDisplay
  if(playlist.isMember) {
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

  const updateSubmission = (updated_submission) => {
    let subToUpdate = submissions.find(sub => sub.id === updated_submission.id)
    let indexToUpdate = submissions.indexOf(subToUpdate)
    setSubmissions([
      ...submissions.slice(0, indexToUpdate),
      updated_submission,
      ...submissions.slice(indexToUpdate+1)
    ])
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
          submission={sub}
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
      <ul className="row align-center">
        { searchResultsList }
      </ul>
      <ul className="submission-list">
        { submissionList }
      </ul>
    </div>
  )
}

export default PlaylistIndexContainer
