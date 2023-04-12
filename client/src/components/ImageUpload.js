import React from 'react'
import { Link } from 'react-router-dom'

const ImageUpload = () => {

  const fetchPrompts = async(e) => {
    const res = await fetch("/prompts")
    const data = await res.json()
    //console.log (data)
    console.log(data.response)
    return
  };

  return (
    <div>ImageUpload
      <button value={3} onClick={(e)=>{fetchPrompts(e)}}> Return prompts </button>
      <div className='navButtons'>
          <Link to="/">Back</Link>
          <Link to="/Render">Next</Link>
      </div>
    </div>
  )
}
export default ImageUpload