import React, { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
import SearchResultTile from "./SearchResultTile"
import SubmissionTile from "./SubmissionTile"

const PlaylistIndexContainer = (props) => {
  const defaultPlaylist = {
    name: "",
    submissions: []
  }
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/api/v1/playlists")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
    })
    .then(json => {
      if(json) {
        setPlaylist(json)
      } else {
        setPlaylist(defaultPlaylist)
      }
    })
    .catch(error => console.error(`Error fetching playlists ${error.message}`))
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
        setPlaylist(json)
        setSearchResults([])
      }
    })
    .catch(error => console.error("Error searching tracks: " + error.message))
  }

  const searchResultsList = searchResults.map(result => {
    return(
      <li key={result.id}>
        <SearchResultTile
          result={result}
          handleCreateSubmission={handleCreateSubmission}
        />
      </li>
    )
  })

  const submissionList = playlist.submissions.map(sub => {
    return(
      <li key={sub.id}>
        <SubmissionTile submission={sub} />
      </li>
    )
  })

  return(
    <div className="center-column">
      <h1>{ playlist.name }</h1>
      <ul className="errors">
        { errors }
      </ul>
      <SearchBar
        handleSearchResults={handleSearchResults}
      />
      <ul>
        { searchResultsList }
      </ul>
      <ul>
        { submissionList }
      </ul>
    </div>
  )
}

export default PlaylistIndexContainer
