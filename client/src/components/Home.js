import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  const [subjectString, setSubjectString] = useState(['test']);
  const [elementString, setElementString] = useState()

  const generateScript = async(e) => {
    const res = await fetch(`/generate?element=${elementString}&subject=${subjectString}`)
    //console.log(e.target.value)
    // console.log(`Subject:${subjectString}`)
    // console.log(`Element:${elementString}`)
    //let data = await res.json()
    console.log(res)
    return
  };

  // const renderScript = async(e) => {
  //   const res = await fetch("/render")
  //   console.log(res)
  //   return
  // };


  // const create = async(e) => {
  //   const res_1 = await fetch("/generate")
  //   const res_2 = await fetch("/render")
  //   console.log(res_1, res_2)
  //   return
  // };

  // const fetchPhotos = async(e) => {
  //   const res = await fetch("/photos")
  //   const data = await res.json()
  //   //console.log (data)
  //   console.log(data.response)
  //   return
  // }
  
  // useEffect(() => {
  //   const fetchData = async() => {
  //     const res = await fetch("/members");
  //     const resData = await res.json()
  //     //setData(resData.members)
  //   };

  //   fetchData()
  // }, [])

  // const buttonHandler = (e) => {
  //   console.log("button click");
  //   console.log(e.target.value);
  //   console.log(data)
  // };

  return (
    <div className='Home'>
      <header className="Home-header"> Let's Generate a new pokemon by putting in the Pokemon type and any subject we want.
      </header>
      <div className='typeInput'>
        <select defaultValue={"select an element"} onChange={(e)=>{setElementString(e.target.value)}}>
          <option selected disabled>select an element</option>
          <option value="neutral">Neutral</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="fairy">Fairy</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="metal">Metal</option>
        </select>
        <input onChange={(e) => {setSubjectString(e.target.value)}}  type='text'></input>
        {elementString ? <button value={subjectString} onClick={(e)=>{generateScript(e)}}> Generate Script </button>: <button value={subjectString} onClick={(e)=>{generateScript(e)}} disabled> Generate Script </button>}
        <div className='navButtons'>
          <Link to="/">Back</Link>
          <Link to="/ImageUpload">Next</Link>
        </div>
      </div>
    </div>
  );
}

export default Home