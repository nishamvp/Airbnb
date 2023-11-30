import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PhotoAdd from '../components/PhotoAdd'
import Perks from '../components/perks'
import AccountNav from '../components/AccountNav'
import { useNavigate, useParams } from 'react-router-dom'

const PlaceFormPage = () => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])

  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxtGuests] = useState(1)
  const [price,setPrice] = useState(100)
  const { id } = useParams()

  const navigate = useNavigate('')
  const InputHeaderAndDesc = (h2, p) => {
    return (
      <>
        <h2 className="text-xl mt-4">{h2}</h2>
        <p className="text-gray-500 text-sm">{p}</p>
      </>
    )
  }

  if (id) {
    useEffect(() => {
      axios.get(`/auth/place/${id}`).then(({ data }) => {
        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxtGuests(data.maxGuests)
        setPrice(data.price)
      })
    }, [id])
  }

  const savePlace = async (e) => {
    e.preventDefault()
    let placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    }
    if (!id) {
      const { data } = await axios.post('/auth/place', ...placeData)
      if (data) {
        navigate('/account/places')
      }
    } else {
      const { data } = await axios.put(`/auth/place`, { id, ...placeData })
      if (data) {
        navigate('/account/places')
      }
    }
  }

  return (
    <div>
      <AccountNav />
      <form>
        {InputHeaderAndDesc(
          'Title',
          'Title for your place,should be short and catchy as in advertisment',
        )}

        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {InputHeaderAndDesc('Address', 'Address to your place.')}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {InputHeaderAndDesc('Photos', 'more=better')}
        <PhotoAdd addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {InputHeaderAndDesc('Description', 'description of the place')}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {InputHeaderAndDesc('Perks', 'select all the perks of your place')}
        <Perks selected={perks} onChange={setPerks} />
        {InputHeaderAndDesc('Extra info', 'house rules,etc')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {InputHeaderAndDesc(
          'Check in&out times',
          'add check in and out times,remember to have some time window for cleaning the room between guests',
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-2 gap-2">
          <div className="">
            <h2>Check&nbsp;in</h2>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="">
            <h2>Check&nbsp;out</h2>
            <input
              type="text"
              placeholder="24:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="">
            <h2>Maximum&nbsp;guests</h2>
            <input
              type="number"
              placeholder="3"
              value={maxGuests}
              onChange={(e) => setMaxtGuests(e.target.value)}
            />
          </div>
          <div className="">
            <h2>Price</h2>
            <input
              type="number"
              placeholder="3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button onClick={savePlace} className="primary my-4">
          Save
        </button>
      </form>
    </div>
  )
}

export default PlaceFormPage
