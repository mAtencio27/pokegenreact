import React from "react"
import { Link } from "react-router-dom"
import triangle from '../Assets/Page1/triangle.png'

const Landing = () => {
    return(<div>
        <div className="containerLanding">
            <div className="containerBG">
                {/* <img src={triangle} className="landingBG"></img> */}
                <div className="generateBarRight">
                    Generate 
                </div>
            </div>
            <Link to="/Home">Next</Link>
        </div>
        </div>)
}

export default Landing