import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Safetyfy",
  description: "Women Safety App",
  icons: {
    icon: "https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png",
    shortcut: "https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png",
    apple: "https://i.postimg.cc/Y08pGqy4/logojpg-removebg-preview.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
    </AppContextProvider>
  );
}
