"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    // Load initial state on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
            const storedUserData = JSON.parse(localStorage.getItem("userData"));

            if (storedLoginStatus && storedUserData) {
                setIsLoggedIn(true);
                setUserData(storedUserData);
            }
        }
    }, []);

    // Function to get user data from backend
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`https://safetyfyapp.onrender.com/api/user/data`, { withCredentials: true });

            if (data.success) {
                const user = {
                    userId : data.id ,
                    name: data.name,
                    email: data.email,
                    isEmailVerified: data.isveriFied, // Fixed typo: `isveriFied` -> `isVerified`
                };
                setUserData(user);
                setIsLoggedIn(true);

                // Store in localStorage
                if (typeof window !== "undefined") {
                    localStorage.setItem("userData", JSON.stringify(user));
                    localStorage.setItem("isLoggedIn", "true");
                }
            } else {
                toast.error(data.message);
                logout();
            }
        } catch (error) {
            toast.error(error.message);
            logout();
        }
    };

    // Function to logout and clear storage
    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userData");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserData();
        }
    }, [isLoggedIn]);

    return (
        <AppContext.Provider value={{ backendUrl, isLoggedIn, userData, getUserData, logout }}>
            {children}
        </AppContext.Provider>
    );
};
