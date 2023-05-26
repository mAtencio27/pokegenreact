import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import footer from '../Assets/Page1/footer.png'

const ImageUpload = ({pokeJson, setPokeJson, files, setFiles}) => {

  const [ prompts, setPrompts ] = useState([]);
  const [ selected, setSelected] = useState('')

  //FILE UPLOAD HANDLER
  const uploadHandler = (e) => {
    let uploadImage = e.target.files[0]
    //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
    //// NEED TO CHANGE THIS 
    //let newName = prompts[0]["Image_file"]
    let newName = pokeJson[0].image_file
    //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
    console.log("this is in the upload of the e.target.files[0]")
    console.log(e.target.files[0])
    const renamedFile = new File([uploadImage], newName, { type: uploadImage.type });
    //console.log(renamedFile)
    //setFiles([...files, e.target.files[0]]) working
    setFiles([...files, renamedFile])
  };

  const uploadDropHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.target)
  };

  //FILE SUBMIT HANDLER
  const submitHandler = async(e) => {
    e.preventDefault()
    //console.log(files[0])
    const fileToUpload = files[0]
    const formData = new FormData()

    formData.append("file", fileToUpload)

      // const photoPasser = async() => {
      //   const res = await fetch('/upload', {
      //     method: 'POST',
      //     body: formData
      //   });
      // return res
      // };

    console.log("useless now")
     //photoPasser();
    //🎖🎖🎖Comment this out so it doesn't reset because I need to pass to render🎖🎖🎖
    //setFiles([])
  };

  //THIS WILL BUILD THE DISPLAYED PROMPTS AND GIVE THE DIVS TO UPLOAD PHOTOS
  const promptTagBuilder = () => {
    const promptList = pokeJson.map((p)=>{return <div className='promptCard' data-value={p.name} onClick={(e)=>{setSelected(e.target.dataset.value)}}>
      <h3 className='cardName'>{p.name}</h3>
      <div className='prompt'>{p.image_prompt}</div>
    </div>});
    return promptList
  };

  //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
  // NO LONGER NEED TO FETCH PROPTS NOW THAT THEY ARE BEING PASSED CORRECTLY!!! FASTER TOO!!!
  // const fetchPrompts = async(e) => {
  //   const res = await fetch("/prompts")
  //   const data = await res.json()
  //   console.log(data)
  //   setPrompts(data.response);
  //   return
  // };
  //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻

  //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻
  // useEffect(()=>{
  //   const display = async() => {
  //     await fetchPrompts();
  //   };
  //   display()
  //   console.log(pokeJson)
  //   // THESE ARE THE SAME
  //   // console.log(`THIS IS FROM JSON STATE RETURN:${pokeJson[0].image_file}`);
  //   // console.log(`THIS IS FROM THE FETCHED PROMPTS:${prompts[0]["Image_file"]}`)
  // },[])
  //👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻👻

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
                好きなポケモンをクリック
              </div>
            </div>
            <div className="uploadSelectorContainer">
              {prompts ? promptTagBuilder(): "no prompts"}
            </div>
            <div className='photoUploadContainer'>
              <div className='photouploadEntranceBar'>
                Photo Upload
              </div>
            </div>
            <div className='uploadInputContainer'>
              <form className="photoInputForm" onSubmit={submitHandler} encType="multipart/form-data">
                <label htmlFor="image" className='custom-file-upload' onDrop={uploadDropHandler}>
                  Drag and drop your photo from midjourney here!
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
                  <Link to="/Render" className="photoInputName" type='submit'/**onClick={submitHandler(e)**/>Submit</Link>
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






        {/* <h1>Image Prompts</h1>
        <div className='promptCardContainer'>
          {prompts ? promptTagBuilder(): "no prompts"}
        </div>
        <div className='navButtons'>
            <Link to="/Home">Back</Link>
            <Link to="/Render">Next</Link>
        </div> */}
      </div>
    </div>
  )
}
export default ImageUpload