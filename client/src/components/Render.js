import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Render = () => {

const [photos, setPhotos] = useState([])

const renderScript = async() => {
  const res = await fetch("/render")
  return
}

const fetchPhotos = async(e) => {
    const res = await fetch("/photos")
    const data = await res.json()
    //console.log (data)
    //console.log(data.response)
    return data.response
  }

  useEffect(() => {
    const fetchData = async() => {
      const renderedResponse = await renderScript()
      const res = await fetchPhotos();
      const dataArray = res.map((encoded64) => {return `data:image/jpeg;base64,${encoded64}`})
      setPhotos(dataArray);
      //setPhotos(res)
      //console.log(res)
    };

    fetchData()
  }, [])

  return (
    <div>
      <button onClick={()=>{console.log(photos)}}>Tester boy</button>
      {photos.map(url => (
        <img src={url} key={url} alt="photo" />
      ))}
      <div className='navButtons'>
        <Link to="/ImageUpload">Back</Link>
        <Link to="/Render">Next</Link>
      </div>
    </div>
  )
}

export default Render
