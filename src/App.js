import './App.css'
import SearchField from "react-search-field"
import FeatherIcon from 'feather-icons-react'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [city,setcity] = useState('');
  const [temp,settemp] = useState(0);
  const [Humidity,sethumidity] = useState(0);
  const [search,setsearch] = useState('Delhi');
  const [Pressure,setpressure] = useState(0);
  const [wind,setwind] = useState(0);

useEffect(()=>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=2e4ee4e6a7975b67e411ac71ab770f62`).then((res)=>{
     setcity(res.data.name);
      settemp(res.data.main.temp);
      sethumidity(res.data.main.humidity);
      setpressure(res.data.main.pressure);
      setwind(res.data.wind.speed);
  })

  .catch((error) => {
    console.log("Error fetching data: ", error);
    // You might want to handle errors here, e.g., set default values or show an error message.
  });
},[search]);

  return (
    <>
      <div className='weather-box'>
        <div className="weather-header">
          <h1>Weather App</h1>
        </div>
        <div className="weather-searchFiled">
          <SearchField
            placeholder="Search..."
            onSearchClick={(value) => {
              setsearch(value);
            }}
            // searchText="Enter City Name"
            searchText={search}
            classNames="weather-input"
          />
        </div>
        <div className="weather-cloud">
          <FeatherIcon icon="cloud-rain" color="white" size="60" />
        </div>

        <div className="weather-city">
          <h1>{city}</h1>
        </div>


        <div className='weather-row'>
          <div className="weather-coloum">
            <FeatherIcon icon="sun" color="orange" />
            <p>Temp:{(temp-273).toFixed(2)} °C</p>
          </div>
          <div className="weather-coloum">
            <FeatherIcon icon="command" color="skyblue" />
            <p>Pressure:{Pressure}</p>
          </div>

        </div> 
        <div className='weather-row'>
          <div className="weather-coloum">
            <FeatherIcon icon="cloud" color="white" />
            <p>Humidity:{Humidity}</p>
          </div>
          <div className="weather-coloum">
            <FeatherIcon icon="wind" color="grey" />
            <p>Wind:{wind}</p>
          </div>

        </div>
      </div>

    </>
  );
}

export default App;
