import "./Navbar.css";
import logo from "../../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="TechViRa Logo" className="logo" />

      <ul className="nav-right">
        <li>Home</li>
        <li>About Us</li>
        <li>Services</li>
        <li>
          <button className="contact-btn">Contact Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
