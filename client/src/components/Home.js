import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Header_language_switch from './Header_language_switch';
import footer from '../Assets/Page1/footer_2.png'

//ELEMENT IMPORTS
import dark from '../Assets/elements/dark_element.png'
import electric from '../Assets/elements/electric_element.png'
import fairy from '../Assets/elements/fairy_element.png'
import fighting from '../Assets/elements/fighting_element.png'
import fire from '../Assets/elements/fire_element.png'
import grass from '../Assets/elements/grass_element.png'
import neutral from '../Assets/elements/neutral_element.png'
import psychic from '../Assets/elements/psychic_element.png'
import water from '../Assets/elements/water_element.png'

const Home = ({pokeJson, setPokeJson, setLocation, japanese, setJapanese, location}) => {

  const [subjectString, setSubjectString] = useState([]);
  const [elementString, setElementString] = useState("");

  useEffect(()=>{
    setPokeJson([]);
  },[])


  //THIS IS GENERATING THE JSON SCRIPT AND SAVING THE JSON TO STATE
  const generateScript = async(e) => {
    //🇺🇸🇯🇵 this is where we are going to switch and make a us endpoint and jp one
    let endpoint = null
    if(japanese === true){
      console.log ("japanese true endpoint")
      // local_test_endpoint = `http://localhost:8000/generate?element=${elementString}&subject=${subjectString}&japanese=${true}`
      endpoint = `https://pokegen-api.onrender.com/generate?element=${elementString}&subject=${subjectString}&japanese=${true}`
    }else{
      console.log ("english true endpoint")
      // local_test_endpoint = `http://localhost:8000/generate?element=${elementString}&subject=${subjectString}&japanese=${false}`
      endpoint = `https://pokegen-api.onrender.com/generate?element=${elementString}&subject=${subjectString}&japanese=${false}`
    }
    //🏠🏠🏠🏠🏠🏠 LOCAL 🏠🏠🏠🏠🏠
    const res = await fetch(endpoint)
    //const res = await fetch(`http://localhost:8000/generate?element=${elementString}&subject=${subjectString}`)
    //🏠🏠🏠🏠🏠🏠 LOCAL 🏠🏠🏠🏠🏠
    //🏩🏩🏩🏩🏩🏩 PRODUCTION 🏩🏩🏩🏩🏩
    //const res = await fetch(`https://pokegen-api.onrender.com/generate?element=${elementString}&subject=${subjectString}`)
    //🏩🏩🏩🏩🏩🏩 PRODUCTION 🏩🏩🏩🏩🏩
    let responseData = await res.json()
    setPokeJson(responseData.data.cards)
    return responseData.data.cards
  };

  const clickHandler = async(e) => {
    setLocation(2);
    try {
      const response = await generateScript(e);
      console.log(`This is the response ${response}`)
      console.log(response)
    }catch(error){

    }finally {
      return
    }
  };

  

  return (
    <div className='Home'>
      <div className='homeContainer'>
      {/* <Header japanese={japanese} setJapanese={setJapanese} location={location}/> */}
      <Header_language_switch japanese={japanese} setJapanese={setJapanese} location={location}/>
      <div className='homeContainerBG'>
          {/* <Header japanese={japanese} setJapanese={setJapanese}/> */}
          <div className='homeHeaderContainer'>
            <h1 className='typeKeywordHead'>TYPE & KEYWORD</h1>
            <p className='typeKeywordP'>シールダーの属性とキーワードを入力しよう</p>
            <div className='keywordEntryContainer'>
              <div className='keywordEntranceBar'>
                {japanese?'キーワードを入力':'ENTER KEYWORD'}
              </div>
            </div>
            <div className='keywordInputContainer'>
              <input className='keywordInput' placeholder={japanese?"例）リサイクル":"Ex. Recycle"} onChange={(e) => {setSubjectString(e.target.value)}}  type='text'></input>
            </div>
            <div className='elementSelectorContainer'>
              <div className='elementEntranceBar'>
                {japanese?"属性を選ぶ":"SELECT TYPE"}
              </div>
              <div className="generateElementBox" >
                  <div className={`generateElementTile${elementString === 'grass' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="grass">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={grass}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'> {japanese?'木':'TREE'} </p>
                        {/* <p className='buttonElementText'>木</p> */}
                      </div>
                    </div>
                  </div>
                  <div className={`generateElementTile${elementString === 'fire' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="fire">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={fire}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'> {japanese?"火":"FIRE"} </p>
                        {/* <p className='buttonElementText'>火</p> */}
                      </div>
                    </div>  
                  </div>
                  <div className={`generateElementTile${elementString === 'water' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="water">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={water}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'> {japanese?"水":"WATER"}</p>
                        {/* <p className='buttonElementText'>水</p> */}
                      </div>
                    </div>  
                  </div>
                  <div className={`generateElementTile${elementString === 'electric' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="electric">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={electric}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"エネルギー":"ENERGY"}</p>
                        {/* <p className='buttonElementText'>エネルギー</p> */}
                      </div>
                    </div>
                  </div>
                  <div className={`generateElementTile${elementString === 'psychic' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="psychic">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={psychic}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"マインド":"MIND"}</p>
                        {/* <p className='buttonElementText'>マインド</p> */}
                      </div>
                    </div>    
                  </div>
                  <div className={`generateElementTile${elementString === 'neutral' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="neutral">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={neutral}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"クリーン":"CLEAN"}</p>
                        {/* <p className='buttonElementText'>クリーン</p> */}
                      </div>
                    </div>  
                  </div>
                  <div className={`generateElementTile${elementString === 'fighting' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="fighting">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={fighting}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"保護":"PROTECT"}</p>
                        {/* <p className='buttonElementText'>保護</p> */}
                      </div>
                    </div>  
                  </div>
                  <div className={`generateElementTile${elementString === 'dark' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="dark">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={dark}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"恐れ":"FEAR"}</p>
                        {/* <p className='buttonElementText'>恐れ</p> */}
                      </div>
                    </div>  
                  </div>
                  <div className={`generateElementTile${elementString === 'fairy' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.currentTarget.dataset.value)}} data-value="fairy">
                    <div className='buttonElementContentDiv'>
                      <div className='buttonElementImageDiv'>
                          <img className='buttonElementImage' src={fairy}></img>
                      </div>
                      <div className='buttonElementTextDiv'>
                        <p className='buttonElementText'>{japanese?"スピリット":"SPIRIT"}</p>
                        {/* <p className='buttonElementText'>スピリット</p> */}
                      </div>
                    </div>    
                  </div>
                  {/* <div className={`generateElementTile${elementString === 'dragon' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="dragon">Dragon</div>
                  <div className={`generateElementTile${elementString === 'metal' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="metal">Metal</div> */}
              </div>
            </div>
            <div className='generateButtonContainer'>
              {/* {elementString ? <button className="generateScriptButton" value={subjectString} onClick={(e)=>{generateScript(e)}}> Generate Script </button>: <button className="generateScriptButton" value={subjectString} onClick={(e)=>{generateScript(e)}} disabled> Generate Script </button>} */}
              {elementString ? <Link to="/ImageUpload" className="generateScriptButton" value={subjectString} onClick={(e)=>{clickHandler(e)}}> {japanese? "スクリプトを生成する":"GENERATE SCRIPT"} </Link>: <Link to='/Home' className="generateScriptButtonDisabled" value={subjectString}> {japanese? "属性を選んで進む" :"Select an element to continue"} </Link>}
              {/* {<Link to="/ImageUpload" className="generateScriptButton" value={subjectString} onClick={(e)=>{generateScript(e); setLocation(2)}}> Generate Script </Link>} */}
              {/* {<Link to="/ImageUpload" className="generateScriptButton" value={subjectString} onClick={(e)=>{clickHandler(e)}}> Generate Script </Link>} */}
            </div>
            <div className='navButtons'>
                {/* <Link to="/">Back</Link> */}
                {/* <Link className="generateScriptButton" to="/ImageUpload" onClick={(e)=>{console.log(e)}}>Next</Link> */}
            </div>
            <div className="footerContainer2">
                <img src={footer} className="footer2"></img>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home