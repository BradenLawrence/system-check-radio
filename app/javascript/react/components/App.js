import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import PlaylistIndexContainer from "./PlaylistIndexContainer"
import UsersIndexContainer from "./UsersIndexContainer"
import UsersShowContainer from "./UsersShowContainer"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/playlists" component={PlaylistIndexContainer}/>
        <Route exact path="/users" component={UsersIndexContainer}/>
        <Route exact path="/users/:id" component={UsersShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
