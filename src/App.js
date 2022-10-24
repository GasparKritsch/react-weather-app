import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const[data,setData] = useState('')
  const[location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3e2f415bb3b419ffe029dd0556b638e1`

  const buscarClima = (evt) => {
    if (evt.key === 'Enter') {
      axios.get(url)
      .then((res) => {
        setData(res.data)
        console.log(res.data)
        setLocation('')
      })
    } 
  }

  return (
    <div className="App">
      <div className="searchBarContainer">
        <input type="text"
        value={location}
        onChange={evt => setLocation(evt.target.value)}
        onKeyPress={buscarClima}
        placeholder='Ingrese ciudad' />
      </div>
      <div className='infoContainer'>
        {data ? <h3 className='cityName'>{`${data.name}, ${data.sys.country}`}</h3> : <h3>Ingrese una ciudad!</h3>}
        <hr />
        <div>
          {data && <h1 className='temperature'>{Math.round(data.main.temp - 273.15)+'°C'}</h1>}
          {data && <h3 className='weather'>{data.weather[0].description}</h3>}
        </div>
      </div>
      <div className='moreInfoContainer'>
        <div className="divsContainer">
          <div>
            <h4>S.T</h4>
            {data && <p>{Math.round(data.main.feels_like - 273.15)+ '°C'}</p>}
          </div>
          <div>
            <h4>Humidity</h4>
            {data && <p>{data.main.humidity + '%'}</p>}
          </div>
          <div>
            <h4>Wind</h4>
            {data && <p>{Math.round(data.wind.speed/1.6) + 'Km/h'}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
