import React from "react"
import { Link } from "react-router-dom"
import triangle from '../Assets/Page1/triangle.png'
import centerPhoto from '../Assets/Page1/main_visual.png'
import footer from '../Assets/Page1/footer_2.png'
import character from '../Assets/Page1/character.png'
import Header from "./Header"
import News from "./News"
import GenerateBar from "./GenerateBar"

const Landing = ({setLocation}) => {
    return(<div>
        <div className="containerLanding">
        
            <div className="containerBG">
                <GenerateBar setLocation={setLocation}/>
                <Header/>
                
                    {/* <img src={triangle} className="landingBG"></img> */}
                    {/* <div className="generateBarRight">
                        Generate 
                    </div> */}
                    <div className="generateBarLeft">
                        EARTH-SHIELD
                    </div>
                    <div className="centerPhotoContainer">
                        <img className="centerPhoto" src={centerPhoto}></img>
                    </div>
                    
                
            </div>
            <div className="generateBlock">
                <div className="characterContainer">
                    <img className="character" src={character}></img>
                    <div className="conceptStuff">
                        <div className="generateHead"></div>
                        <h1 className="ecoHead">EARTH-<br></br>SHIELD</h1>
                        <div className="ecoHead2container">
                            <h2 className="ecoHead2">世界を救うのはあなた!AIと共に</h2>
                            <h2 className="ecoHead2">未来の環境問題から地球を守る</h2>
                            <h2 className="ecoHead2">自分だけのシールダーを作ろう！</h2>
                        </div>
                        <div className="ecoParagraphContainer">
                            <p className="ecoParagraph">未来の環境問題に取り組むために、AIを使ってオリジナルの</p>
                            <p className="ecoParagraph">シールダーを作成できるサイトです。壁に展示してある環境を破壊する</p>
                            <p className="ecoParagraph">ブレーカーたちと戦うことができる能力を考え、自分だけの</p>
                            <p className="ecoParagraph">シールダーカードを作ろう！君が世界を救うかも！</p>
                        </div>
                        <div className="generateButtonContainerLanding">
                            {/* <button className="generateButton">GENERATE</button> */}
                            <Link to="/Home" className="generateButtonLanding" onClick={()=>{setLocation(1)}}>GENERATE</Link>
                        </div>
                    </div>
                </div>
                <div className="generateBlockBG"></div>
                <div className="footerContainer">
                    <img src={footer} className="footer"></img>
                </div>
            </div>

        </div>
        </div>)
}

export default Landing