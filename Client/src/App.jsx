import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './contexts/userContext'
import PlacesPage from './pages/PlacesPage'
import ProfilePage from './pages/ProfilePage'
import PlaceFormPage from './pages/PlaceFormPage'
import React from 'react'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
axios.defaults.baseURL = 'http://192.168.166.108:3000'
axios.defaults.withCredentials = true

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route element={<Layout />}>
        <Route index path="/" element={<IndexPage />} />
        <Route index path="/place/:id" element={<PlacePage />} />
        <Route path="/account/" element={<ProfilePage />} />
        <Route path="/account/places/" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlaceFormPage />} />
        <Route path="/account/places/new/:id" element={<PlaceFormPage />} />
        <Route path="/account/bookings/" element={<BookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </React.Fragment>,
  ),
)
function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  )
}
export default App
