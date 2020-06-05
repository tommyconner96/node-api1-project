import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'


function EditUser({id}) {
  const [user, setUser] = useState({
  })
  const [submit, setSubmit] = useState(false)

  const [editing, setEditing] = useState(false)


useEffect(() => {
  // axios
  // .get(`http://localhost:8080/api/users`)
  // .then(res => {
  //     console.log(res.data)
  //     setUser(res.data)
  // })
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
    e.preventDefault()
    axios
    .put(`http://localhost:8080/api/users/${id}`, user)
    .then(res => console.log(res.data))
    setSubmit(true)
    setEditing(false)
    window.location.reload()
  }


  if(editing === true){ 
    return (
        <div className="edit-user">
        <form onSubmit={onSubmit}>
          <legend><h2>Edit User</h2></legend>
          <label>
            <h3>Name:</h3>
              <StyledInput
              type='text'
              name='name'
              onChange={onChange}
              value={user.name}
            />
          </label>
          <label>
            <h3>Bio:</h3>
              <StyledInput
              type='text'
              name='bio'
              onChange={onChange}
              value={user.bio}
            />
          </label>
          <div className="button-row">
            <br />
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
      )} else return <div>
          <Button onClick={() => {
            setEditing(true)
            }} >Edit User</Button>
      </div>
}

const Button = styled.button`
transition-duration: 0.4s;
padding-left:1em;
padding-right:1em;
padding-top:.5em;
padding-bottom:.5em;
margin-bottom:.5em;
border-radius: .5em;
    :hover {
    background-color: green;
    color: white;
  }
`
const StyledInput = styled.input`
:focus {
  background-color:#9ABCA7;
  color: black;
  border: 3px solid #555;
}
`
  
  export default EditUser