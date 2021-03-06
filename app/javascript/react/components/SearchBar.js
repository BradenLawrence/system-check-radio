import React, { useState } from "react"
import { postSearchQuery } from "../../helpers/fetchHelpers"

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
    if(query.term === "") {
      props.handleSearchResults([])
    } else {
      postSearchQuery(query.term)
      .then(json => {
        props.handleSearchResults(json)
      })
    }
  }

  const handleClearSearch = (event) => {
    event.preventDefault()
    setQuery(defaultQuery)
    props.handleSearchResults([])
  }

  let clearSearchDisplay
  let inputClearClass
  if(query.term !== "") {
    clearSearchDisplay = (
      <input
        type="button"
        value="Clear"
        className="clear-search small-3 columns"
        onClick={ handleClearSearch }
      />
    )
    inputClearClass = "small-9"
  } else {
    inputClearClass = ""
  }

  return(
    <form onSubmit={handleSubmit} className="search">
      <div className="row medium-unstack">
        <label htmlFor="term" className="search-label hide-for-small-only">
          Track
        </label>
        <div className="columns row">
          <input
            name="term"
            onChange={handleInput}
            value={query.term}
            placeholder="Type a song name..."
            type="text"
            className={`columns ${inputClearClass}`}
          />
          { clearSearchDisplay }
        </div>
        <input type="submit" value="Search" className="search-btn medium-2 columns button primary"/>
      </div>
    </form>
  )
}

export default SearchBar
