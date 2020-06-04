import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { initialState } from './App'
import UserCard from './UserCard'


function AddUser() {
  const [user, setUser] = useState(initialState)
  const [submit, setSubmit] = useState(false)


  const onChange = (e) => {
    e.persist()
    e.preventDefault()
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    console.log(user)
    setSubmit(true)
    e.preventDefault()
    axios
    .post(`http://localhost:8080/api/users/`, user)
    .then(res => console.log(res.data))
    // .then(() => {
    //   setUser({
    //     name:'',
    //     bio:'',
    //   })
    // })
  }


  return (
    <div className="add-user">
      <form onSubmit={onSubmit}>
        <legend>Add User</legend>
        <label>
          Name:
            <input
            type='text'
            name='name'
            onChange={onChange}
            value={user.name}
          />
        </label>
        <label>
          Bio:
            <input
            type='text'
            name='bio'
            onChange={onChange}
            value={user.bio}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser