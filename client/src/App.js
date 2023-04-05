import React from 'react'
import './App.css'
import { useState, useEffect } from 'react'


function App() {

  const [data, setData] = useState([{}])

  const generateScript = async(e) => {
    const res = await fetch("/generate")
    console.log(res)
    return
  };

  const renderScript = async(e) => {
    const res = await fetch("/render")
    console.log(res)
    return
  };


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
        <button value={3} onClick={(e)=>{generateScript(e)}}> Generate </button>
        <button value={3} onClick={(e)=>{renderScript(e)}}> Render </button>
        <button value={3} onClick={(e)=>{buttonHandler(e)}}> Display </button>
      </header>
    </div>
  );
}

export default App;
