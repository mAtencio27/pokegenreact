import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import logo from "../Assets/Page1/logo.png"

const Render = ({pokeJson, setPokeJson, files, setFiles}) => {

  const [photos, setPhotos] = useState([])

  //THIS NEEDS TO TAKE FILES WHICH IS THE IMAGE AND SEND IT BACK WITH THE JSON
  const renderScript = async() => {
    const fileToUpload = files[0]
    const jsonArrToUpload = JSON.stringify(pokeJson)
    
    const formData = new FormData()
    formData.append('photo', fileToUpload)
    formData.append('json', jsonArrToUpload)

    const res = await fetch("/render", {
        method: 'POST',
        body: formData,
      });

    const data = await res.json();
    console.log(data)
    return data.response
    }

  //👻👻👻👻👻
  // REDUNTANT HERE FOR REFERENCE
  // const fetchPhotos = async(e) => {
  //   const res = await fetch("/photos")
  //   const data = await res.json()
  //   return data.response
  // }
  //👻👻👻👻👻

  const displayPhoto = () => {
    return photos.map(url => (
      <img src={url} key={url} alt="photo" className='renderCard' />
    ))
  }

  useEffect(() => {
    const fetchData = async() => {

      ///🎃🎃🎃🎃 This is currently working 
      const res = await renderScript()
      ///🎃🎃🎃🎃

      const dataArray = res.map((encoded64) => {return `data:image/png;base64,${encoded64}`})
      setPhotos(dataArray);
    };

    fetchData()
  }, [])

  return (
    <div className='render'>
      <div className='renderPageContainer'>
        <div className='renderContainerBG'>
          <div className="renderNavbarContainer">
                <img className="pokemonLogo" src={logo}></img>
                <p className="renderHeaderTopics">コンセプト</p>
                <p className="renderHeaderTopics">環境問題について知ろう</p>
                <p className="renderHeaderTopics">ヒントを見る</p>
                <p className="renderHeaderTopics">カード一覧</p>
          </div>
          <div className='renderBodyContainer'>
            <div className='renderHeaderContainer'>
              <h1 className="renderh1">IT'S YOUR CARD!!</h1>
              <h3 className='renderh2'>Here it your pokemon card</h3>
            </div>
            <div className='renderCardContainer'>
            {displayPhoto()}
            </div>
            <div className='renderNavButtons'>
              <Link to="/ImageUpload">Back</Link>
              <Link to="/Render">Next</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Render
