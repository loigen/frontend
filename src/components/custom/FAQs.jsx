import React, { useState } from "react";
import { ExpandMore, ExpandLess, ChevronLeft } from "@mui/icons-material";
import { IconButton, Button, Tooltip } from "@mui/material";

const FAQSection = ({ setView }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "What is SafePlace, and who is it for?",
      answer:
        "SafePlace is a web-based appointment management system designed to help clinical psychologist Dr. Jeb Bohol efficiently manage his appointments and communicate with patients.",
    },
    {
      question: "What are the primary functions of SafePlace?",
      answer:
        "SafePlace allows appointment booking, secure messaging, and semi-automated email reminders, along with manual payment verification.",
    },
    {
      question:
        "How does SafePlace streamline appointment scheduling for Dr. Jeb?",
      answer:
        "The system lets Dr. Jeb set his availability, manage appointments, and send reminders manually, reducing scheduling conflicts and missed appointments.",
    },
    {
      question:
        "Does SafePlace include an automatic payment processing system?",
      answer:
        "No, payments are handled manually by patients, who upload receipts for Dr. Jeb to confirm before finalizing appointments.",
    },
    {
      question: "Is SafePlace accessible across multiple devices?",
      answer:
        "Yes, SafePlace is web-based and can be accessed from any device with internet connectivity.",
    },
    {
      question: "What technology stack powers SafePlace?",
      answer:
        "SafePlace uses Node.js, Express.js, MongoDB, React.js, HTML, CSS, and JavaScript, with development tools like Webpack and GitHub.",
    },
    {
      question: "How are data security and privacy managed in SafePlace?",
      answer:
        "SafePlace uses OAuth 2.0 for secure access and stores data in MongoDB, following industry-standard security protocols.",
    },
    {
      question: "What type of reminder functionality does SafePlace offer?",
      answer:
        "Reminders are semi-automated; Dr. Jeb has the option to manually send email reminders to patients before their appointments.",
    },
    {
      question: "How does SafePlace benefit Dr. Jeb’s patients?",
      answer:
        "It provides patients with easy access to appointment booking, secure communication, and reminders, making the scheduling process more efficient.",
    },
    {
      question: "Does SafePlace integrate with other scheduling tools?",
      answer:
        "No, SafePlace operates independently and does not integrate with third-party calendar systems.",
    },
    {
      question:
        "What role does usability testing play in SafePlace’s development?",
      answer:
        "Usability testing is a key component, ensuring SafePlace is user-friendly and effective for Dr. Jeb and his patients.",
    },
    {
      question: "What are SafePlace’s main modules?",
      answer:
        "The system includes modules for user access, consultation, appointment scheduling, messaging, and semi-automated email reminders.",
    },
    {
      question: "How does the manual payment process work?",
      answer:
        "Patients are required to upload their payment receipts in SafePlace, after which Dr. Jeb manually verifies the payment to confirm the appointment.",
    },
    {
      question: "What challenges does SafePlace address for Dr. Jeb?",
      answer:
        "It simplifies scheduling, reduces missed appointments, and allows efficient communication with patients, saving time and reducing administrative workload.",
    },
    {
      question:
        "How does SafePlace support future development and customization?",
      answer:
        "Built with flexibility in mind, SafePlace serves as a foundation that future developers can build upon to enhance its features and adapt to changing needs.",
    },
    {
      question: "Who can use SafePlace?",
      answer:
        "SafePlace is available for use by Dr. Jeb Bohol and his patients for scheduling and communication.",
    },
    {
      question: "How do patients book an appointment through SafePlace?",
      answer:
        "Patients select available times from Dr. Jeb’s schedule, request appointments, and complete the booking upon payment verification.",
    },
    {
      question: "Is SafePlace mobile-friendly?",
      answer:
        "Yes, SafePlace is accessible on mobile devices through a web browser.",
    },
    {
      question:
        "Does SafePlace allow patients to reschedule or cancel appointments?",
      answer:
        "Yes, patients can reschedule or cancel appointments as long as Dr. Jeb hasn’t confirmed them.",
    },
    {
      question: "How does the messaging feature work?",
      answer:
        "SafePlace includes a messaging module for secure communication between Dr. Jeb and his patients.",
    },
    {
      question: "Are there email notifications for booked appointments?",
      answer:
        "Yes, SafePlace includes email reminders, which Dr. Jeb can manually trigger as needed.",
    },
    {
      question: "Can SafePlace handle multiple user requests at once?",
      answer:
        "Yes, SafePlace is built to manage multiple bookings, messages, and data requests simultaneously.",
    },
    {
      question: "What development model was used to build SafePlace?",
      answer:
        "SafePlace was developed using the Agile model, allowing iterative improvements and user-centered design.",
    },
    {
      question: "What are the limitations of SafePlace?",
      answer:
        "Limitations include the lack of automated payment processing and fully automated reminders, which require manual intervention.",
    },
    {
      question: "How does SafePlace verify user access?",
      answer:
        "User access is verified through secure login using OAuth 2.0 for authentication.",
    },
    {
      question: "What user testing was done for SafePlace?",
      answer:
        "SafePlace went through functional, usability, performance, and security testing to ensure a smooth experience for users.",
    },
    {
      question: "Is there a fee for booking an appointment through SafePlace?",
      answer:
        "The document doesn’t mention a fee structure; patients only need to upload payment receipts for appointment confirmation.",
    },
    {
      question: "How are user credentials stored in SafePlace?",
      answer:
        "Credentials are securely stored using hashing algorithms to protect user information.",
    },
    {
      question: "What feedback led to SafePlace’s creation?",
      answer:
        "The system was developed based on feedback from Dr. Jeb and analysis of other appointment management systems.",
    },
    {
      question: "How does SafePlace improve over traditional scheduling?",
      answer:
        "By centralizing scheduling, reminders, and communication, SafePlace reduces manual workload and offers a more streamlined experience.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const displayedFAQs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="faq-section w-full mt-10 max-w-3xl mx-auto py-8 px-4 bg-white text-[#2c6975] shadow-md rounded-lg">
      <p
        onClick={() => setView("settings")}
        className="text-[#2c6975] hover:underline cursor-pointer mb-4"
      >
        <Tooltip arrow title="Back">
          <ChevronLeft />
        </Tooltip>
      </p>
      <h2 className="text-2xl font-semibold text-center mb-8 text-[#2c6975]">
        Frequently Asked Questions
      </h2>
      <div className="faq-list space-y-3 h-[50vh] overflow-y-scroll">
        {displayedFAQs.map((faq, index) => (
          <div
            key={index}
            className="faq-item border border-[#2c6975] rounded-lg p-4 transition duration-300 ease-in-out hover:bg-[#f1f6f9]"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <IconButton size="small" color="inherit">
                {expandedIndex === index ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
            {expandedIndex === index && (
              <div className="faq-answer mt-2 text-[#2c6975] bg-[#f9fafa] p-3 rounded-md shadow-sm">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button
          variant="contained"
          onClick={() => setShowAll(!showAll)}
          sx={{ background: "#2c6975" }}
          className=" text-white hover:bg-[#1f4e58]"
        >
          {showAll ? "View Less" : "View All"}
        </Button>
      </div>
    </div>
  );
};

export default FAQSection;
