import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { initialState } from './App'
import styled from 'styled-components'


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
    .then(res => {
      console.log(res.data)
      window.location.reload()
    })
    // .then(() => {
    //   setUser({
    //     name:'',
    //     bio:'',
    //   })
    // })
  }


  return (
    <StyledAdd>
      <form onSubmit={onSubmit}>
        <legend><h2>Add User</h2></legend>
        <label>
          <h3>Name: </h3>
            <StyledInput
            type='text'
            name='name'
            onChange={onChange}
            value={user.name}
          />
        </label>
        <br />
        <br />
        <label>
          <h3>Bio: </h3>
            <StyledInput
            type='text'
            name='bio'
            onChange={onChange}
            value={user.bio}
          />
        </label>
        <br /><br />
        <div className="button-row">
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </StyledAdd>
  )
}

const StyledAdd = styled.div`
transition-duration: 0.4s;
padding-top:1em;
background-color:#9ABCA7;
border: 1px solid black;
border-radius:10px;
width: 500px;
height: auto;
margin: 0 auto;
margin-top: 2em;
text-align: center;
padding-bottom:1em;
:hover {
  font-size: 1.02em;
  width: 503px;
}
`

const StyledInput = styled.input`
:focus {
  background-color:lightgreen;
  border: 3px solid #555;
}
`
const Button = styled.button`
margin-top:.25em;
transition-duration: 0.4s;
padding-left:1em;
padding-right:1em;
padding-top:.5em;
padding-bottom:.5em;
margin-bottom:.5em;
border-radius: .5em;
    :hover {
    background-color: lightgreen;
    color: black;
  }
`

export default AddUser