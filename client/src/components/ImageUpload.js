import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ImageUpload = () => {

  const [ prompts, setPrompts ] = useState([]);
  const [ files , setFiles ] = useState([]);

  //FILE UPLOAD HANDLER
  const uploadHandler = (e) => {
    //console.log(e.target.files[0])
    setFiles([...files, e.target.files[0]])
    //console.log(files)
  };

  //FILE SUBMIT HANDLER
  const submitHandler = () => {
    console.log(files)
    if(!files[0]){
      return
    };

    //fetch(/upload)
  };

  //THIS WILL BUILD THE DISPLAYED PROMPTS AND GIVE THE DIVS TO UPLOAD PHOTOS
  const promptTagBuilder = () => {
    const promptList = prompts.map((p)=>{return <div className='promptCard'>
      <h3 className='cardName'>{p.Name}</h3>
      <div className='prompt'>{p.Prompt}</div>
      <input type='file' onChange={(e)=>{uploadHandler(e)}}></input>
      <button type='submit' onClick={(e)=>{submitHandler()}}>Submit</button>
    </div>});
    return promptList
  };

  const fetchPrompts = async(e) => {
    const res = await fetch("/prompts")
    const data = await res.json()
    setPrompts(data.response);
    return
  };

  useEffect(()=>{
    const display = async() => {
      await fetchPrompts();
    };
    display()
  },[])

  return (
    <div>
      <h1>Image Prompts</h1>
      <div className='promptCardContainer'>
        {prompts ? promptTagBuilder(): "no prompts"}
      </div>
      <div className='navButtons'>
          <Link to="/">Back</Link>
          <Link to="/Render">Next</Link>
      </div>
    </div>
  )
}
export default ImageUpload