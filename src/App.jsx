import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Services from "./Components/Services/Services";
import Title from "./Components/Title/Title";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Footer from "./Components/Footer/Footer";

import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";

const Home = () => {
  return (
    <div>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <div className="container">
        <section id="services">
          <Title subTitle="Our Services" title="What We Offer" />
          <Services />
        </section>

        <section id="about">
          <AboutUs />
        </section>

        <section id="contact">
          <ContactUs />
        </section>

        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public Website */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
