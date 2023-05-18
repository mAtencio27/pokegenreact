import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ROUTES
import Home from './components/Home.js'
import ImageUpload from './components/ImageUpload.js';
import Render from './components/Render'
import Landing from './components/Landing';

function App() {

  const [pokeJson, setPokeJson] = useState([]);
  const [ files , setFiles ] = useState([]);

  //const [data, setData] = useState([{}])

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

  const fetchPrompts = async(e) => {
    const res = await fetch("/prompts")
    const data = await res.json()
    //console.log (data)
    console.log(data.response)
    return
  };

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

  const imageSave = async() => {

  }


  // useEffect(() => {
  //   const fetchData = async() => {
  //     const res = await fetch("/members");
  //     const resData = await res.json()
  //     //setData(resData.members)
  //   };

  //   fetchData()
  // }, [])

  const buttonHandler = (e) => {
    console.log("button click");
    console.log(e.target.value);
    //console.log(data)
  };

  return (
    <Router>
      <div className="App">
        <div className='components'>
          <Switch>
            <Route exact path = "/">
              <Landing/>
            </Route>
            <Route exact path = "/home">
              <Home pokeJson={pokeJson} setPokeJson={setPokeJson} files={files} setFiles={setFiles}/>
            </Route>
            <Route path = "/ImageUpload">
              <ImageUpload pokeJson={pokeJson} setPokeJson={setPokeJson} files={files} setFiles={setFiles}/>
            </Route>
            <Route path="/Render">
              <Render pokeJson={pokeJson} setPokeJson={setPokeJson} files={files} setFiles={setFiles}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
