import React from 'react'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

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
        <button value={3} onClick={(e)=>{buttonHandler(e)}}> Click here to generate a new pokemon test</button>
      </header>
    </div>
  );
}

export default App;
