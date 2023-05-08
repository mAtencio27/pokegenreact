import React from "react"
import { Link } from "react-router-dom"
import triangle from '../Assets/Page1/triangle.png'
import centerPhoto from '../Assets/Page1/main.png'
import character from '../Assets/Page1/character.png'
import Header from "./Header"
import News from "./News"

const Landing = () => {
    return(<div>
        <div className="containerLanding">
            <div className="containerBG">
            <Header/>
                {/* <img src={triangle} className="landingBG"></img> */}
                <div className="generateBarRight">
                    Generate 
                </div>
                <div className="generateBarLeft">
                    ECO-POKEMON
                </div>
                <div className="centerPhotoContainer">
                    <img className="centerPhoto" src={centerPhoto}></img>
                    <h2 className="newsHeader">NEWS</h2>
                    <News/>
                </div>
                
            </div>
            <div className="generateBlock">
                <div className="characterContainer">
                    <img className="character" src={character}></img>
                    <div className="conceptStuff">
                        <h1 className="ecoHead">ECO-POKE CONCEPT</h1>
                        <div className="ecoHead2container">
                            <h2 className="ecoHead2">lorum ipsum more stuff</h2>
                            <h2 className="ecoHead2">lorum ipsum</h2>
                            <h2 className="ecoHead2">lorum ipsum more stuff</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* <Link to="/Home">Next</Link> */}
        </div>
        </div>)
}

export default Landing