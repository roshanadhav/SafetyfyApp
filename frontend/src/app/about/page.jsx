"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaMicrophone } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen mt-14 bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-100   text-black">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          About Safetyfy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg max-w-2xl"
        >
          Safetyfy is a revolutionary women’s safety app designed to ensure real-time security through **live location tracking** and **audio sharing** features.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center"
        >
          Key Features
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Live Location Sharing Feature */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
          >
            <FaMapMarkerAlt className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Live Location Sharing</h3>
            <p className="mt-2 text-gray-600">
              Instantly share your live location with trusted contacts in case of emergencies.
            </p>
          </motion.div>

          {/* Audio Sharing Feature */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
          >
            <FaMicrophone className="text-red-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Live Audio Streaming</h3>
            <p className="mt-2 text-gray-600">
              Stream live audio to your emergency contacts for immediate help.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
