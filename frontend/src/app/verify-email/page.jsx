"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EmailVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "your email";
    setEmail(storedEmail);
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return toast.error("Enter a valid 6-digit OTP");

    try {
      setLoading(true);
      const response = await axios.post(`https://safetyfyapp.onrender.com/api/auth/verify-account`, { email, otp: otpCode } , {withCredentials:true});

      if (response.data.success) {
        toast.success("Email verified successfully! 🎉");
        router.push("/");
      } else {
        toast.error(response.data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md border border-gray-300 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="text-gray-600 mt-2">Enter the 6-digit OTP sent to <strong>{email}</strong></p>

        <div className="flex justify-center gap-2 mt-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 text-lg text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-6 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Verify"
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;