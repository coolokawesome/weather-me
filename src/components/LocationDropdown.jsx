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
          country: 'CA',
          maxRow: 5000,
          featureClass: 'P',
          username: 'syrussamson',
        },
      })
      .then((response) => {
        const cities = response.data.geonames.map((city) => city.name).sort();
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
      <div className="input-group input-group-md">

        <input
          type="text"
          id="search-input"
          placeholder="Search locations"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className='
        col-12 col-md-8
        input-rounded
        form-control
        '
        />
        <select
          className='
          form-select

          '
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
      </div>

      <button className='mt-5 mb-5 btn btn-start rounded-pill text-white btn-lg col-12 d-flex justify-content-center' onClick={handleSaveLocation}>Save Location</button>
      {selectedLocation && <h1 className='text-light'>Your selected location: {selectedLocation}</h1>}
    </div>
  );
}

export default LocationDropdown