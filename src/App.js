import React from 'react';
import ReactDOM from 'react-dom'; 
import Result from './components/Result'
import './App.css';

function App(){ 
  return (
    <div>
      
      <div id ='zipHeadDiv'>
        <h1 id = 'TOP'> Zip Code Search </h1>
      </div>
      <div id = "form" > 
        <label>
          Zip Code: 
          <input type = "text" id="zip" />
        </label> 
        <button onClick = {printResults} > Search </button>
      </div>
      <div id='zipResultsDiv'></div>

      <div id ='cityHeadDiv'>
        <h1 id = 'TOP'> City Search </h1>
      </div>
      <div id = "form" > 
        <label>
          City: 
          <input type = "text" id="city" />
        </label> 
        <button onClick = {printCityResults} > Search </button>
      </div>
        <div id='cityResultsDiv'></div>

    </div>
  );
}

function printCityResults(){
  const city =document.getElementById("city").value.toUpperCase();
  fetch(`http://ctp-zip-api.herokuapp.com/city/${city}`)
  .then(response=>{
    return response.json()
  })
  .then(cities =>{
    const cityResults = document.getElementById("cityResultsDiv")
    let cityArray = []
    for(let i=0;i<cities.length;i++){
      cityArray[i] = "\n" + cities[i] + "\n";
    }
    ReactDOM.render(cityArray, cityResults);
  })

}

function printResults(){ 
  const zip = document.getElementById('zip').value
  fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
  .then(response => { 
    if (response.status !== 200){ 
       throw ("Enter Valid Zip")
    }
    return response.json()
  })
  .then(zips => { 
    const zipResultDiv = document.getElementById('zipResultsDiv')
    let zipsResults = []
    for (let i = 0; i < zips.length ; i++){ 
      zipsResults[i] = <Result key= {zips[i].RecordNumber}
      locationText = {zips[i].LocationText}
      state = {zips[i].State}
      estimatedPop = {zips[i].EstimatedPopulation}
      lat = {zips[i].Lat}
      long = {zips[i].Long}
      totalWages = {zips[i].TotalWages}
      />
    }
    ReactDOM.render(zipsResults, zipResultDiv); 
  })
}
export default App;