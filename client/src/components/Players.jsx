import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Players = () =>{
    let [report, setReport] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/teamManager")
            .then(response => {

                //--------SORTING-----------------------
                response.data.results.sort(function(a, b) {
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
    },[])


    const deleteProduct = (id) =>{
        axios.delete(`http://localhost:8000/api/teamManager/${id}`)
                .then(res=>{
                    let filteredList = report.filter((playersObj)=>{
                        return playersObj._id != id
                    })
                    setReport(filteredList)
                })
                .catch(err=>{
                    console.log("error 404... no API found." + err)
                })
        
    }


    return<>
    <div>
    <Link to="/" className="fw-bold">List </Link>|
    <Link to="/addPlayer"> Add Player</Link>
    </div>
    <table className="table table-striped w-auto mx-auto" >
        <thead>
            <tr>
                <th>Players Name</th>
                <th>Preferred Position</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {
            report.map((playersObj)=>{
                return<tr key={playersObj._id}>
                    <td>{playersObj.name}</td>
                    <td>{playersObj.position}</td>
                    <td><button onClick={()=>{deleteProduct(playersObj._id)}} className='btn btn-danger'>Delete</button></td>
                </tr>
            })
        }
        </tbody>
    </table>

    </>
}
export default Players