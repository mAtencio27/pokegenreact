import './App.css';

function App() {

  const buttonHandler = (e) => {
    console.log("button click");
    console.log(e.target.value);
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
