import React from 'react';

const PrivacyPolicy = () => {
  const effectiveDate = new Date().toLocaleDateString();

  return (
    <>
      <header className="bg-white shadow-md py-4 mb-6 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#2C6975] text-center">
            Privacy Policy
          </h1>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#2C6975] mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Effective Date: {effectiveDate}</p>
          
          <div className="space-y-6">
            <section>
              <p className="mb-4">
                This Privacy Policy explains how SafePlace collects, uses, and discloses information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">Data Collection</h2>
              <p className="text-gray-700">
                SafePlace collects personal information that is voluntarily provided by patients and Dr. Jeb Bohol, including names, email addresses, appointment times, and uploaded payment receipts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">Data Usage</h2>
              <p className="text-gray-700">
                SafePlace uses this information solely for managing appointments, sending reminders, and facilitating communication between Dr. Jeb and his patients.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 