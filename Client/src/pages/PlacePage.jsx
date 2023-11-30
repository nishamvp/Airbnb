import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Address from '../components/Address'
import PhotoGallery from '../components/PhotoGallery'
import BookingPanel from '../components/BookingPanel'

const PlacePage = () => {
  const [place, setPlace] = useState(null)
 
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      axios.get(`/auth/place/${id}`).then(({ data }) => {
        setPlace(data)
      })
    }
  }, [id])

  return (
    <div>
      {place && (
        <div className="bg-gray-50 -mx-8 px-5 py-8 mt-5  shadow-slate-100 border-t-2">
          <h1 className="text-2xl font-semibold">{place.title}</h1>
          <Address place={place} />
          <PhotoGallery place={place} />
          <div className="flex mt-4  mb-4">
            <div>
              <h2 className="font-semibold text-2xl ">Description</h2>
              <h4 className="text-md mt-1">{place.description}</h4>
              <div className="mt-3">
                Check-in: {place.checkIn} <br />
                Check-out: {place.checkOut} <br />
                Max number of guests: {place.maxGuests}
              </div>
            </div>
            <BookingPanel place={place}/>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <h2 className="font-semibold text-2xl ro">Extra Info</h2>
            <h4 className="mt-1  text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlacePage
