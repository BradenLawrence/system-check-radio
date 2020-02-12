import React from 'react'

const SearchResultTile = ({ result} ) => {
  return(
    <div className="row search-result">
      <div className="medium-2 columns album-cover">
        <img src={result.image}/>
      </div>
      <ul className="medium-10 columns track-info">
        <li><h3>{result.name}</h3></li>
        <li className="album-title">{result.album}</li>
        <li className="artist-name">{result.artists.join(", ")}</li>
      </ul>
    </div>
  )
}

export default SearchResultTile
