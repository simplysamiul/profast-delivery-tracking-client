import React, { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = ["Story", "Mission", "Success", "Terms & Condition"];

  const content = {
    Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it’s a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time. <br/> `,
    Mission: `Our mission is to redefine parcel delivery with speed, security, and simplicity. We strive to empower individuals and businesses by providing reliable logistics that connect people and opportunities seamlessly.`,
    Success: `Our success comes from customer trust. Through innovation, timely delivery, and transparent tracking, we’ve built a system that thousands depend on every day.`,
    "Terms & Condition": `By using our services, you agree to our terms of use, privacy policy, and delivery policies. We are committed to transparency, ethical business practices, and customer satisfaction at every step.`,
  };

  return (
    <div className=" mx-auto px-0 md:px-20 py-20 bg-white shadow-sm rounded-2xl">
      {/* Header */}
      <div className="text-start mb-30">
        <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base w-full md:w-1/2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-start gap-6 pb-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium text-sm md:text-base transition-all duration-300 ${
              activeTab === tab
                ? "text-green-700 border-b-2 border-green-700 pb-1"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed space-y-4 text-sm md:text-base mb-36">
        <p>{content[activeTab]}</p>
        <p>{content[activeTab]}</p>
        <p>{content[activeTab]}</p>
      </div>
    </div>
  );
};

export default AboutUs;
