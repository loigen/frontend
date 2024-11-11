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
        At [Your Company Name], we value your privacy and are committed to
        protecting your personal information. This Privacy Policy outlines how
        we collect, use, and safeguard your data.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>We may collect the following types of information from you:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal details (e.g., name, email address, phone number)</li>
          <li>Payment information for purchases or services</li>
          <li>Usage data, such as browsing behavior on our website</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p>Your information is used to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide and maintain our services</li>
          <li>Process transactions and send notifications</li>
          <li>Improve our website and customer experience</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
        <p>
          We do not share your personal information with third parties, except
          when:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Required by law or legal process</li>
          <li>Necessary to protect our rights and safety</li>
          <li>You give consent to share your information</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Access and update your personal information</li>
          <li>Request the deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:support@yourcompany.com"
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
