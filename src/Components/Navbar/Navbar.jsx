import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <img src={logo} alt="TechViRa Logo" className="logo" />

      <ul className="nav-right">
        <li>
          <a href="#home" className={active === "home" ? "active" : ""}>
            Home
          </a>
        </li>

        <li>
          <a href="#about" className={active === "about" ? "active" : ""}>
            About Us
          </a>
        </li>

        <li>
          <a href="#services" className={active === "services" ? "active" : ""}>
            Services
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className={`contact-btn ${
              active === "contact" ? "active" : ""
            }`}
          >
            Contact Us
          </a>
        </li>

        {/* ✅ ADMIN LOGIN BUTTON */}
        <li>
          <Link to="/admin-login" className="admin-login-btn">
            Admin Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
