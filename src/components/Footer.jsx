import React from 'react'

function Footer() {
  return (

    <div className="footer-container container col-12 d-flex justify-content-center  text-center">
        <div className="row">
            <div className="">
                <a href="http://github.com/coolokawesome/" className='link-light' target={'_blank'}>
                     Github
                </a>
            </div>
            <div className="">
                <p>Data provied by <a target={'_blank'} className='link-light' href={'https://openweathermap.org/'}>https://openweathermap.org/</a></p>
            </div>
        </div>
    </div>

    )
}

export default Footer