"use client";
import { useState } from "react";
import { Mail, Key, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const sendOtpHandler = async () => {
    try {
      const { data } = await axios.post(`https://safetyfyapp.onrender.com/api/auth/reset-pass-otp-send`, { email });
      if (data.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetPasswordHandler = async () => {
    try {
      const { data } = await axios.post(`https://safetyfyapp.onrender.com/api/auth/verify-otp-change-pass`, { email, otp, password });
      if (data.success) {
        toast.success("Password changed successfully! You can now log in.");
        router.push("/login");
        setEmail("");
        setOtp("");
        setPassword("");
        setOtpSent(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png"
            alt="Logo"
            width={120}
            height={40}
            className="w-30 h-10 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password 🔐</h2>
        <p className="text-gray-500 text-center mb-6">{otpSent ? "Enter OTP and set a new password" : "Enter your email to receive an OTP"}</p>
          
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
            disabled={otpSent}
          />
        </div>
        
        {otpSent && (
          <>
            <div className="relative mb-4">
              <Key className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 tracking-widest"
                required
              />
            </div>
            
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </>
        )}
        
        {!otpSent ? (
          <button onClick={sendOtpHandler} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            Send OTP
          </button>
        ) : (
          <button onClick={resetPasswordHandler} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
