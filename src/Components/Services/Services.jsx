import React from 'react'
import './Services.css'
import service1 from '../../assets/service-1.png'
import service2 from '../../assets/service-2.png'
import service3 from '../../assets/service-3.png'

const Services = () => {
  return (
    <div className='services'>
        <div className='service'>
            <img src={service1} alt="" />
            <div className='caption'>
              <p>App development</p>
            </div>
        </div>

        <div className='service'>
            <img src={service2} alt="" />
            <div className='caption'>
              <p>Web Development</p>
            </div>
        </div>

        <div className='service'>
            <img src={service3} alt="" />
            <div className='caption'>
              <p>IT support</p>
            </div>
        </div>

      
    </div>
  )
}

export default Services
