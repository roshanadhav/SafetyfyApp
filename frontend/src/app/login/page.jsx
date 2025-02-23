"use client";

import { useContext, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react"; 
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Ensure axios always sends credentials
axios.defaults.withCredentials = true;

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const context = useContext(AppContext);

  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-center">Error: App context is missing. Please try reloading.</p>
      </div>
    );
  }

  const { backendUrl, setIsLoggedIn, getUserData } = context;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Submitting form..."); // Debugging Log
    console.log("Email:", email, "Password:", password, "Name:", name);
  
    try {
      const endpoint = isLogin ? "login" : "register";
      const payload = isLogin ? { email, password } : { name, email, password };
      
      console.log("Sending request to:", `https://safetyfyapp.onrender.com/api/auth/${endpoint}`);
      console.log("Payload:", payload);
  
      const response = await axios.post(
        `https://safetyfyapp.onrender.com/api/auth/${endpoint}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log("Response received:", response.data);
  
      if (response.data.success) {
        setIsLogin(true);
        getUserData();
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-md border border-gray-300">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
            unoptimized={true}
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>
        <p className="text-gray-500 text-center mt-1">
          {isLogin ? "Sign in to continue" : "Join us today!"}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                className="w-full pl-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              className="w-full pl-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right text-sm">
              <Link href="/reset-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit Button with Loading Animation */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02] active:scale-95 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Processing...
              </>
            ) : (
              isLogin ? "Sign In" : "Sign Up"
            )}
          </button>
        </form>

        {/* Switch Between Login & Signup */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
