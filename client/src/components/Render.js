import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Render = () => {

  const [photos, setPhotos] = useState([])

const fetchPhotos = async(e) => {
    const res = await fetch("/photos")
    const data = await res.json()
    //console.log (data)
    console.log(data)
    return
  }

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetchPhotos();
      const resData = await res.json()
      setPhotos(resData)
    };

    console.log(photos)
    fetchData()
  }, [])

  return (
    <div>
      <div className='navButtons'>
        <Link to="/ImageUpload">Back</Link>
        <Link to="/Render">Next</Link>
      </div>
    </div>
  )
}

export default Render
