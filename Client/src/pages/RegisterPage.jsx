import React, { useState } from 'react'
import { Link, Navigate,  } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/register', {
        name,
        email,
        password,
      })
      const data = await response.data
      if (data) {
       <Navigate to={"/login"}/>
      }
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around  ">
      <div className="mb-32 p-8 border border-gray-100 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center mb-4 ">Register</h1>
        <form className="max-w-md mx-auto  p4" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="username"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary mt-4">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account ?{' '}
            <Link
              className=" underline text-black hover:font-bold"
              to={'/login'}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
