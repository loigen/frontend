// import { AnimatePresence, motion } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ServiceCarousel = () => {
  const services = [
    {
      title: "Psychotherapy and Counseling",
      description:
        "Dr. Jeb Bohol offers personalized counseling and therapy services designed to meet each patient's unique needs. Through a supportive, empathetic environment, he helps clients address a range of mental health challenges, including stress, anxiety, depression, and trauma. His counseling sessions—whether individual or group—encourage self-awareness, resilience, and personal growth. In therapy, he works closely with clients to develop effective coping strategies that support emotional well-being and quality of life, guiding them on a path toward healing and mental balance.",
    },
    {
      title: "Psycho Education",
      description:
        "Dr. Jeb Bohol provides psychoeducation to his clients, equipping them with essential knowledge about mental health conditions, treatments, and coping techniques. This educational support enables clients to make informed decisions, better manage their mental well-being, and actively engage in their therapeutic process. Dr. Bohol uses evidence-based therapeutic techniques to help patients gain clarity, emotional stability, and coping mechanisms necessary for a healthy, balanced life.",
    },
    {
      title: "Workshops and Training",
      description:
        "Dr. Jeb Bohol offers engaging workshops and seminars focused on mental health and psychological well-being. These sessions cover a variety of topics, including stress management, resilience building, coping strategies, and understanding mental health disorders. Tailored for individuals, groups, and organizations, these workshops provide a supportive environment where participants gain valuable insights into mental health, learn practical techniques for personal well-being, and explore ways to enhance emotional resilience. Dr. Jeb's workshops are designed to empower attendees with the knowledge and tools they need for a healthier, more balanced life.",
    },
    {
      title: "Research",
      description:
        "Dr. Jeb Bohol offers research services to his clients, delivering evidence-based insights on various mental health topics. This research informs clients about psychological theories, treatment effectiveness, and the latest advancements in mental health care. By integrating research into his counseling and therapy services, Dr. Bohol ensures that clients receive effective interventions tailored to their unique needs, promoting informed decision-making in their mental health journey.",
    },
    {
      title: "Psycho legal-reports",
      description:
        "Dr. Jeb's psycho-legal reports, available through SafePlace, support clients involved in legal cases where psychological evaluations are essential. These reports include assessments for situations such as annulment, adoption, and other legal matters, providing professional insights that can aid legal proceedings by offering a psychological perspective.",
    },
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const nextService = () => {
    setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setCurrentServiceIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };

  return (
    <div className="flex justify-center items-center space-x-4 py-10 overflow-hidden">
      <button
        onClick={prevService}
        className="bg-[#2C6975] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-teal-600 z-10 flex-shrink-0"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>

      <div className="flex relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentServiceIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex"
          >
            {/* Center Card */}
            <div className="bg-[#2C6975] text-left text-white w-[400px] h-[250px] rounded-lg flex items-center justify-center shadow-lg">
              <h2 className="text-3xl font-semibold text-center">
                {services[currentServiceIndex].title}
              </h2>
            </div>

            {/* Description Text */}
            <div className="max-w-lg hidden md:block pl-8 text-gray-700 text-justify">
              <p>{services[currentServiceIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={nextService}
        className="bg-[#2C6975] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-teal-600 z-10 flex-shrink-0"
        aria-label="Next"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ServiceCarousel;
