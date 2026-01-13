import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-logo">TechViRa</h2>
          <p>
            TechViRa Solutions is an IT services company delivering smart and
            reliable technology solutions for businesses and startups.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Web Development</li>
            <li>Application Development</li>
            <li>IT Support</li>
            <li>Digital Solutions</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@techvira.com</p>
          <p>Phone: +91 1234567890</p>
          <p>Address: 65, Raju Street, AVM Colony, Chennai</p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechViRa. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
