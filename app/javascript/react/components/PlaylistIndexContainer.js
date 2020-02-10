import React, { useState, useEffect } from "react"

const PlaylistIndexContainer = (props) => {
  const defaultPlaylist = {
    name: "",
    submissions: []
  }
  const [playlist, setPlaylist] = useState(defaultPlaylist)

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

  return(
    <h1>Welcome to the Playlist Index!</h1>
  )
}

export default PlaylistIndexContainer
