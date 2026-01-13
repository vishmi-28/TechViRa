import { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show backend-provided error if exists
        throw new Error(data.error || data.message || "Server error");
      }

      alert("✅ Message sent successfully!");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      alert(`❌ Failed to send message: ${error.message}`);
    } finally {
      setLoading(false);
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
          <p>Feel free to reach out through the contact form or find our contact information below.</p>
          <ul>
            <li>📧 Contact@TechViRa</li>
            <li>📞 +91 1234567890</li>
            <li>📍 65, Raju Street, AVM Colony, Chennai</li>
          </ul>
        </div>

        <div className="contactus-col">
          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
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

            <label>Write your message here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn dark-btn" disabled={loading}>
              {loading ? "Sending..." : "Submit Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
