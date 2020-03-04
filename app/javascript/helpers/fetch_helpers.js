const fetchUser = () => {
  return(
    fetch("/api/v1/users/current")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
  )
}

const fetchPlaylist = (path) => {
  return(
    fetch(`/api/v1/${path}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .catch(error => console.error(
      "Error fetching user or playlist: " + error.message
    ))
  )
}

const postSubmission = (submissionData) => {
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
  return fetch("/api/v1/submissions", {
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
  .catch(error => console.error("Error searching tracks: " + error.message))
}

export {
  fetchUser,
  fetchPlaylist,
  postSubmission
}
