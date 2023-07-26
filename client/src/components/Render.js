import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import logo from "../Assets/Page1/logo.png"
import Loading from './Loading';
import QRCode from 'react-qr-code'
import Header from './Header'

const Render = ({pokeJson, setPokeJson, files, setFiles}) => {

  const [photos, setPhotos] = useState([])

  const renderScript = async() => {
    const fileToUpload = files[0]
    const jsonArrToUpload = JSON.stringify(pokeJson)
    
    const formData = new FormData()
    formData.append('photo', fileToUpload)
    formData.append('json', jsonArrToUpload)

    ////🏅P🏅R🏅O🏅D🏅U🏅C🏅T🏅I🏅O🏅N🏅///
    const res = await fetch("https://pokegen-api.onrender.com/render", {
    //🥉L🥉O🥉C🥉A🥉L🥉
    //const res = await fetch("http://127.0.0.1:8000/render", {
    /// THE REST OF THE FETCH REQUEST
        method: 'POST',
        body: formData,
      });

    //console.log(res)
      

    const data = await res.json();
    //console.log(data)
    return data.response
  };

  const displayPhoto = () => {
    return photos.map(url => (
      <img src={url} key={url} alt="photo" className='renderCard' />
    ))
  };

  const dataCardBuilder = () => {
    //console.log(pokeJson[0])
    let attacks = pokeJson[0].abilities.map((a)=>{return <div className="infoCardPanel">{a.name}</div>})
    let returnCards = [
      <div className="infoCardPanel">{pokeJson[0].element}</div>,
      <div className="infoCardPanel">{pokeJson[0].hp}</div>,
      attacks,
      <div className='infoCardDescription'>{pokeJson[0].description}</div>,
    ];
    return returnCards
  };

  const resetData = () => {
    setPokeJson([]);
    setFiles([]);
  };

  const handleScan = () => {
    const link = document.createElement('a');
    link.href = photos[0];
    link.download = 'image.png';
    link.click();
    console.log("hello")
  };

  useEffect(() => {
    const fetchData = async() => {
      const res = await renderScript();
      const dataArray = res.map((encoded64) => {return `data:image/png;base64,${encoded64}`});
      setPhotos(dataArray);
    };

    fetchData()
  }, []);





  return (
    <div className='render'>
      {photos[0]?
      <div className='renderPageContainer'>
        <div className='renderContainerBG'>
          <Header/>
          {/* <div className="renderNavbarContainer">
                <img className="pokemonLogo" src={logo}></img>
                <p className="renderHeaderTopics">コンセプト</p>
                <p className="renderHeaderTopics">環境問題について知ろう</p>
                <p className="renderHeaderTopics">ヒントを見る</p>
                <p className="renderHeaderTopics">カード一覧</p>
          </div> */}
          <div className='renderBodyContainer'>
            <div className='renderHeaderContainer'>
              <h1 className="renderh1">IT'S YOUR CARD!!</h1>
              <h3 className='renderh2'>君だけのアースシールダーの出来上がり！</h3>
            </div>
            <div className='renderCardContainer'>
              {displayPhoto()}
            </div>
            {/* <div className='renderDataContainer'>
              {dataCardBuilder()}
            </div> */}
            {/* <div>
              <QRCodeRenderer value={"stupid"}/>
              <button onClick={handleScan}></button>
            </div> */}
            <div className='renderNavButtons'>
              <Link to="/" className="renderReturnButton" type='submit' onClick={()=>{resetData()}}>RETURN TO TOP</Link>
            </div>
          </div>
        </div>
      </div>:<Loading/>}
    </div>
  )
}

export default Render
