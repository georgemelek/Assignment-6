import React from 'react';
import ReactDOM from 'react-dom'; 
import Result from './components/Result'
import './App.css';

function App(){ 
  return (
    <div>

      <div id ='headDiv'>
        <h1 id = 'TOP'> Zip Code Search </h1>
      </div>
      <div id = "form" > 
        <label>
          Zip Code: 
          <input type = "text" id="userzip" />
        </label> 
        <button onClick = {printResults} > Search </button>
      </div>
      <div id='resultDiv'></div>

      <div id ='head2Div'>
        <h1 id = 'TOP'> City Search </h1>
      </div>
      <div id = "form" > 
        <label>
          City: 
          <input type = "text" id="usercity" />
        </label> 
        <button onClick = {printCityResults} > Search </button>
      </div>
        <div id='result2Div'></div>

    </div>
  );
}

function printCityResults(){
  const city =document.getElementById("usercity").value.toUpperCase();
  fetch(`http://ctp-zip-api.herokuapp.com/city/${city}`)
  .then(response=>{
    return response.json()
  })
  .then(cities =>{
    const result2Div = document.getElementById("result2Div")
    let results2 = []
    for(let i=0;i<cities.length;i++){
      results2[i] = "\n" + cities[i] + "\n";
    }
    ReactDOM.render(results2, result2Div);
  })

}

function printResults(){ 
  const zip = document.getElementById('userzip').value
  fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
  .then(response => { 
    if (response.status !== 200){ 
       throw ("Enter Valid Zip")
    }
    return response.json()
  })
  .then(zips => { 
    const resultDiv = document.getElementById('resultDiv')
    let results = []
    for (let i = 0; i < zips.length ; i++){ 
      results[i] = <Result key= {zips[i].RecordNumber}
      locationText = {zips[i].LocationText}
      state = {zips[i].State}
      estimatedPop = {zips[i].EstimatedPopulation}
      lat = {zips[i].Lat}
      long = {zips[i].Long}
      totalWages = {zips[i].TotalWages}
      />
    }
    ReactDOM.render(results, resultDiv); 
  })
  // .catch(error => { 
  //   console.log("error", error)
  // })
}
export default App;