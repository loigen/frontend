import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const FAQSection = ({ setView }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
    // Add more FAQs as needed
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-section w-full max-w-3xl mx-auto py-8 px-4 bg-[#2c6975] text-white">
      <p
        onClick={() => setView("settings")}
        className="text-black"
        style={{ cursor: "pointer", marginBottom: "1rem" }}
      >
        Back
      </p>
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="faq-list space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item border border-white rounded-lg p-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <IconButton color="inherit">
                {expandedIndex === index ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
            {expandedIndex === index && (
              <div className="faq-answer mt-2 text-black bg-white p-3 rounded-lg">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
