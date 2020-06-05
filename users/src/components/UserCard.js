import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { initialState } from './App'
import EditUser from './EditUser'
import styled from 'styled-components'

function UserCard(props) {

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
        <CardContainer>
            <Card>
                {user.map((user) => {
                    return (
                        <CardStyle key={user.id}>
                            <H2>Name: {user.name}</H2>
                            <p>Bio: {user.bio}</p>
                            <p>id: {user.id}</p>
                            <Button onClick={() => DeleteUser(user.id)}>Delete</Button>
                            <EditUser id={user.id} />
                        </CardStyle>
                    )
                })}
            </Card>
        </CardContainer>
    )
}

const CardContainer = styled.div`
display: flex;
`
const Card = styled.div`
margin: 0 auto;
`
const CardStyle = styled.div`
transition-duration: 0.4s;
background-color:#F7B2AD;
border: 1px solid black;
border-radius:10px;
width: 500px;
height: auto;
margin: 0 auto;
margin-top: 2em;
text-align: center;
padding-bottom:1em;
    :hover {
        font-size:1.02em;
        width: 502px;
    }
`
const H2 = styled.h2`
font-size:1.5em;
`

const Button = styled.button`
transition-duration: 0.4s;
padding-left:1em;
padding-right:1em;
padding-top:.5em;
padding-bottom:.5em;
margin-bottom:.5em;
border-radius: .5em;
    :hover {
    background-color: red;
    color: white;
  }
`

export default UserCard