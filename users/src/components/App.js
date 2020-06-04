import React, { useEffect } from 'react'
import UserCard from './UserCard'
import EditUser from './EditUser'
import AddUser from './AddUser'
import * as Styles from './Styles'

export const initialState = [{
  id: '',
  name: '',
  bio: ''
},]

function App() {
  return (
    <Styles.AppContainer>
      <UserCard />
      <AddUser />
    </Styles.AppContainer>

  )
}

export default App
