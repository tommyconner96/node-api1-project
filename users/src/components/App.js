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
    <div className="App">
      <UserCard />
      <EditUser />
      <AddUser />
    </div>
  )
}

export default App
