import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import footer from '../Assets/Page1/footer.png'

const ImageUpload = ({pokeJson, setPokeJson, files, setFiles, setLocation}) => {

  const [ prompts, setPrompts ] = useState([]);
  const [ selected, setSelected] = useState('');
  //UPLOAD PHOTO CONFORMATION
  //const [uploadDisplay, setUploadDisplay] = useState("");

  //FILE UPLOAD HANDLER
  const uploadHandler = (e) => {
    //setFiles([])
    let uploadImage = e.target.files[0];
    //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
    //// NEED TO CHANGE THIS 
    let newName = pokeJson[0].image_file
    //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
    const renamedFile = new File([uploadImage], newName, { type: uploadImage.type });
    //working
    //setFiles([...files, renamedFile])
    setFiles([renamedFile])
  };

  const uploadDropHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.target)
  };

  //THIS WILL BUILD THE DISPLAYED PROMPTS AND GIVE THE DIVS TO UPLOAD PHOTOS
  const promptTagBuilder = () => {
    const promptList = pokeJson.map((p,i)=>{return <div className='promptCard' key={i} data-value={p.name} onClick={(e)=>{setSelected(e.target.dataset.value)}}>
      <h3 className='cardName'>{p.name}</h3>
      <div className='prompt'>{p.image_prompt}</div>
    </div>});
    return promptList
  };

  return (
    <div className='ImageUpload'>
      <div className="uploadContainer">
      <div className='uploadContainerBG'>
          <Header/>
          <div className='uploadHeaderContainer'>
            <h1 className='typeUploadHead'>GENERATE IMAGE</h1>
            <p className='typeUploadP'>Using AI generated promps upload the image</p>
            <div className='uploadEntryContainer'>
              <div className='uploadEntranceBar'>
                好きなキャラクターをクリック
              </div>
            </div>
            <div className="uploadSelectorContainer">
              {pokeJson[0] ? promptTagBuilder(): "NOW LOADING . . ."}
            </div>
            <div className='photoUploadContainer'>
              <div className='photouploadEntranceBar'>
                画像を挿入する
              </div>
            </div>
            <div className='uploadInputContainer'>
              <form className="photoInputForm" encType="multipart/form-data">
                <label htmlFor="image" className='custom-file-upload' onDrop={uploadDropHandler}>
                  {files[0]? `${files[0].name} has been uploaded` : "画像をドラッグ＆ドロップしてください。"}
                  <input 
                    className="fileInput" 
                    type='file' 
                    id='image' 
                    accept='image/*' 
                    name="file" 
                    onChange={(e)=>{uploadHandler(e)}}
                    onDragOver={(e) => {e.preventDefault();}}
                    onDrop={(e) => {e.preventDefault()}}
                    >
                  </input>
                </label>
                <div className='submitPhotoFileContainer'>
                  {files[0]?
                  <Link to="/Render" className="photoInputName" type='submit' onClick={()=>{setLocation(3)}}>GENERATE YOUR CARD</Link>:
                  <Link to="/ImageUpload" className="photoInputNameDisabled" type='submit'>Please upload a photo</Link>
                  }
                </div>
              </form>
            </div>
            <div className='navButtons'>
              {/* <Link to="/Home">Back</Link> */}
              {/* <Link to="/Render">Next</Link> */}
            </div>
            <div className="footerContainer3">
                <img src={footer} className="footer3"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImageUpload