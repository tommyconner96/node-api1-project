import React, { useState, useEffect } from 'react'
import { initialState } from './App'
import axios from 'axios'


function EditUser({id}) {
  const [user, setUser] = useState({
  })
  const [submit, setSubmit] = useState(false)

  const [editing, setEditing] = useState(false)

useState(() => {
  setEditing(false)
  setSubmit(false)
},[submit])

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
    .put(`http://localhost:8080/api/users/${id}`, user)
    .then(res => console.log(res.data))
    window.location.reload()
  }


  if(editing == true){ 
    return (
        <div className="edit-user">
        <form onSubmit={onSubmit}>
          <legend>Edit User</legend>
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
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      )} else return <div>
          <button onClick={() => {
            setEditing(true)
            setSubmit(true)
            }} >Edit User</button>
      </div>
}
  
  export default EditUser