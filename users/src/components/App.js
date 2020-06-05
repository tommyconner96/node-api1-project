import React, { useEffect } from 'react'
import UserCard from './UserCard'
import EditUser from './EditUser'
import AddUser from './AddUser'
import styled from 'styled-components'


export const initialState = [{
  id: '',
  name: '',
  bio: ''
},]

function App() {
  return (
    <AppContainer>
      <Header>User List</Header>
      <AddUser />
      <UserCard />
      <br />
      <br />
    </AppContainer>

  )
}

const AppContainer = styled.div`
    border-radius: 5px;
    padding-top:1em;
    background-color:#CEB7B3;
    width:80%;
    margin: 0 auto;
    `

const Header = styled.div`
color: #333232;
transition-duration: 0.4s;
width: 100%;
font-size: 3em;
text-align:center;
border-bottom: solid 2px #333232;
:hover {
  font-size: 3.5em;
}
`

export default App
