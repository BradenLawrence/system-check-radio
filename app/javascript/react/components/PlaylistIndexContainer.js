import React, { useState, useEffect } from "react"
import SubmissionTile from "./SubmissionTile"
import SearchBar from "./SearchBar"

const PlaylistIndexContainer = (props) => {
  const defaultPlaylist = {
    name: "",
    submissions: []
  }
  const [playlist, setPlaylist] = useState(defaultPlaylist)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    fetch("/api/v1/playlists")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
    })
    .then(json => setPlaylist(json))
    .catch(error => console.error(`Error fetching playlists ${error.message}`))
  }, [])

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  const searchResultsList = searchResults.map(result => {
    return(
      <li key={result.id}>
        <SearchResultTile result={result} />
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
      <SearchBar
        handleSearchResults={handleSearchResults}
      />
      <ul>
        { submissionList }
      </ul>
    </div>
  )
}

export default PlaylistIndexContainer
