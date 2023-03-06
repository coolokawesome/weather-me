import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import Footer from './Footer';
import logo from './logowhite.png'


function Dashboard() {
  //declaring states that will display information of the weather by the hour with API calls
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [isCloudy, setIsCloudy] = useState(false);
  const [isSunny, setIsSunny] = useState(false);
  const [isRainy, setIsRainy] = useState(false);
  const [isSnowy, setIsSnowy] = useState(false);
  const [pop, setPop] = useState(0)
  const [wind, setWind] = useState(0)
  const [humid, setHumid] = useState(0)

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
        setTemperature(weatherData?.main?.temp)
        setFeelsLike(weatherData?.main?.feels_like)
        setPop(forecastData?.list?.[0]?.pop)
        setWind(forecastData?.list?.[0]?.wind?.speed)
        setHumid(forecastData?.list?.[0]?.main?.humidity)
        setIsCloudy(weatherData?.weather?.[0]?.main === 'Clouds');
        setIsSunny(weatherData?.weather?.[0]?.main === 'Clear');
        setIsRainy(weatherData?.weather?.[0]?.main === 'Rain');
        setIsSnowy(weatherData?.weather?.[0]?.main === 'Snow');

        const next12Hours = forecastData?.list?.slice(0, 11) || [];
        const forecastList = next12Hours
          .sort((a, b) => a.dt - b.dt)
          .map((hourData) => {
            const hour = new Date(hourData.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' });
            const temp = hourData.main.temp;
            const description = hourData.weather?.[0]?.description;
            return `${hour}: \n ${Math.round(temp)}\u00b0C \n ${description}`;
          });
        setHourlyForecast(forecastList);
      }).catch(error => console.log(error));
    }
  }, []);



  return (
    <>
      <div className='container dashboard-container'>
        <div className='d-flex justify-content-between '>
          <img style={{ height: '60px', width: '80px' }} className='col-6 col-md-1 text-start img img-fluid' src={logo}></img>
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
        <div className="container">
          <div className="row mt-3">
            <div className='temp-container col-12 col-lg-6 mb-5 text-center '>
              {location &&
                <div className='row d-flex justify-content-between mb-4 me-2'>
                  <div className="col-12 col-xl-6 text-center text-lg-start">
                    <h1 class="">{location}</h1>
                  </div>
                </div>
              }
              <div className='d-flex justify-content-center justify-content-lg-start flex-wrap text-center text-lg-start'>
                <div className="">
                  {temperature &&
                    <div className='d-flex justify-content-center justify-content-lg-start flex-wrap text-center text-lg-start'>
                      <h1 className='display-1 text-light '>{Math.round(temperature)}&deg;C &nbsp;</h1>
                      {isCloudy && <h1 className='display-1'>☁️</h1>}
                      {isSunny && <h1 className='display-1'>🌞</h1>}
                      {isRainy && <h1 className='display-1'>🌧</h1>}
                      {isSnowy && <h1 className='display-1'>❄️</h1>}
                    </div>
                  }
                  {feelsLike && <h3 className=''>feels like {Math.round(feelsLike)}&deg;C</h3>}
                  {isCloudy && <h4>It's cloudy today.</h4>}
                  {isSunny && <h4> It's sunny today.</h4>}
                  {isRainy && <h4> It's rainy today.</h4>}
                  {isSnowy && <h4> It's snowy today.</h4>}
                  <p>Chance of precipitation: {pop * 100}%</p>
                  <p>Humidity: {humid} %</p>
                  <p>Wind Speed: {Math.round(wind)} km/h</p>
                </div>
                <div className=''>
                </div>
              </div>
            </div>
            <div className="hourly-container col-12 col-lg-6">
              <h1 className="mb-2 text-center">Over the next 12 hours:</h1>
              {hourlyForecast && (
                <div className='row'>
                  <div className="">
                    <div className='weather-box d-flex text-center flex-wrap justify-content-center'>
                      {hourlyForecast.map((forecast, index) => (
                        <>
                          {index < 3 ?
                            <div className=' text-center col-4 col-lg-4 mb-4'>
                              <div className='weather-item text-center'>
                                <h3 className="text-center" key={index}>
                                  {forecast.includes('clouds') ? <> {`☁️ \n`}<div>{forecast}</div></> : null}
                                  {forecast.includes('snow') ? <> {`🌨 \n`}<div>{forecast}</div></> : null}
                                  {forecast.includes('rain') ? <> {`🌧 \n`}<div>{forecast}</div></> : null}
                                  {forecast.includes('clear') ? <> {`☀️ \n`}<div>{forecast}</div></> : null}
                                </h3>
                              </div>
                            </div>
                            :
                            <div className='weather-item col-3 col-lg-3 '>
                              <p className="" key={index}>{forecast}</p>
                            </div>}
                            {console.log(pop)}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer /></>
  );
}

export default Dashboard;