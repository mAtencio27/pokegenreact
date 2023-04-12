import React from 'react'
import { useEffect, useState } from 'react'

const Home = () => {

  const [subjectString, setSubjectString] = useState(['test']);

  const generateScript = async(e) => {
    const res = await fetch("/generate")
    console.log(e.target.value)
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
  
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("/members");
      const resData = await res.json()
      //setData(resData.members)
    };

    fetchData()
  }, [])

  // const buttonHandler = (e) => {
  //   console.log("button click");
  //   console.log(e.target.value);
  //   console.log(data)
  // };

  return (
    <div className='Home'>
      <header className="Home-header">
        Let's Generate a new pokemon by putting in the Pokemon type and any subject we want.
      </header>
      <div className='typeInput'>
        <input onChange={(e) => {setSubjectString(e.target.value)}}  type='text'></input>
        <button value={subjectString} onClick={(e)=>{generateScript(e)}}> Generate Script </button>
      </div>
      <div>
        <img src='./pokegenreact/flask-server/pokemon-card-generator/gallery/renders/001_chippo.png'></img>
      </div>
    </div>
  );
}

export default Home