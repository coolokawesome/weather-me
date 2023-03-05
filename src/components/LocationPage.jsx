import React from 'react'
import LocationDropdown from './LocationDropdown'

function LocationPage() {
  return (
    <>
    <section className='container location-container'>
    <div className='row'>
        <div className='col'>
            <h1>Select your location: </h1>
            <LocationDropdown />
        </div>
    </div>
    </section>
    </>
    )
}

export default LocationPage