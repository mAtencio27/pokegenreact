import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../Assets/Page2/yellow.png'
import Header from './Header';
import footer from '../Assets/Page1/footer.png'

const Home = ({pokeJson, setPokeJson, setLocation}) => {

  const [subjectString, setSubjectString] = useState([]);
  const [elementString, setElementString] = useState("");


  //THIS IS GENERATING THE JSON SCRIPT AND SAVING THE JSON TO STATE
  const generateScript = async(e) => {
    //🏠🏠🏠🏠🏠🏠 LOCAL 🏠🏠🏠🏠🏠
    //const res = await fetch(`http://localhost:5000/generate?element=${elementString}&subject=${subjectString}`)
    //🏩🏩🏩🏩🏩🏩 PRODUCTION 🏩🏩🏩🏩🏩
    const res = await fetch(`https://pokegen-api.onrender.com/generate?element=${elementString}&subject=${subjectString}`)
    let responseData = await res.json()
    setPokeJson(responseData.data.cards)
    return responseData.data.cards
  };

  const clickHandler = async(e) => {
    setLocation(2);
    try {
      const response = await generateScript(e);
      console.log(`This is the response ${response}`)
    }catch(error){

    }finally {
      return
    }
  };

  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  // const renderScript = async(e) => {
  //   const res = await fetch("/render")
  //   console.log(res)
  //   return
  // };
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻

  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  // const create = async(e) => {
  //   const res_1 = await fetch("/generate")
  //   const res_2 = await fetch("/render")
  //   console.log(res_1, res_2)
  //   return
  // };
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻

  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  // const fetchPhotos = async(e) => {
  //   const res = await fetch("/photos")
  //   const data = await res.json()
  //   //console.log (data)
  //   console.log(data.response)
  //   return
  // }
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  // useEffect(() => {
  //   const fetchData = async() => {
  //     const res = await fetch("/members");
  //     const resData = await res.json()
  //     //setData(resData.members)
  //   };

  //   fetchData()
  // }, [])
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻

  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻
  // const buttonHandler = (e) => {
  //   console.log("button click");
  //   console.log(e.target.value);
  //   console.log(data)
  // };
  // 👻👻👻👻👻👻DEPRICATED NOW USING JSON👻👻👻👻👻👻👻

  return (
    <div className='Home'>
      <div className='homeContainer'>
      <div className='homeContainerBG'>
          <Header/>
          <div className='homeHeaderContainer'>
            <h1 className='typeKeywordHead'>TYPE & KEYWORD</h1>
            <p className='typeKeywordP'>eco pokemon element and keyword input</p>
            <div className='keywordEntryContainer'>
              <div className='keywordEntranceBar'>
                keyword enter
              </div>
            </div>
            <div className='keywordInputContainer'>
              <input className='keywordInput' placeholder="This is where to enter" onChange={(e) => {setSubjectString(e.target.value)}}  type='text'></input>
            </div>
            <div className='elementSelectorContainer'>
              <div className='elementEntranceBar'>
                select an element from the list
              </div>
              <div className="generateElementBox">
                  <div className={`generateElementTile${elementString === 'grass' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="grass">Grass</div>
                  <div className={`generateElementTile${elementString === 'fire' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="fire">Fire</div>
                  <div className={`generateElementTile${elementString === 'water' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="water">Water</div>
                  <div className={`generateElementTile${elementString === 'electric' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="electric">Electric</div>
                  <div className={`generateElementTile${elementString === 'psychic' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="psychic">Psychic</div>
                  <div className={`generateElementTile${elementString === 'neutral' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="neutral">Normal</div>
                  <div className={`generateElementTile${elementString === 'fighting' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="fighting">Fighting</div>
                  <div className={`generateElementTile${elementString === 'dark' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="dark">Darkness</div>
                  <div className={`generateElementTile${elementString === 'metal' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="metal">Metal</div>
                  <div className={`generateElementTile${elementString === 'fairy' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="fairy">Fairy</div>
                  <div className={`generateElementTile${elementString === 'dragon' ? ' selected' : ''}`} onClick={(e)=>{setElementString(e.target.dataset.value)}} data-value="dragon">Dragon</div>
              </div>
            </div>
            <div className='generateButtonContainer'>
              {/* {elementString ? <button className="generateScriptButton" value={subjectString} onClick={(e)=>{generateScript(e)}}> Generate Script </button>: <button className="generateScriptButton" value={subjectString} onClick={(e)=>{generateScript(e)}} disabled> Generate Script </button>} */}
              {elementString ? <Link to="/ImageUpload" className="generateScriptButton" value={subjectString} onClick={(e)=>{clickHandler(e)}}> Generate Script </Link>: <Link to='/Home' className="generateScriptButtonDisabled" value={subjectString}> Select an element to continue </Link>}
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