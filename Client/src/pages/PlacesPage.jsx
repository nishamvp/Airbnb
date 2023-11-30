import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const PlacesPage = () => {
  const [places, setPlaces] = useState('')

  useEffect(() => {
    axios.get('/auth/place').then(({ data }) => {
      if (data) setPlaces(data)
    })
  }, [])

  return (
    <>
      <AccountNav />
      <div className=" m-8">
        <div className="text-center">
          <Link
            to={'/account/places/new'}
            className="inline-flex bg-primary rounded-full text-white py-2 px-6 cursor-pointer gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p>Add Places</p>
          </Link>
        </div>
      </div>
      {places &&
        places.map((place) => {
          return (
            <Link to={`/account/places/new/${place._id}`} className="flex bg-gray-200 p-4 rounded-2xl gap-4 mb-3 " key={place._id}>
              <div className='w-36 h-auto  object-cover   shrink-0 '>
                <img className='rounded-xl' src={`http://localhost:3000/uploads/${place.photos[0]}`} alt="" />
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <h2 className='text-sm mt-2'>{place.description}</h2>
              </div>
            </Link>
          )
        })}
    </>
  )
}

export default PlacesPage
