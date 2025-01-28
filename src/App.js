import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserList from './Components/UserList.js'
import ErrorBoundary from './Components/ErrorBoundary'
import './App.css'

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className='container'>
          <h1>User Management Dashboard</h1>
          <Routes>
            <Route path='/' element={<UserList />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
