import React, { useState, useCallback, useEffect } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import drJebImage from "../images/Dr.Jeb.png";
import logo from "../images/logo.png";
import laptopImage from "../images/laptop.png";
import "./SpinningCarousel.css";
import "../styles/landingpage.css";
import SignupModal from "./Signup";
import LoginModal from "./Login";
import { Navbar, Footer, FAQs } from "./custom";
import About from "./About.component";
import Contact from "./contact.component";
import BlogGuestPage from "./BlogGuestPage";
import TestimonialsPage from "./TestimonialsPage";
import { FaRegClock } from "react-icons/fa6";
import { GoBriefcase } from "react-icons/go";
import { MdOutlineHighQuality } from "react-icons/md";
import ServiceCarousel from "./ServiceCarousel";
import { useNavigate } from "react-router-dom";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";
import { Skeleton } from "@mui/material";
import { LocationCityTwoTone, Phone, PhoneAndroid } from "@mui/icons-material";

const API_URL = "https://backend-vp67.onrender.com";
const LandingPage = () => {
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNavLink, setActiveNavLink] = useState("ABOUT");
  const [showCarousel, setShowCarousel] = useState(false);

  const totalSlides = 5;
  const [view, setView] = useState("Home");

  const [visibleTestimonies, setVisibleTestimonies] = useState(1);

  const navigate = useNavigate();

  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${API_URL}/Feedback/feedback`);
        const data = await response.json();
        if (response.ok) {
          setTestimonies(data.feedback);
        } else {
          console.error("Failed to load feedback:", data.message);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleViewMore = () => {
    setView("Testimonials");
    window.scrollTo(0, 0);
  };

  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    setView(navLink);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const updateSlideTransforms = useCallback(() => {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
      const angle = (index - currentSlide) * 72;
      slide.style.transform = `rotateY(${angle}deg) translateZ(250px)`;
      slide.style.backgroundColor =
        index === currentSlide ? "#2C6975" : "#C7EAED";
      slide.style.opacity = index === currentSlide ? 1 : 0.5;
    });
  }, [currentSlide]);

  const showSlide = (n) => {
    setCurrentSlide((n + totalSlides) % totalSlides);
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  useEffect(() => {
    updateSlideTransforms();
  }, [updateSlideTransforms]);

  const handleBrowseServices = () => {
    setView("Services");
    window.scrollTo(0, 0);
  };

  const handleServiceClick = () => {
    setView("Services");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-[2000px] mx-auto">
          <Navbar setView={setView} />
        </div>
      </div>

      {view === "Home" && (
        <>
          <div
            className="welcome-section h-[100vh] w-full flex flex-col justify-center items-start text-white bg-cover bg-center md:items-start md:text-left text-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${drJebImage})`,
            }}
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-10">
              <h2 className="lg:text-[2.5rem] text-center md:text-3xl text-2xl text-[#FFFFFF]">
                Welcome to Dr. Jeb’s Practice:
              </h2>
              <p className="lg:text-3xl md:2xl text-xl  text-[#FFFFFF]">
                Empowering Your
              </p>
              <p className="text-5xl md:text-3xl text-center font-bold text-[#FFFFFF]">
                Mental Wellness Journey
              </p>
              <p className="lg:text-xl md:text-lg text-center text-md text-[#FFFFFF]">
                Find Relief, Growth, and Understanding through compassionate
                counseling.
              </p>
              <button
                onClick={handleOpenLoginModal}
                className="md:px-10 md:py-4 py-2 px-5 bg-[#2C6975] text-2xl md:text-md  font-bold text-white rounded-full shadow-md hover:bg-[#1b4e54] sm:mx-auto"
              >
                Schedule an Appointment
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow mt-10">
            <div className="squares-section flex flex-wrap justify-center gap-8 mb-10">
              <div className="square w-80 h-[150px] bg-white border-2 border-[#2C6975] text-[#000000] flex flex-col items-center justify-center rounded-lg transform transition-transform duration-300 hover:translate-y-[-10px] hover:scale-110 hover:shadow-lg">
                <span className="text-lg flex items-center gap-2 text-[#2C6975]">
                  <FaRegClock className="text-2xl" />
                  24/7 Availability
                </span>
                <p className="text-sm text-center mt-2 px-2">
                  {" "}
                  Access support whenever you need it, day or night, ensuring
                  timely care.
                </p>
              </div>
              <div className="square w-80 h-[150px] bg-white border-2 border-[#2C6975] text-[#000000] flex flex-col items-center justify-center rounded-lg transform transition-transform duration-300 hover:translate-y-[-10px] hover:scale-110 hover:shadow-lg">
                <span className="text-lg flex items-center gap-2 text-[#2C6975]">
                  <GoBriefcase className="text-2xl" />
                  18 Experiences
                </span>
                <p className="text-sm text-center mt-2 px-2">
                  {" "}
                  Benefit from extensive expertise honed through dedicated
                  practice.
                </p>
              </div>
              <div className="square w-80 h-[150px] bg-white border-2 border-[#2C6975] text-[#000000] flex flex-col items-center justify-center rounded-lg transform transition-transform duration-300 hover:translate-y-[-10px] hover:scale-110 hover:shadow-lg">
                <span className="text-lg flex items-center gap-2 text-[#2C6975]">
                  <MdOutlineHighQuality className="text-3xl" />
                  Top-notch Treatment
                </span>
                <p className="text-sm text-center mt-2 px-2">
                  Receive exceptional care and support, delivered with expertise
                  and compassion.
                </p>
              </div>
            </div>

            <div className="text-center mb-4">
              <h1
                className="text-3xl font-bold text-[#2C6975] mt-10 cursor-pointer"
                onClick={handleServiceClick}
              >
                Services
              </h1>
              <p className="text-3xl text-gray-700 mt-10 mb-10">
                Empowering Therapy Solutions for every Individual
              </p>
            </div>

            <div className="relative w-[300px] h-[200px] mt-5">
              <div className="carousel-wrapper absolute w-full h-full flex justify-center items-center">
                {[...Array(totalSlides)].map((_, index) => (
                  <div
                    key={index}
                    className="carousel-slide absolute top-0 left-0 w-full h-full rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                    style={{
                      opacity: 0.5,
                    }}
                  >
                    {index < 5 ? (
                      <span className="text-white text-center">
                        {
                          [
                            "Psychotherapy and Counseling",
                            "Psycho Education",
                            "Workshops and Training",
                            "Research",
                            "Psycho legal-reports",
                          ][index]
                        }
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
                <button
                  className="prev-btn absolute top-1/2 -translate-y-1/2 left-[-200px] border border-[#2C6975] bg-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer z-10"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <span className="text-[#2C6975]">&lt;</span>
                </button>
                <button
                  className="next-btn absolute top-1/2 -translate-y-1/2 right-[-200px] border border-[#2C6975] bg-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer z-10"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <span className="text-[#2C6975]">&gt;</span>
                </button>
              </div>
            </div>

            <div className="carousel-dots flex justify-center mt-12">
              {[...Array(totalSlides)].map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot w-2.5 h-2.5 mx-1 rounded-full ${
                    index === currentSlide ? "bg-[#68B2A0]" : "bg-[#C7EAED]"
                  } cursor-pointer`}
                  onClick={() => showSlide(index)}
                />
              ))}
            </div>

            <div className="flex justify-center action-buttons gap-8 mt-7">
              <button
                onClick={handleOpenLoginModal}
                className="rounded-full px-9 py-4 text-white text-sm  font-medium"
                style={{
                  background: "linear-gradient(to right, #074653, #109CB9)",
                }}
              >
                Book an Appointment
              </button>
              <button
                className="rounded-full px-9 py-4 text-black  text-sm  font-medium"
                onClick={handleBrowseServices}
                style={{
                  background:
                    "linear-gradient(to right, #9BC8CA, #64c0c2, #2B8B8E)",
                }}
              >
                Browse Services
              </button>
            </div>

            {/* Testimonies section */}
            <div className="bg-[#F6FBFB] py-10 w-full mt-10">
              <div className="flex flex-col items-center mt-12">
                <h2 className="text-3xl font-bold text-[#2C6975] mt-4">
                  Testimonies
                </h2>
                <p className="text-gray-700 mt-2 text-center text-2xl">
                  Client Stories: Real Experiences, Real Results
                </p>

                {/* Show only the first testimony */}
                {testimonies.filter((t) => t.rating === 5).length > 0 &&
                  (() => {
                    const fiveStarTestimonies = testimonies.filter(
                      (t) => t.rating === 5
                    );
                    const randomTestimony =
                      fiveStarTestimonies[
                        Math.floor(Math.random() * fiveStarTestimonies.length)
                      ];

                    return (
                      <div
                        className="mt-20 w-[90%] md:w-[40%] bg-white shadow-md rounded-lg p-6 border-b-4"
                        style={{ borderColor: "#2C6975" }}
                      >
                        <div className="flex items-center flex-col md:flex-row justify-between mb-4">
                          <div className="flex items-center ml-10">
                            <div
                              className="rounded-full h-10 w-10 flex items-center justify-center text-white"
                              style={{ backgroundColor: "#2C6975" }}
                            >
                              <span className="font-bold text-lg">
                                {randomTestimony.displayName
                                  ? randomTestimony.email.charAt(0)
                                  : "A"}
                              </span>
                            </div>
                            <div className="ml-4">
                              <h3 className="font-semibold text-xl">
                                {randomTestimony.displayName
                                  ? randomTestimony.email
                                  : "Anonymous"}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {new Date(
                                  randomTestimony.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-[#2C6975]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-center">
                          "{randomTestimony.feedback}"
                        </p>
                      </div>
                    );
                  })()}

                {/* Update the View More button */}
                <button
                  onClick={handleViewMore}
                  className="mt-6 text-[#2C6975] font-bold flex items-center hover:underline group transition-all duration-300"
                >
                  View All Testimonials
                  <span className="ml-1 font-bold transform group-hover:translate-x-1 transition-transform duration-300">
                    &#8594;
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full px-4 md:px-0 my-12">
            <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto">
              <img
                src={laptopImage}
                alt="laptop"
                className="h-[600px] md:ml-[100px] transform transition-transform duration-300 hover:scale-105"
              />
              <div className="flex flex-col items-center  md:max-w-[400px] md:ml-[80px]">
                <p className="text-xl text-center leading-relaxed text-gray-700 font-medium mb-8 md:mb-12">
                  Take the first step towards a
                  <span className="text-[#2C6975] font-semibold">
                    {" "}
                    brighter tomorrow{" "}
                  </span>
                  by scheduling your appointment today.
                </p>
                <button
                  onClick={handleOpenLoginModal}
                  className="px-10 py-4 bg-[#2C6975] text-xl font-bold text-white rounded-[50px] shadow-md hover:bg-[#1b4e54] transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Schedule an Appointment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {view === "Testimonials" && (
        <>
          {loading ? (
            <Skeleton />
          ) : (
            <TestimonialsPage
              testimonies={testimonies}
              setView={() => setView("Home")}
            />
          )}
        </>
      )}
      {view === "About" && <About />}
      {view === "Services" && (
        <div className="pt-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-[#2C6975] mb-4">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Comprehensive Mental Health Care Solutions
              </p>

              {/* Service Carousel */}
              <ServiceCarousel />

              {/* Additional Information */}
              <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold text-[#2C6975] mb-8">
                  Why Choose Our Services?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2C6975] mb-3">
                      Professional Excellence
                    </h3>
                    <p className="text-gray-600">
                      Licensed mental health professionals with years of
                      experience.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2C6975] mb-3">
                      Personalized Approach
                    </h3>
                    <p className="text-gray-600">
                      Tailored treatment plans that address your unique needs.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2C6975] mb-3">
                      Safe Environment
                    </h3>
                    <p className="text-gray-600">
                      Confidential and comfortable setting for your journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Appointment CTA */}
              <div className="mt-16 mb-8 text-center">
                <button
                  onClick={handleOpenLoginModal}
                  className="bg-[#2C6975] text-white px-8 py-3 rounded-full hover:bg-[#1b4e54] transition-colors duration-300"
                >
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {view === "Blog" && (
        <div className="md:mt-[5%] mt-[15%]">
          <BlogGuestPage />
        </div>
      )}
      {view === "Terms of Use" && <TermsOfUse />}
      {view === "Privacy Policy" && <PrivacyPolicy />}
      {view === "Contact" && (
        <div className="mt-[5%]">
          <Contact />
          <FAQs showBack={false} />
        </div>
      )}
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <SignupModal
        open={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />

      {view === "guestBlog" && (
        <div className="mt-[5%]">
          <BlogGuestPage />
        </div>
      )}
      <section className="bottomNavlinks px-4 mb-5">
        {[
          "Home",
          "About",
          "Services",
          "Contact",
          "Blog",
          "Terms of Use",
          "Privacy Policy",
        ].map((navLink) => (
          <a
            key={navLink}
            href={`/${navLink.toLowerCase().replace(/ /g, "")}`}
            className={`navlinks ${
              activeNavLink === navLink && activeNavLink !== "Home"
                ? "underline"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick(navLink);
            }}
          >
            {navLink}
          </a>
        ))}
      </section>
      <footer className="bg-[#2C6975] text-white py-10">
        <div className="container mx-auto px-10">
          <div className="flex items-center flex-wrap justify-center md:justify-between mb-10">
            <div className="flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-auto" />
            </div>
            <div className="text-center max-w-2xl">
              <h3 className="font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-lg">
                Embracing diversity and empathy, providing a supportive platform
                for personal growth and mental wellness.
              </p>
              <p className="text-white text-xl mt-10">
                Opening Hours: Mon - Fri 8AM - 5 PM
              </p>
            </div>
            <div className="w-[200px]"></div>
          </div>
          {/* Divider */}
          <div className="border-b border-white-600 mb-8"></div>

          {/* Other Footer Content */}
          <div className="flex justify-between flex-col md:flex-row gap-8 mb-6">
            {/* Location Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <p className="mb-2 flex items-center">
                <LocationCityTwoTone />
                Cebu City
              </p>
              <p className="mb-4 flex items-center">
                <PhoneAndroid /> +63 956 554 0992
              </p>
            </div>

            {/* Keep Connected Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Keep Connected</h3>
              <div className="flex space-x-6">
                <a href="#linkedin" className="hover:text-gray-300">
                  <FaLinkedin size={24} />
                </a>
                <a href="#instagram" className="hover:text-gray-300">
                  <FaInstagram size={24} />
                </a>
                <a href="#whatsapp" className="hover:text-gray-300">
                  <FaWhatsapp size={24} />
                </a>
                <a href="#facebook" className="hover:text-gray-300">
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 pt-4">
            <p className="text-sm text-center">
              © 2024 Dr. Jeb. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <SignupModal
        open={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
    </div>
  );
};

export default LandingPage;
