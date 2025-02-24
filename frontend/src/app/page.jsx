"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6">
      {/* Left Section - Image */}
      <div className="flex items-center justify-center md:w-1/2 mb-6 md:mb-0">
        <img 
          src="https://i.pinimg.com/736x/30/ef/45/30ef456469fc622141a487d2f4ac6e87.jpg" 
          alt="Women's Safety Assistance" 
          width={400} 
          height={250} 
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
      
      {/* Right Section - Heading, Text, and Button */}
      <div className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ensuring Women's Safety</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are committed to providing a safe and secure environment for women. Get instant help and resources to stay protected.
        </p>
        <button 
          onClick={() => router.push("/get-help")}
          className="px-10 py-4 text-white text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition-transform"
        >
          Get Help Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
