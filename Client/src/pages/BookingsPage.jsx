import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

const BookingsPage = () => {
  const [bookingLists, setBookingLists] = useState(null)
  useEffect(() => {
    axios
      .get('/auth/booked-places')
      .then(({ data }) => {
        console.log(data)
        setBookingLists(data)
      })
      .catch((error) => {
        console.error('Error fetching booked places:', error)
      })
  }, [])
  return (
    <div>
      <AccountNav />
      <div className=''>
        {bookingLists &&
          bookingLists.map((bookingList) => <div>name:{bookingList.name}</div>)}
      </div>
    </div>
  )
}

export default BookingsPage
