import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './logowhite.png'
import Footer from './Footer'

function Splash() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/location');
    };


    return (
        <>
            <section className='container splash-container'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-6 col-xl-4'>
                        <img className=" img img-fluid " src={logo}></img>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-5">
                    <button className="btn btn-lg btn-start ps-5 pe-5 rounded-pill border-2 text-light" onClick={handleGetStarted}>Get Started</button>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-5">
                    <button className='btn btn-q'></button>
                    </div> 
                </div>
            </section>
            <Footer />

        </>
    )
}

export default Splash