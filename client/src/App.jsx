import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Players from './components/Players';
import AddPlayers from './components/AddPlayer';
import Game from './components/games';




function App() {
  let [cssbold, setCssbold] = useState("makeItBoldPlayers")
  let [cssboldStatus, setCssboldStatus] = useState("")
  

  const playersBold = () =>{
    setCssbold("makeItBoldPlayers")
    setCssboldStatus("")
  }

  const playersBoldStatus = () =>{
    setCssboldStatus("makeItBoldPlayers")
    setCssbold("")
  }

  return (
    <BrowserRouter>
    <div className="App main container">
      <div className='glass container'>
        <h1 className='big'>Three Game Series</h1>
    <Link onClick={playersBold} className={cssbold} to="/">Manage Players </Link> |
    <Link onClick={playersBoldStatus} className={cssboldStatus} to="/status/game/1"> Manage Players Status</Link>
    <Switch>
      <Route exact path="/">
      <Players></Players>
      </Route>
      <Route path="/addPlayer">
        <AddPlayers></AddPlayers>
      </Route>
      <Route path="/status/game/1">
        <Game></Game>
      </Route>
      </Switch>
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;
