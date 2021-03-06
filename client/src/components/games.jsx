import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Game = () => {
    let [report, setReport] = useState([])
    let [game1, setGame1] = useState(true)
    let [game2, setGame2] = useState(false)
    let [game3, setGame3] = useState(false)
    let [theGame, setTheGame] = useState("gameOneStatus")
    let [reRender,setreRender] = useState(false)
    let [g1Bold,setG1Bold] = useState("fw-bold btn btn-info")
    let [g2Bold,setG2Bold] = useState("btn btn-info")
    let [g3Bold,setG3Bold] = useState("btn btn-info")

console.log(g1Bold)
    const G1 = () => {
        setGame1(true)
        setGame2(false)
        setGame3(false)
        setTheGame("gameOneStatus")
        setG1Bold("fw-bold btn btn-info")
        setG2Bold("btn btn-info")
        setG3Bold("btn btn-info")
    }

    const G2 = () => {
        setGame1(false)
        setGame2(true)
        setGame3(false)
        setTheGame("gameTwoStatus")
        setG1Bold("btn btn-info")
        setG2Bold("fw-bold btn btn-info")
        setG3Bold("btn btn-info")
    }

    const G3 = () => {
        setGame1(false)
        setGame2(false)
        setGame3(true)
        setTheGame("gameThreeStatus")
        setG1Bold("btn btn-info")
        setG2Bold("btn btn-info")
        setG3Bold("fw-bold btn btn-info")
    }


    useEffect(() => {
        axios.get("http://localhost:8000/api/teamManager")
            .then(response => {

                //--------SORTING-----------------------
                response.data.results.sort(function (a, b) {
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                })
                //---------SORTING-------------------
                setReport(response.data.results)
            }).catch(err => {
                console.log("error 404... no API found." + err)
            })
    }, [reRender])

    function DatabaseCall(_id, name, position, game, decision) {
        let formInfo = {name, position, [game]: decision }
            console.log(formInfo)
        axios.put(`http://localhost:8000/api/teamManager/${_id}`, formInfo)
            .then(res => {
                setreRender(!reRender)
                console.log(res.data.results[game])
                
            })
            .catch(err => {
                console.log("error 404... no API found." + err)
            })
    }


    return <>
        <h1>Player Status - Game {game1?"1":game2?"2":game3?"3":null}</h1>
        <p><button onClick={G1} className={g1Bold}>Game 1</button> | <button onClick={G2} className={g2Bold}>Game 2</button> | <button onClick={G3} className={g3Bold}>Game 3</button></p>
        <table className="table table-striped w-auto mx-auto">
            <thead>
                <tr>
                    <th>Players Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    report.map((playersObj) => {
                        return <React.Fragment key={playersObj._id}>
                            {game1 ? playersObj[theGame] == "Undecided"?<tr>
                                {console.log("yo")}
                                <td className='fw-bold'>{playersObj.name}</td>
                                <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-warning me-4'}>Undecided</button></td>
                            </tr>:playersObj[theGame] == "Not Playing"?<tr key={playersObj._id}>
                                <td className='fw-bold'>{playersObj.name}</td>
                                <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-danger me-4'}>Not Playing</button >
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                            </tr>:playersObj[theGame] == "Playing"?<tr key={playersObj._id}>
                                <td className='fw-bold'>{playersObj.name}</td>
                                <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-success me-4'}>Playing</button>
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                    <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                            </tr>:null
                            

                            
                            : game2 ? playersObj[theGame] == "Undecided"?<tr key={playersObj._id}>
                                {console.log("yoyo")}
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-warning me-4'}>Undecided</button></td>
                        </tr>:playersObj[theGame] == "Not Playing"?<tr key={playersObj._id}>
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-danger me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                        </tr>:playersObj[theGame] == "Playing"?<tr key={playersObj._id}>
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-success me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                        </tr>:null
                            
                            
                            
                            : game3 ? playersObj[theGame] == "Undecided"?<tr key={playersObj._id}>
                                {console.log("yoyoyo")}
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-warning me-4'}>Undecided</button></td>
                        </tr>:playersObj[theGame] == "Not Playing"?<tr key={playersObj._id}>
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-light me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-danger me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                        </tr>:playersObj[theGame] == "Playing"?<tr key={playersObj._id}>
                            <td className='fw-bold'>{playersObj.name}</td>
                            <td><button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Playing") }} className={'btn btn-success me-4'}>Playing</button>
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Not Playing") }} className={'btn btn-light me-4'}>Not Playing</button >
                                <button onClick={() => { DatabaseCall(playersObj._id, playersObj.name, playersObj.position, theGame, "Undecided") }} className={'btn btn-light me-4'}>Undecided</button></td>
                        </tr>:null:null}</React.Fragment>
                    })
                }
            </tbody>
        </table>
    </>
}
export default Game