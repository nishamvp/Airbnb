import React, { useState } from 'react'

const PhotoGallery = ({ place }) => {
  const [showMorePhotos, setShowMorePhotos] = useState(false)

  if (showMorePhotos) {
    return (
      <div className="absolute inset-0 ">
        <div className="p-8 grid gap-4 bg-black justify-center text-white ">
          <div className="flex justify-between ">
            <h2 className="text-xl">{place.title}</h2>
            <button
              onClick={() => setShowMorePhotos(false)}
              className="flex bg-gray-600 rounded-2xl p-2 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Close Photos</p>
            </button>
          </div>
          {place?.photos &&
            place.photos.map((photo) => (
              <div>
                <img src={`http://localhost:3000/uploads/${photo}`} alt="" />
              </div>
            ))}
        </div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-[2fr,1fr]  mt-4 gap-2 rounded-2xl overflow-hidden ">
      <div className="flex">
        <img
          onClick={() => setShowMorePhotos(true)}
          className=" aspect-square object-cover cursor-pointer "
          src={`http://localhost:3000/uploads/${place.photos[0]}`}
          alt=""
        />
      </div>

      <div className="  relative grid gap-2 ">
        {place.photos?.[1] && (
          <img
            onClick={() => setShowMorePhotos(true)}
            className=" aspect-square object-cover "
            src={`http://localhost:3000/uploads/${place.photos[1]}`}
            alt=""
          />
        )}
        {place.photos?.[2] ? (
          <button onClick={() => setShowMorePhotos(true)}>
            <img
              className=" aspect-square object-cover "
              src={`http://localhost:3000/uploads/${place.photos[2]}`}
              alt=""
            />
          </button>
        ) : (
          <p className=" aspect-square object-cover flex justify-center items-center">
            <svg
              fill="#000000"
              width="3rem"
              height="3rem"
              viewBox="0 0 32 32"
              id="icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{'.cls-1{fill:none;}'}</style>
              </defs>
              <title>{'no-image'}</title>
              <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />
              <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />
              <rect
                id="_Transparent_Rectangle_"
                data-name="&lt;Transparent Rectangle&gt;"
                className="cls-1"
                width={32}
                height={32}
              />
            </svg>
          </p>
        )}

        {place.photos[2] && (
          <button
            onClick={() => setShowMorePhotos(true)}
            className=" inline-flex absolute  bottom-2 right-2 bg-white rounded-2xl px-3 py-1 gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <p>Show more photos</p>
          </button>
        )}
      </div>
    </div>
  )
}

export default PhotoGallery
