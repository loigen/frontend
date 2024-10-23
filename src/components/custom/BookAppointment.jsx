import React, { useState } from 'react';

const BookingPage = ({ onBackToActive }) => {
  const [selectedService, setSelectedService] = useState('');
  const [preferredMethod, setPreferredMethod] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Back Button */}
      <button className="bg-teal-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full mb-4 md:mb-8 shadow-md" onClick={onBackToActive}>
        Go back
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Service Selection */}
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Kindly specify the service you need here</h3>
          <ul>
            {[
              { name: 'Individual Counseling', price: 'P 450' },
              { name: 'Family Counseling', price: 'P 450' },
              { name: 'Couple Counseling', price: 'P 450' },
              { name: 'Therapy', price: 'P 450' },
              { name: 'Psychological report', price: 'P 450' },
              { name: 'Seminars and Workshop', price: 'P 450' },
            ].map((service, idx) => (
              <li key={idx} className="mb-4">
                <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-teal-50 cursor-pointer">
                  <div>{service.name}</div>
                  <div className="text-teal-600">{service.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule Selection */}
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Select your preferred schedule here</h3>
          <div className="mb-4">
            {/* Calendar */}
            <div className="flex items-center justify-between mb-4">
              <button className="text-teal-600">&lt;</button>
              <h4 className="text-center text-lg">September 2024</h4>
              <button className="text-teal-600">&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center gap-2">
              {/* Days */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="font-semibold text-gray-500">{day}</div>
              ))}
              {/* Dates */}
              {[...Array(30).keys()].map(i => (
                <div key={i} className={`p-2 rounded-full ${i === 13 ? 'bg-teal-600 text-white' : 'hover:bg-gray-200 cursor-pointer'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* Time Slots */}
            <div className="flex justify-between my-4">
              {['8:00 AM', '9:00 AM', '10:00 AM'].map(time => (
                <button key={time} className="bg-teal-50 border border-teal-600 rounded-lg px-4 py-2 text-teal-600 hover:bg-teal-100">{time}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Information Form */}
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Patient Information Form</h3>

          <p className="mb-4 text-gray-600">We aim to make this process smooth and stress-free. Please fill out the following details at your own pace. Your information will be handled with the utmost care.</p>

          <form>
            {/* Primary Complaint */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">1. Mental Health Information</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                rows="3"
                placeholder="e.g., Feeling overwhelmed by daily tasks or emotions."
              ></textarea>
            </div>

            {/* History of Intervention */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">2. History of Intervention</label>
              <div className="flex items-center mb-2">
                <input type="radio" name="intervention" id="yes" className="mr-2" />
                <label htmlFor="yes" className="mr-4">Yes</label>
                <input type="radio" name="intervention" id="no" className="mr-2" />
                <label htmlFor="no">No</label>
              </div>
              <textarea
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                rows="2"
                placeholder="e.g., 'I attended group therapy for social anxiety a few months ago'"
              ></textarea>
            </div>

            {/* Consultation Method */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">3. Preferred Consultation Method</label>
              <div className="flex items-center">
                <input type="radio" name="consultationMethod" id="online" className="mr-2" />
                <label htmlFor="online" className="mr-4">Online</label>
                <input type="radio" name="consultationMethod" id="faceToFace" className="mr-2" />
                <label htmlFor="faceToFace">Face-to-Face</label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms">I agree to the <a href="#" className="text-teal-600 underline">terms and conditions</a>.</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-teal-700">Proceed</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
