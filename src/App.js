import 'bootstrap/dist/css/bootstrap.min.css'
import "weather-icons/css/weather-icons.css";
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const apiKey='80b4b1738a415c3f3d7e2bf5156f935c'
  const [data,setData] = useState({});
  const [city,setCity]=useState('');
  const [weatherIconCurrently,setWeatherIconCurrently]=useState('');
  const weatherIcon ={
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };
 const  get_WeatherIcon= (rangeId)=> {
   console.log(rangeId);
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setWeatherIconCurrently(  weatherIcon.Thunderstorm );
        break;
      case rangeId >= 300 && rangeId <= 321:
        setWeatherIconCurrently( weatherIcon.Drizzle );
        break;
      case rangeId >= 500 && rangeId <= 521:
        setWeatherIconCurrently( weatherIcon.Rain );
        break;
      case rangeId >= 600 && rangeId <= 622:
        setWeatherIconCurrently( weatherIcon.Snow );
        break;
      case rangeId >= 701 && rangeId <= 781:
        setWeatherIconCurrently( weatherIcon.Atmosphere );
        break;
      case rangeId === 800:
        setWeatherIconCurrently( weatherIcon.Clear );
        break;
      case rangeId >= 801 && rangeId <= 804:
        setWeatherIconCurrently( weatherIcon.Clouds );
        break;
      default:
        setWeatherIconCurrently( weatherIcon.Clouds );
    }
  }
  const getWeather = async (cityName)=>{
    if(!cityName) return;
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    try  {
      const response = await  axios.get(apiUrl).then((res)=>res);
      if(!response.ok)
     { const error = new Error('there is error'); console.log(error) }
      console.log(response)
      setData(response.data);
      console.log(response);
      console.log(weatherIconCurrently);
      get_WeatherIcon(response.data.weather[0].id)
    }
   
    catch(error){
      setData({});
      setWeatherIconCurrently('');
    }
  }
  useEffect(()=>{
    getWeather(city);
  },[city])
  return (
    <div className='col-md-12' >
       <div className='weatherBackGround'>
             <h1 className='heading'>Weather App 4 U</h1>
              <div className='d-grid gap-3 col-4 mt-4'>
                 <input type='text' className='form-control' value={city} onChange={(e)=>setCity(e.target.value)} />
              
              </div>
       </div>
       <div className='col-md-12 text-center mt-5'>
             <div className='shadow rounded wetherResultBox'>
             {!weatherIconCurrently ?  <img
               className='weatherIcon'      
               src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png'
               alt='weatherIcon'
               /> :   <h5> <i className={`wi ${weatherIconCurrently} display-1`}  ></i> </h5> }
               <h5 className='weatherCity'>
                 {data?.name}
               </h5>
              {data.main&&(<> <h6 className='weatherTemperature'>
                 {((data?.main?.temp)-273.15).toFixed(2)} °C
               </h6>
               
               </>)} 
            
             </div>
       </div>

    </div>
  );
}

export default App;
