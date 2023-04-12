import React from 'react'
import { Link } from 'react-router-dom'

const Render = () => {
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
