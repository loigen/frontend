import { ChevronLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const PrivacyPolicy = ({ setView, showBack }) => {
  return (
    <div className="privacy-policy p-6 max-w-4xl mx-auto">
      {showBack && (
        <p
          onClick={() => setView("settings")}
          className="text-[#2c6975] hover:underline cursor-pointer mb-4"
        >
          <Tooltip arrow title="Back">
            <ChevronLeft />
          </Tooltip>
        </p>
      )}
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p>
        At Safeplace, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your data.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>We may collect the following types of information from you:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal details (e.g., name, email address, phone number)</li>
          <li>
            Payment receipts and transaction details for manual verification
          </li>
          <li>
            Interaction data to understand usage patterns and improve the
            platform
          </li>
          <li>
            Cookies and tracking technologies to enhance site functionality and
            user experience
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p>Your information is used to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide and manage appointments between patients and Dr. Jeb</li>
          <li>
            Facilitate secure messaging and patient-provider communication
          </li>
          <li>Verify payment submissions for confirmed bookings</li>
          <li>
            Send reminders and notifications about upcoming appointments or
            changes
          </li>
          <li>Improve platform performance through analysis of usage data</li>
          <li>
            Ensure compliance with medical and data protection regulations
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
        <p>
          We do not share your personal information with third parties, except
          when:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Legally required by law or in response to a legal request</li>
          <li>Necessary for service security or system maintenance</li>
          <li>Express consent is provided by the user for specified cases</li>
          <li>
            Partner services such as secure email or notification platforms
            (used only for communication purposes)
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Access and update your personal information through your SafePlace
            account
          </li>
          <li>
            Request deletion of your data, subject to legal and compliance
            requirements
          </li>
          <li>Withdraw consent for specific data usage</li>
          <li>
            Opt-out of non-essential notifications and marketing communications
          </li>
        </ul>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-semibold">5. Data Security</h2>
        <p>
          We take your privacy seriously and have implemented measures to
          ensure:
        </p>
        <li>Encryption of sensitive information during transmission</li>
        <li>
          Access control protocols to restrict data access to authorized
          personnel only
        </li>
        <li>
          Regular security audits to detect and respond to potential
          vulnerabilities
        </li>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-semibold">5. Data Security</h2>
        <p>Your information is retained only as long as necessary:</p>
        <li>To fulfill the purposes described in this policy</li>
        <li>To comply with legal and medical record-keeping requirements</li>
      </section>
      <section className="mt-6">
        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:safeplacewithdr.jeb@gmail.com"
            className="text-blue-600 underline"
          >
            safeplacewithdr.jeb@gmail.com
          </a>
          .
        </p>
      </section>

      <p className="mt-6 text-sm text-gray-500">Last updated: 11-08-2024</p>
    </div>
  );
};

export default PrivacyPolicy;
