import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import PlaylistIndexContainer from "./PlaylistIndexContainer"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={PlaylistIndexContainer}/>
        <Route exact path="/playlists" component={PlaylistIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
