// src/components/UserList.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserForm from './UserForm/index.js'
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [editingUser, setEditingUser] = useState(null) // Store the user being edited
  const [showForm, setShowForm] = useState(false) // Show the form for adding/editing

  const usersPerPage = 5

  const fetchUsers = async page => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`,
      )
      setUsers(response.data)
      setTotalPages(Math.ceil(100 / usersPerPage)) // JSONPlaceholder has 100 users
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  const handleAddUser = () => {
    setEditingUser(null) // Reset the editing user for adding a new one
    setShowForm(true)
  }

  const handleEditUser = user => {
    setEditingUser(user) // Set the user to be edited
    setShowForm(true) // Show the form for editing
  }

  const handleDeleteUser = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      setUsers(users.filter(user => user.id !== id))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const closeForm = () => {
    setShowForm(false) // Close the form without making changes
  }

  return (
    <div>
      <div className='addBtnCon'>
        <button onClick={handleAddUser} className='addUserButton'>
          Add User
        </button>
      </div>
      {showForm && (
        <UserForm
          closeForm={closeForm}
          setUsers={setUsers}
          user={editingUser}
        />
      )}

      <div className='main-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className='table-buttons edit-button'
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className='table-buttons delete-button'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3'>No users available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='pagination'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className='page-content'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserList
