import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'



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
        const forecastList = next12Hours.map((hourData) => {
          const hour = new Date(hourData.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' });
          const temp = hourData.main.temp;
          const description = hourData.weather?.[0]?.description;
          return `${hour}: ${temp}\u00b0, ${description}`;
        });
        setHourlyForecast(forecastList);
      }).catch(error => console.log(error));
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleGetStarted}>{'<- go back'}</button>
      {location && <p>Location: {location}</p>}
      {temperature && <p>Temperature: {temperature}&deg;C</p>}
      {isCloudy && <p>It's cloudy today</p>}
      {isSunny && <p>It's sunny today</p>}
      {isRainy && <p>It's rainy today</p>}
      {isSnowy && <p>It's snowy today</p>}
      {hourlyForecast && (
        <ul>
          {hourlyForecast.map((forecast, index) => (
            <li key={index}>{forecast}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;