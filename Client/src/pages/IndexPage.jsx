import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const [places, setPlaces] = useState('')
  useEffect(() => {
    axios.get('/auth/allplaces').then(({ data }) => {
      setPlaces(data)
    })
  }, [])
  return (
    <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-14   ">
      {places &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} className="">
            <div className="bg-gray-500 rounded-2xl   ">
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`http://localhost:3000/uploads/${place.photos[0]}`}
                alt=""
              />
            </div>
            <h3 className='font-bold mt-3 '>{place.address}</h3>
            <h2 className='text-sm truncate'>{place.title}</h2>
            <h2 ><span className='font-bold'>${place.price}</span> per night</h2>
          </Link>
        ))}
    </div>
  )
}

export default IndexPage
