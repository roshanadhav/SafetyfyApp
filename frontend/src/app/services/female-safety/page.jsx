"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  { id: 1, title: "User Signup", desc: "Register & set emergency contacts." },
  { id: 2, title: "Emergency Details", desc: "Add contacts for instant alerts." },
  { id: 3, title: "Get Help", desc: "Tap emergency button to trigger alert." },
  { id: 4, title: "Location & Audio Sent", desc: "Live location & audio shared via WhatsApp, Gmail & police station." },
  { id: 5, title: "Emergency Link", desc: "Contacts receive a tracking link." },
];

const FemaleSafetyService = () => {
  return (
    <div className="p-6 mt-20 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
      <motion.h2
        className="text-2xl font-bold text-pink-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Female Safety Service 🚨
      </motion.h2>

      <div className="flex flex-col items-center gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <div className="p-4 bg-white rounded-lg shadow-md w-64 text-center border-l-4 border-pink-500">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>

            {index !== steps.length - 1 && (
              <motion.div
                className="my-2 text-pink-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.4 }}
              >
                <ArrowDown size={30} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FemaleSafetyService;
