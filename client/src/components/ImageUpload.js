import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ImageUpload = () => {

  const [ prompts, setPrompts ] = useState([]);
  const [ files , setFiles ] = useState([]);

  //FILE UPLOAD HANDLER
  const uploadHandler = (e) => {
    //console.log(e.target) this is the tag
    //e.target.value is the actual file
    setFiles([...files, e.target.files[0]])
  };

  //FILE SUBMIT HANDLER
  const submitHandler = async(e) => {
    e.preventDefault()
    console.log(files[0])
    const fileToUpload = files[0]
    const formData = new FormData()

    formData.append("file", fileToUpload)

    //console.log(formData)

    const photoPasser = async() => {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      //console.log(res)
      return res
    };

    photoPasser();
    // if(!files){
    //   return
    // };


    // const res = await fetch('/upload', {method: 'GET',
    //   body: files[0],
    //   headers: {
    //     'content-type': files[0].type,
    //     'content-length': `${files[0].size}`,
    //   },
    // })
  };

  //THIS WILL BUILD THE DISPLAYED PROMPTS AND GIVE THE DIVS TO UPLOAD PHOTOS
  const promptTagBuilder = () => {
    const promptList = prompts.map((p)=>{return <div className='promptCard'>
      <h3 className='cardName'>{p.Name}</h3>
      <div className='prompt'>{p.Prompt}</div>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input type='file' id='image' accept='image/*' name="file" onChange={(e)=>{uploadHandler(e)}}></input>
        <button type='submit' /**onClick={submitHandler(e)}**/>Submit</button>
      </form>
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