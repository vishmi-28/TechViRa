import React from 'react';
import './AboutUs.css';
import aboutUsImg from '../../assets/about-us.png';
import aboutUsImg2 from '../../assets/about-us1.png';

const AboutUs = () => {
  return (
    <div className='aboutus'>

      
      <div className='aboutus-header'>
        <h3>ABOUT COMPANY</h3>
        <h2>Who We Are</h2>
      </div>

      
      <div className='aboutus-row'>
        <div className='aboutus-image'>
          <img src={aboutUsImg} alt="Company Background" />
        </div>

        <div className='aboutus-content'>
          <h2>Company Background</h2>
          <p>
            The company focuses on helping organizations build a strong digital
            presence through innovative technology and practical solutions.
            By combining technical expertise with a customer-focused approach,
            TechViRa supports businesses in improving efficiency, enhancing
            productivity, and achieving sustainable growth in a competitive
            digital environment.
          </p>
        </div>
      </div>

      
      <div className='aboutus-row reverse'>
        <div className='aboutus-content'>
          <h2>Mission</h2>
          <p>
            The mission of TechViRa is to deliver high-quality IT services that
            drive business success and digital transformation. The company is
            committed to providing innovative, secure, and scalable solutions
            that address real-world business challenges.
          </p>
        </div>

        <div className='aboutus-image'>
          <img src={aboutUsImg2} alt="Mission" />
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
