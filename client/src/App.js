import React from 'react'
import './App.css'
import { useState, useEffect } from 'react'


function App() {

  const [data, setData] = useState([{}])

  // const generateScript = async(e) => {
  //   const res = await fetch("/generate")
  //   console.log(res)
  //   return
  // };

  // const renderScript = async(e) => {
  //   const res = await fetch("/render")
  //   console.log(res)
  //   return
  // };

  const create = async(e) => {
    const res_1 = await fetch("/generate")
    const res_2 = await fetch("/render")
    console.log(res_1, res_2)
    return
  };

  const fetchPhotos = async(e) => {
    const res = await fetch("/photos")
    const data = await res.json()
    //console.log (data)
    console.log(data.response)
    return
  }


  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("/members");
      const resData = await res.json()
      setData(resData.members)
    };

    fetchData()
  }, [])

  const buttonHandler = (e) => {
    console.log("button click");
    console.log(e.target.value);
    console.log(data)
  };

  return (
    <div className="App">
      <header className="App-header">
        <button value={3} onClick={(e)=>{fetchPhotos(e)}}> Display </button>
        <button value={3} onClick={(e)=>{create(e)}}> make </button>
      </header>
    </div>
  );
}

export default App;
