import { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Message sent successfully ");
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="contact-title">
        <h5>CONTACT US</h5>
        <h2>Get in Touch</h2>
      </div>

      <div className="contactus">
        <div className="contactus-col">
          <h3>Send us a message 📩</h3>

          <p>
            Feel free to reach out through contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptional service.
          </p>

          <ul>
            <li>📧 Contact@TechViRa</li>
            <li>📞 +91 1234567890</li>
            <li>📍 65, Raju Street, AVM Colony, Chennai</li>
          </ul>
        </div>

        <div className="contactus-col">
          <form onSubmit={handleSubmit}>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Write your messages here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn dark-btn">
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
