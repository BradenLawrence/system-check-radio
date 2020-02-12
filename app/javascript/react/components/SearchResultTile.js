import React, { useState } from 'react'

const SearchResultTile = ({ result } ) => {
  const defaultSubmission = {
    ...result,
    description: ""
  }
  const [submissionData, setSubmissionData] = useState(defaultSubmission)

  const handleInput = (event) => {
    let key = event.currentTarget.name
    let value = event.currentTarget.value
    setSubmissionData({
      ...submissionData,
      [key]: value
    })
  }

  const handleSubmit = (event) => {
    debugger
    event.preventDefault()
    let body = new FormData()
    body.append("submissionData[image]", submissionData.image)
    body.append("submissionData[name]", submissionData.name)
    fetch("/api/v1/submissions", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      },
      body: body
    })
  }

  return(
    <div>
      <div className="row search-result">
        <div className="small-2 columns album-cover">
          <img src={result.image}/>
        </div>
        <ul className="small-10 columns track-info">
          <li><h3>{result.name}</h3></li>
          <li className="album-title">{result.album}</li>
          <li className="artist-name">{result.artists.join(", ")}</li>
        </ul>
        <div className="small-12 columns result-actions">
          <form onSubmit={handleSubmit}>
            <label>
              Why are you nominating this song?
              <input
                type="text"
                name="description"
                onChange={handleInput}
                placeholder="Ex: How I felt writing feature tests this morning."
                value={submissionData.description}
              />
            </label>
            <input className="button" type="button" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchResultTile
