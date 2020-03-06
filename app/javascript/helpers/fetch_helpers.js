const fetchUsers = () => {
  return(
    fetch("/api/v1/users")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.status + ": " + response.statusText)
      }
    })
    .catch(error => console.error("Error fetching users: " + error.message))
  )
}

const fetchUser = (id) => {
  return fetch(`/api/v1${id}`)
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw new Error(response.status + ": " + response.statusText)
    }
  })
  .catch(error => console.error("Error fetching user: " + error.message))
}

const fetchCurrentUser = () => {
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

const updateUserMembership = (id, status) => {
  return(
    fetch(`/api/v1/users/${userId}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        member: status
      })
    })
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

const updateSubmission = (submissionId) => {
  return fetch(`/api/v1/submissions/${submissionId}`, {
    credentials: "same-origin",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      submissionData: {
        description: descriptionInput
      }
    })
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

const deleteSubmission = (submissionId) => {
  return fetch(`/api/v1/submissions/${submissionId}`, {
    credentials: "same-origin",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw new Error(response.status + ": " + response.statusText)
    }
  })
  .catch(error => console.error("Error deleting submission: " + error.message))
}

const postSearchQuery = (query) => {
  let body = new FormData()
  body.append("query[term]", query)
  return fetch(`/api/v1/songs`, {
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

const fetchVote = (submissionId, userId) => {
  return fetch(`/api/v1/submissions/${submissionId}/votes/${userId}`)
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw new Error(response.status + ": " + response.statusText)
    }
  })
  .catch(error => console.error("Error fetching vote: " + error.message))
}

const updateVote = (value, submissionId, voteId) => {
  return fetch(`/api/v1/submissions/${submissionId}/votes/${voteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      voteData: {
        id: id,
        value: value,
        submission_id: props.submission.id
      }
    })
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw new Error(response.status + ": " + response.statusText)
    }
  })
  .catch(error => console.error("Error modifying vote: " + error.message))
}

export {
  fetchUsers,
  fetchUser,
  fetchCurrentUser,
  updateUserMembership,
  fetchPlaylist,
  postSubmission,
  updateSubmission,
  deleteSubmission,
  postSearchQuery,
  fetchVote,
  updateVote
}
