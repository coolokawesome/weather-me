import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';


function Dashboard() {
  //declaring states that will display information of the weather by the hour with API calls
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [isCloudy, setIsCloudy] = useState(false);
  const [isSunny, setIsSunny] = useState(false);
  const [isRainy, setIsRainy] = useState(false);
  const [isSnowy, setIsSnowy] = useState(false);

  //declare an empty array state to be populated by hourly information.
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/location');
  };
  //get the cookie saved from the user's input to be parsed into the API
  useEffect(() => {
    const savedLocation = Cookies.get('location');
    setLocation(savedLocation);

    //API key and URL's for fetch
    if (savedLocation) {
      const apiKey = '288662d829f8330f0f719d7205ce1180';
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${savedLocation}&appid=${apiKey}&units=metric`;
      const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${savedLocation}&appid=${apiKey}&units=metric`;

      Promise.all([
        fetch(weatherUrl).then(res => res.json()),
        fetch(forecastUrl).then(res => res.json())
      ]).then(([weatherData, forecastData]) => {
        Math.round(setTemperature(weatherData?.main?.temp));
        setIsCloudy(weatherData?.weather?.[0]?.main === 'Clouds');
        setIsSunny(weatherData?.weather?.[0]?.main === 'Clear');
        setIsRainy(weatherData?.weather?.[0]?.main === 'Rain');
        setIsSnowy(weatherData?.weather?.[0]?.main === 'Snow');

        const next12Hours = forecastData?.list?.slice(0, 12) || [];
        const forecastList = next12Hours
          .sort((a, b) => a.dt - b.dt)
          .map((hourData) => {
            const hour = new Date(hourData.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' });
            const temp = hourData.main.temp;
            const description = hourData.weather?.[0]?.description;
            return `${hour}: \n ${Math.round(temp)}\u00b0 \n ${description}`;
          });
        setHourlyForecast(forecastList);
      }).catch(error => console.log(error));
    }
  }, []);

  return (
    <>
      <div className='container dashboard-container mt-2'>
        <div className='d-flex justify-content-between '>
          <h1 className='col-6 col-md-6 text-start'>Dashboard</h1>
          <button
              onClick={handleGetStarted}
              className='col-4 
              text-center
              justify-content-center 
              justify-content-md-end 
              col-md-3
              btn 
              btn-dash text-light 
              rounded-5 '
            >{'← Back'}</button>
        </div>


        {location &&
          <div className='row d-flex justify-content-between mb-4 me-2'>
            <div className="col-6 col-md-6 text-start">
              <h2 class="mt-2"><u>{location}</u></h2>
            </div>
            {/* <button
              onClick={handleGetStarted}
              className='col-4 
              text-center
              justify-content-center 
              justify-content-md-end 
              col-md-3
              btn 
              btn-start text-light 
              rounded-5 '
            >{'← Back'}</button> */}
          </div>
        }
        <div className='temp-container'>
          <div className='row'>
            <div className="col-6">
              {temperature && <h4>{Math.round(temperature)}&deg;C</h4>}
              {isCloudy && <p>It's cloudy today.</p>}
              {isSunny && <p> It's sunny today.</p>}
              {isRainy && <p> It's rainy today.</p>}
              {isSnowy && <p> It's snowy today.</p>}
            </div>
            <div className='text-center col-5 text-sm-start text-lg-end'>
            {isCloudy && <h1 className='display-1'>☁️</h1>}
            {isSunny && <h1 className='display-1'>🌞</h1>}
            {isRainy && <h1 className='display-1'>🌧</h1>}
            {isSnowy && <h1 className='display-1'>❄️</h1>}
            </div>
          </div>
        </div>

        <h3 className="mt-5 mb-2">Over the next 3 days:</h3>
        {hourlyForecast && (
          <div className='row'>
            <div className="">
              <div className='weather-box d-flex flex-wrap'>
                {hourlyForecast.map((forecast, index) => (
                  <div className='weather-item col-2 col-lg-1 '>
                    <p className="" key={index}>{forecast}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
      <Footer /></>
  );
}

export default Dashboard;