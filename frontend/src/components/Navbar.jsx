"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const router = useRouter();
  const { isLoggedIn, userData, logout } = useContext(AppContext);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `https://safetyfyapp.onrender.com/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    logout();
  };

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        `https://safetyfyapp.onrender.com/api/auth/send-verify-otp`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        router.push("/verify-email");
      } else {
        toast.error(`${data.message} - login first`);
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="z-index:1000 w-full bg-white shadow-md fixed top-0 z-50 right-0">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center p-4 sm:px-8 w-full">
        <Link href="/">
          <img
            src="https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png"
            alt="Logo"
            className="h-14"
          />
        </Link>

        <div className="flex">
          <ul className="hidden mr-20 md:flex items-center gap-6 text-gray-800 font-large">
            <li className="hover:text-blue-600 transition-all">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-600 transition-all">
              <Link href="/about">About</Link>
            </li>
            <li className="relative">
              <button
                className="flex items-center gap-1 hover:text-blue-600 transition-all"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services <ChevronDown size={16} />
              </button>
              {servicesOpen && (
                <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-56 overflow-hidden">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/excel">Female Sefty</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/data-management">Child Sefty</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="hover:text-blue-600 transition-all">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="relative">
              <User
                className="text-gray-800 mt-2 mb-2 cursor-pointer"
                size={30}
                onClick={() => setShowProfilePopup(!showProfilePopup)}
              />

              {showProfilePopup && userData && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  <p className="text-lg font-semibold">{userData.name}</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                  <p className="text-sm text-gray-600">{userData.userId}</p>
                  <button
                    onClick={logoutUser}
                    className="text-sm mt-3 text-gray-800 hover:text-red-500 transition duration-200 cursor-pointer font-medium"
                  >
                    Logout
                  </button>

                  {userData.isEmailVerified ? (
                    <p className="text-green-600 font-medium mt-2">
                      Verified ✅
                    </p>
                  ) : (
                    <button
                      onClick={verifyEmail}
                      className="mt-2 ml-5 text-blue-600 font-medium hover:underline"
                    >
                      Verify Email
                    </button>
                  )}
                  <button
                    onClick={() => router.push("/add-details")}
                    className="w-full py-1 mt-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all"
                  >
                    Add Emergency Details
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="border border-gray-500 rounded-full px-10 py-1 text-gray-800 hover:bg-gray-100 transition-all"
            >
              Login
            </button>
          )}

          <button
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
