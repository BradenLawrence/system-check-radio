import React, { useState } from "react"

const SearchBar = (props) => {
  const defaultQuery = {
    term: ""
  }
  const [query, setQuery] = useState(defaultQuery)

  const handleInput = (event) => {
    let key = event.currentTarget.name
    let value = event.currentTarget.value
    setQuery({
      ...query,
      [key]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let body = new FormData()
    body.append("query[term]", query.term)
    fetch(`/api/v1/songs`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json"
      },
      body: body
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input
          name="term"
          onChange={handleInput}
          value={query.term}
          placeholder="Type a song here"
          type="text"
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SearchBar