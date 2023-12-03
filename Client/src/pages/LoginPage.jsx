import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../contexts/userContext'
const LoginPage = () => {
  const { setUser } = useContext(userContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      })
      const data = await response.data
      if (data) {
        setUser(data)
        window.location.href="/"
      }
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

 
  return (
    <div className="mt-4 grow flex items-center justify-around  ">
      <div className="mb-32 p-8 border border-gray-100 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto  p4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-4">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link
              className=" underline text-black hover:font-bold"
              to={'/register'}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
