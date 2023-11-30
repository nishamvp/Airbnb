import axios from 'axios'
import React, { useState } from 'react'
import { differenceInDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const BookingPanel = ({ place }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState()
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const navigate = useNavigate()
  let numberOfNights = 0
  let totalPrice = 0

  const bookPlace = async () => {
    try {
      const bookingData = {
        place: place._id,
        checkIn,
        checkOut,
        guests,
        name,
        phone,
        numberOfNights,
        totalPrice,
      }
      const { data } = await axios.post('/auth/book-place', bookingData)
      if (data) navigate(`/account/bookings/${data._id}`)
    } catch (error) {
      window.alert(error)
    }
  }

  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn))
    totalPrice = place.price * numberOfNights
  }
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md ">
      <h4 className="text-md flex justify-center mb-2">
        <span className="font-semibold">Price: ${place.price}/per night</span>
      </h4>
      <div className="border rounded-2xl    ">
        <div className="flex gap-3    border-b">
          <label className="border-r  px-6 py-2 ">
            Check-In:
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </label>
          <label className=" px-6 py-2 ">
            Check-out:
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </label>
        </div>
        <div className=" px-6 py-2 ">
          <label>
            Number of Guests:
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </label>
          {checkIn && checkOut && (
            <div>
              <label>
                Your Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <div className="mt-4">
                <h4 className="text-xs font-semibold">
                  Total: {numberOfNights}(number of nights) X {place.price}
                  (price per night) = {numberOfNights * place.price}{' '}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <button onClick={bookPlace} className="primary mt-3">
        Book this Place
      </button>
    </div>
  )
}

export default BookingPanel
