"use client";
import { Router } from "lucide-react";
import { useEffect ,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
const App = () => {
  const router = useRouter();
  const {  userData} = useContext(AppContext);
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 relative">
      {/* 3D Model */}
      <spline-viewer url="https://prod.spline.design/l3io5peKoOPj7WHx/scene.splinecode"></spline-viewer>

      {/* Button - Positioned on Top of the Viewer */}
      <button onClick={()=>{
        router.push(`/${userData.userId}/help`)
      }} className="absolute bottom-32 px-32 py-5 text-white text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-105 transition-transform">
        Get Help
      </button>
    </div>
  );
};

export default App;
