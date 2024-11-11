import React from 'react';

const TermsOfUse = () => {
  const effectiveDate = new Date().toLocaleDateString();

  return (
    <>
      <header className="bg-white shadow-md py-4 mb-6 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#2C6975] text-center">
            Terms of Use
          </h1>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#2C6975] mb-6">Terms of Use</h1>
          <p className="text-gray-600 mb-4">Effective Date: {effectiveDate}</p>
          
          <div className="space-y-6">
            <section>
              <p className="mb-4">
                Welcome to SafePlace. By accessing or using the SafePlace platform, you agree to comply with these Terms of Use. If you disagree with any part of the terms, you may not access the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">Service Overview</h2>
              <p className="text-gray-700">
                SafePlace is an online appointment management system designed to facilitate the scheduling and communication needs of Dr. Jeb Bohol's practice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">User Responsibilities</h2>
              <div className="ml-4">
                <h3 className="font-semibold mb-2">For Patients:</h3>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>You agree to provide accurate information when scheduling appointments and uploading payment receipts.</li>
                  <li>Appointment bookings and communication with Dr. Bohol must be used solely for legitimate healthcare purposes.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">For Dr. Bohol:</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>You are responsible for setting availability, approving appointments, and manually sending email reminders as needed.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;