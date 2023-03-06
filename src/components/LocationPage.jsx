import React from 'react'
import LocationDropdown from './LocationDropdown'
import Footer from './Footer'

function LocationPage() {
  return (
    <>
    <section className='container location-container'>
    <div className='row'>
        <div className='col-12 text-center'>
            <h1 className='text-light'>Select your location: </h1>
            <LocationDropdown />
        </div>
    </div>
    </section>
    <Footer />

    </>
    )
}

export default LocationPage