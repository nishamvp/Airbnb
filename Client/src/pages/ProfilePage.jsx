import React, { useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../contexts/userContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav'

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(userContext)
  const [redirect, setRedirect] = useState(null)

  if (!ready) return 'Loading...'

  const logout = async () => {
    const response = await axios.post('/auth/logout')
    if (response.data) {
      setRedirect('/')
      setUser(null)
    } else {
      alert('Something went wrong')
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  if (ready && !user) return <Navigate to={'/login'} />

  return (
    <div>
      <AccountNav />
      <div className="m-8 ">
        <div className="flex items-center justify-center mt-4 ">
          <div className=" rounded-full bg-gray-500 text-white overflow-hidden m-5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14 relative top-1  "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-center  ">
          <button onClick={logout} className="primary max-w-xs mx-auto ">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
