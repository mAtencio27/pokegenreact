import React from "react"
import { Link } from "react-router-dom"
import triangle from '../Assets/Page1/triangle.png'
import centerPhoto from '../Assets/Page1/main.png'
import Header from "./Header"

const Landing = () => {
    return(<div>
        <div className="containerLanding">
            <div className="containerBG">
            <Header/>
                {/* <img src={triangle} className="landingBG"></img> */}
                <div className="generateBarRight">
                    Generate 
                </div>
                <div className="centerPhotoContainer">
                    <img className="centerPhoto" src={centerPhoto}></img>
                </div>
            </div>
            <Link to="/Home">Next</Link>
        </div>
        </div>)
}

export default Landing