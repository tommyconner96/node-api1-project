import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { initialState } from './App'

function UserCard() {

    const [user, setUser] = useState(initialState)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        setUpdate(false)
        axios
            .get(`http://localhost:8080/api/users`)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })
    }, [update])

    const DeleteUser = (id) => {
        axios
            .delete(`http://localhost:8080/api/users/${id}`)
            .then(res => console.log(res.data))
        setUpdate(true)
    }




    return (
        <div className="card">
            <div>
                {user.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Bio: {user.bio}</p>
                            <p>id: {user.id}</p>
                            <button onClick={() => DeleteUser(user.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default UserCard