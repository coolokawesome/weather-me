import React from 'react'
import LocationDropdown from './LocationDropdown'
import Footer from './Footer'

function LocationPage() {
  return (
    <>
<div className='container d-flex justify-content-center'>
    <div className='container col-12 col-md-8 col-lg-6'>
    <section className='container location-container'>
    <div className='row'>
        <div className='col-12 text-center'>
            <h1 className='text-light'>Select your location: </h1>
            <LocationDropdown />
        </div>
    </div>
    </section>
    <Footer />
    </div>
</div>

    </>
    )
}

export default LocationPage