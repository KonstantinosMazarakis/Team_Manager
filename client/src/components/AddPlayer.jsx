import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory } from "react-router-dom";

const AddPlayers = () =>{

    let [name,setName] = useState("")
    let [position,setPosition] = useState("")
    let[validations,setValidations] = useState({})
    const history = useHistory()

    const AddAuthor = (e) =>{
        e.preventDefault()

        let formInfo = {name,position};

        axios.post("http://localhost:8000/api/teamManager",formInfo)
        .then(res=>{
            console.log(res);
            if(res.data.error){
                setValidations(res.data.error.errors)
            }else{
                history.push('/')
            }
        })
        .catch(err=>{
            console.log("error 404... no API found." + err)
        })
    }




    return<>
    <div>
    <Link to="/">List </Link>|
    <Link to="/addPlayer" className="fw-bold"> Add Player</Link>
    </div>
    <div className='w-25 m-auto'>
        <form onSubmit={AddAuthor}>
        <h2>Add Player</h2>
        <p className='text-danger'>{validations.name?.message}</p>
        <div className='m-2'>
        <label className="form-label">Player Name: </label>
        <input className="form-control" type="text" onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className='m-2 mb-4'>
        <label className="form-label">Preferred Position: </label>
        <input className="form-control" type="text"  onChange={(e)=>{setPosition(e.target.value)}}/>
        </div>
        <input type="submit" value="ADD" className='btn btn-success' />
        </form>
    </div>
    </>
}
export default AddPlayers