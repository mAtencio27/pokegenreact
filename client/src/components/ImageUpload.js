import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ImageUpload = () => {

  const [ prompts, setPrompts ] = useState([])

  const promptTagBuilderA = async () => {
    console.log(prompts)
    const promptList = await Promise.all(prompts.map((p)=>{return <div>p.Prompt</div>}));
    return promptList
    //return await Promise.all(prompts.map((p)=>{return <div>hello</div>}));
  };

  const promptTagBuilder = () => {
    console.log(prompts)
    const promptList = prompts.map((p)=>{return <div>{p.Prompt}</div>});
    return promptList
    //return await Promise.all(prompts.map((p)=>{return <div>hello</div>}));
  };

  const fetchPrompts = async(e) => {
    const res = await fetch("/prompts")
    const data = await res.json()
    //console.log (data)
    //console.log(data.response)
    //return data.response
    setPrompts(data.response);
    return
  };

  useEffect(()=>{
    // const dataFetch = async() => {
    //   let data = fetchPrompts()
    //   return data
    //   //console.log(data)
    // };

    // setPrompts(dataFetch)
    //dataFetch()
    //fetchPrompts()
    const display = async() => {
      await fetchPrompts();
    };

    display()
  },[])

  return (
    <div>ImageUpload
      <button value={3} onClick={(e)=>{console.log(promptTagBuilder())}}> Return prompts </button>
      <div className='navButtons'>
          <Link to="/">Back</Link>
          <Link to="/Render">Next</Link>
      </div>
      <div>{prompts ? promptTagBuilder(): "no prompts"}</div>
    </div>
  )
}
export default ImageUpload