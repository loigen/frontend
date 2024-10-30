import React, { useState } from "react";
import emailjs from "emailjs-com";
import image from "../../images/Frame 1.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    emailjs
      .send(
        "service_j8to979", // Replace with your service ID
        "template_x8c8qqr", // Replace with your template ID
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message,
        },
        "PlehHeTc0gVLr7rLn" // Replace with your user ID
      )
      .then(
        (response) => {
          setStatusMessage("Message sent successfully!");
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
        },
        (error) => {
          setStatusMessage("Failed to send message, please try again.");
        }
      )
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  // Check if all fields are filled
  const isFormFilled =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.message;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-[#2C6975]">Contact Us</h1>
          <p className="text-gray-500">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-3/5">
          {/* Left Section: Contact Information */}
          <div
            className="text-white w-full md:w-1/2 p-8 flex justify-between flex-col"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-sm mb-6 text-[#C9C9C9]">
                Say something to start a live chat!
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center cursor-pointer">
                <PhoneIcon className="mr-4" />
                <span>+1012 3456 789</span>
              </div>
              <div className="flex items-center cursor-pointer">
                <EmailIcon className="mr-4" />
                <span>safeplace@gmail.com</span>
              </div>
              <div className="flex items-center cursor-pointer">
                <LocationOnIcon className="mr-4" />
                <span>New Era street Mabolo Cebu City, 6000</span>
              </div>
            </div>

            <div className="mt-8 flex space-x-4 items-end">
              <TwitterIcon className="cursor-pointer" />
              <InstagramIcon className="cursor-pointer" />
              <FacebookIcon className="cursor-pointer" />
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#68B2A0]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#68B2A0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#68B2A0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message.."
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#68B2A0]"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`bg-[#2C6975] text-white px-6 py-2 rounded-md hover:bg-[#358898] focus:outline-none w-full md:w-auto ${
                  isLoading || !isFormFilled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`} // Disable styling
                disabled={isLoading || !isFormFilled} // Disable button
              >
                {isLoading ? <>Sending...</> : "Send Message"}
              </button>
            </form>
            {statusMessage && <p className="mt-4 text-sm">{statusMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
