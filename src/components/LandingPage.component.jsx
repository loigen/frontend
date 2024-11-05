import React, { useState } from "react";
import "../styles/landingpage.css";
import clock from "../images/ph_clock-thin.png";
import exp from "../images/experience.png";
import hq from "../images/hq.png";
import quote from "../images/quote.png";
import clientPhoto from "../images/clientPhoto.png";
import { Navbar, Courosel, Footer } from "./custom";
import SignupModal from "./Signup";
import LoginModal from "./Login";
import About from "./About.component";
import Services from "./Services";
import Contact from "./contact.component";
import BlogGuestPage from "./BlogGuestPage";

const testimonies = [
  {
    id: 1,
    name: "Rizalyn Q.",
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
  },
  {
    id: 2,
    name: "Loigen L.",
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
  },
  {
    id: 3,
    name: "Geraldine G.",
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
  },
  {
    id: 4,
    name: "Jackilou F.",
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
  },
];

const LandingPage = () => {
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState("ABOUT");
  const [view, setView] = useState("Home");
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

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleNext = () => {
    setCurrentTestimonyIndex(
      (prevIndex) => (prevIndex + 2) % testimonies.length
    );
  };

  const handlePrev = () => {
    setCurrentTestimonyIndex(
      (prevIndex) => (prevIndex - 2 + testimonies.length) % testimonies.length
    );
  };

  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
  };

  return (
<<<<<<< Updated upstream
    <>
      <Navbar setView={setView} />
=======
    <div className="flex flex-col min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0  bg-white shadow-md">
        <div className="max-w-[2000px] mx-auto">
          <Navbar setView={setView} />
        </div>
      </div>
>>>>>>> Stashed changes

      {view === "Home" && (
        <>
          <div className="bg-slate-100 h-96"></div>
          <section className="content">
            <div className="titleSection">
              <h2 className="welcome">
                Welcome to Dr. Jeb Bohol{"'"}s Practice:{" "}
              </h2>
              <h2 className="welcome">Empowering Your</h2>
              <h1 className="title">Mental Wellness Journey</h1>
            </div>
            <b className="subtitle">
              Find Relief, Growth, and Understanding Through Compassionate{" "}
              <br /> Counseling
            </b>
            <a onClick={handleOpenLoginModal} className="appointmentButton ">
              Schedule an Appointment
            </a>
            <section className="cards">
              <div className="card">
                <div className="top">
                  <img src={clock} alt="" />
                  <p>24/7 Availability </p>
                </div>

                <div>
                  <p>
                    {" "}
                    Access support whenever you need it, day or night, ensuring
                    timely care.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="top">
                  <img src={exp} alt="" />
                  <p>18 experiences </p>
                </div>

                <div>
                  <p>
                    {" "}
                    Access support whenever you need it, day or night, ensuring
                    timely care.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="top">
                  <img src={hq} alt="" />
                  <p>Top-notch Treatment </p>
                </div>

                <div>
                  <p>
                    {" "}
                    Access support whenever you need it, day or night, ensuring
                    timely care.
                  </p>
                </div>
              </div>
            </section>
            <section className="quote">
              <img src={quote} alt="" />
            </section>
            <section className="about">
              <div className="clientImage">
                <img src={clientPhoto} alt="sir Doe" />
              </div>
              <div className="description">
                <center>
                  {" "}
                  <h1>About Me </h1>
                </center>
                <p>A dedicated psychologist with a core mission to help.</p>
                <b>Jeb Bohol, PhD , RPsy - Psychologist</b>
                <p>
                  Hello! I am a clinical psychologist operating in the
                  Philippines. To know more click About Me.
                </p>
                <div className="btns">
                  <a onClick={handleOpenLoginModal} className="book">
                    Book an Appointment
                  </a>
                  <button className="Aboutlink">About Me</button>
                </div>
              </div>
            </section>
            <section className="services">
              <h1>Services</h1>
              <h2>
                Empowering Therapy <br /> Solutions for Every Individual
              </h2>
              <Courosel />
              <div className="btns2">
                <a onClick={handleOpenLoginModal} className="book text-center">
                  Book an Appointment
                </a>{" "}
                <button className="Aboutlink">Browse Services</button>
              </div>
            </section>
            <section className="testimonies">
              <div>
                <center>
                  {" "}
                  <h1> Testimonies</h1>
                </center>
                <h2>Client Stories: Real Experiences, Real Result</h2>
              </div>
              <div className="testimonyContainer">
                {testimonies
                  .slice(currentTestimonyIndex, currentTestimonyIndex + 2)
                  .map((testimony) => (
                    <div key={testimony.id} className="testimony">
                      <div className="name">
                        <div className="profile"></div>
                        <p>{testimony.name}</p>
                      </div>
                      <p>{testimony.text}</p>
                    </div>
                  ))}
              </div>
              <div className="pagination">
                <button onClick={handlePrev}>o</button>
                <button onClick={handleNext}>o</button>
              </div>
            </section>

            <section className="bottomBanner">
              <a onClick={handleOpenLoginModal}>Schedule an Appointment</a>
            </section>
            <section className="bottomNavlinks">
              {[
                "HOME",
                "ABOUT",
                "SERVICE",
                "CONTACT",
                "PRIVACY POLICY",
                "TERMS OF USE",
              ].map((navLink) => (
                <a
                  key={navLink}
                  href={`/${navLink.toLowerCase().replace(/ /g, "")}`}
                  className={`navlinks ${
                    activeNavLink === navLink ? "active" : ""
                  }`}
                  onClick={() => handleNavLinkClick(navLink)}
                >
                  {navLink}
                </a>
              ))}
            </section>
            <h1 className="bottomH1">Opening Hours : Mon-Friday 8AM - 5 PM</h1>
          </section>
          <hr />
          <section>
            <Footer />
          </section>
        </>
      )}
      {view === "About" && <About />}
      {view === "Services" && <Services />}
<<<<<<< Updated upstream
      {view === "Contact" && <Contact />}
      {view === "guestBlog" && <BlogGuestPage />}
=======
      {view === "Contact" && (
        <div className="mt-[5%]">
          <Contact />
        </div>
      )}
      {view === "guestBlog" && (
        <div className="mt-20 bg-[#E9F1EF]">
          <BlogGuestPage />
        </div>
      )}
      <section className="bottomNavlinks mb-5 mt-5">
        {["Home", "About", "Services", "Contact", "guestBlog"].map(
          (navLink) => (
            <a
              className="uppercase cursor-pointer"
              onClick={() => setView(navLink)}
            >
              {navLink}
            </a>
          )
        )}
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
          <div className="flex justify-between gap-8 mb-6">
            {/* Location Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <p className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <p className="mb-4">Contact us: 0956 554 0992</p>
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
>>>>>>> Stashed changes
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
      <SignupModal
        open={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
    </>
  );
};

export default LandingPage;
