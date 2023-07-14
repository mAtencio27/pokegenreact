import React from "react"
import { Link } from "react-router-dom"
import triangle from '../Assets/Page1/triangle.png'
import centerPhoto from '../Assets/Page1/main.png'
import footer from '../Assets/Page1/footer.png'
import character from '../Assets/Page1/character.png'
import Header from "./Header"
import News from "./News"
import GenerateBar from "./GenerateBar"

const Landing = ({setLocation}) => {
    return(<div>
        <div className="containerLanding">
            <div className="containerBG">
            <Header/>
            <GenerateBar/>
                {/* <img src={triangle} className="landingBG"></img> */}
                {/* <div className="generateBarRight">
                    Generate 
                </div> */}
                <div className="generateBarLeft">
                    EARTH-SHIELD
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
                        <div className="generateHead"></div>
                        <h1 className="ecoHead">EARTH-SHIELD</h1>
                        <div className="ecoHead2container">
                            <h2 className="ecoHead2">lorum ipsum more stuff</h2>
                            <h2 className="ecoHead2">lorum ipsum</h2>
                            <h2 className="ecoHead2">lorum ipsum more stuff</h2>
                        </div>
                        <div className="ecoParagraphContainer">
                            <p className="ecoParagraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend, risus vitae bibendum posuere, sapien mi pretium elit, vel consequat velit ex nec magna.</p>
                        </div>
                        <div className="generateButtonContainer">
                            {/* <button className="generateButton">GENERATE</button> */}
                            <Link to="/Home" className="generateButton" onClick={()=>{setLocation(1)}}>GENERATE</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerContainer">
                <img src={footer} className="footer"></img>
            </div>
        </div>
        </div>)
}

export default Landing