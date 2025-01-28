import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'

const UserForm = ({closeForm, setUsers, user}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  })

  useEffect(() => {
    if (user) {
      // If user data is passed, populate the form fields for editing
      setFormData({
        name: user.name,
        email: user.email,
        department: user.department || '',
      })
    }
  }, [user])

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (user) {
      // If we are editing a user, send a PUT request
      try {
        const updatedUser = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          {...user, ...formData},
        )
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === updatedUser.data.id ? updatedUser.data : u,
          ),
        )
        closeForm() // Close the form after submitting
      } catch (error) {
        console.error('Error updating user:', error)
      }
    } else {
      // If we are adding a new user, send a POST request
      try {
        const newUser = await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          formData,
        )
        setUsers(prevUsers => [...prevUsers, newUser.data])
        closeForm() // Close the form after submitting
      } catch (error) {
        console.error('Error adding user:', error)
      }
    }
  }

  return (
    <div className='main-con'>
      <div className='user-form'>
        <h3>{user ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttons-con">
            <button type='submit'>Submit</button>
            <button type='button' onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
