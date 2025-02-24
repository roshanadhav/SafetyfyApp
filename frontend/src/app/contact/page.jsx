"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen mt-20 bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 ">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg max-w-2xl"
        >
          Reach out to us for any inquiries, feedback, or collaboration opportunities.
        </motion.p>
      </section>

      {/* Team Members Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center"
        >
          Meet the Team
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Roshan Adhav */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold">Roshan Adhav</h3>
            <p className="mt-1 text-gray-600">Developer</p>
            <div className="flex space-x-4 mt-3">
              <a
                href="https://www.linkedin.com/in/roshan-adhav-325a8331a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/_roshanadhav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 transition"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </motion.div>

          {/* Manish Kumawat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold">Manish Kumawat</h3>
            <p className="mt-1 text-gray-600">Developer</p>
            <div className="flex space-x-4 mt-3">
              <a
                href="https://www.linkedin.com/in/manish-kumawat-287a47298"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/kumawat_manish_31"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 transition"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 bg-white shadow-lg p-8 rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Contact Info */}
      <section className="py-8 bg-gray-200 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg font-semibold">Need help? Contact us:</p>
          <div className="flex justify-center space-x-6 mt-2">
            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-600" /> support@safetyfy.com
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-2 text-blue-600" /> +91 98765 43210
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
