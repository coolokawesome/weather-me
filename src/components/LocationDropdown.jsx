import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';


function LocationDropdown() {
    const location = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(Cookies.get('location') || null);


  useEffect(() => {
    axios
      .get('http://api.geonames.org/searchJSON', {
        params: {
          q: ', Canada',
          
          maxRow: 500,
          featureClass: 'P',
          username: 'syrussamson',
        },
      })
      .then((response) => {
        const cities = response.data.geonames.map((city) => city.name);
        setLocations(cities);
      });
  }, []);

const navigate = useNavigate();


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationSelect = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  };

  const handleSaveLocation = () => {
    Cookies.set('location', selectedLocation, { expires: 7 });
    alert(`Location ${selectedLocation} saved!`);
    navigate('/dashboard');


  };

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label htmlFor="location-dropdown">Select your location:</label>
      <input
        type="text"
        id="search-input"
        placeholder="Search locations"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <select
        id="location-dropdown"
        value={selectedLocation}
        onChange={handleLocationSelect}
      >
        <option value="" disabled>
          Please select a location
        </option>
        {filteredLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <button onClick={handleSaveLocation}>Save Location</button>
      {selectedLocation && <h1>Your selected location: {selectedLocation}</h1>}
    </div>
  );
}

export default LocationDropdown