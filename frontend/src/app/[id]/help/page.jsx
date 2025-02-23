"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";
import { Mic } from "lucide-react"; // Import Mic icon

const socket = io("https://safetyfyapp.onrender.com", {
  transports: ["websocket"],
  secure: true
});

const HelpRequester = () => {
  const [loction, setLoction] = useState({ latitude: null, longitude: null });
  const [flag, setFlag] = useState(true);
  const { id } = useParams();
  const [recording, setRecording] = useState(false);
  const [scale, setScale] = useState(1);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const locationIntervalRef = useRef(null);
  const isRecordingRef = useRef(false); // Prevent multiple clicks

  useEffect(() => {
    socket.emit("joinRoom", id);
    console.log(`✅ Joined room: ${id}`);

    return () => {
      socket.disconnect();
      console.log("❌ Disconnected from socket");
    };
  }, [id]);

  useEffect(() => {
    if (loction && loction.latitude && loction.longitude) {
      async function sendSafetyMails() {
        try {
          const response = await axios.post(
            "https://safetyfyapp.onrender.com/api/user/help",
            { latitude: loction.latitude, longitude: loction.longitude },
            { withCredentials: true }
          );
          console.log(response);
        } catch (error) {
          console.error("Error sending safety mail:", error);
        }
      }
      sendSafetyMails();
    }
  }, [loction]); // Runs only when location updates

  useEffect(() => {
    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`📍 Sending Location: ${latitude}, ${longitude}`);
            socket.emit("sendLocation", { id, latitude, longitude });
            if (flag) {
              setLoction({ latitude, longitude });
              setFlag(false);
            }
          },
          (error) => console.error("❌ Error getting location:", error),
          { enableHighAccuracy: true }
        );
      }
    };

    locationIntervalRef.current = setInterval(sendLocation, 5000);

    return () => clearInterval(locationIntervalRef.current);
  }, [id, flag]);

  const startRecording = async () => {
    if (isRecordingRef.current) return;
    isRecordingRef.current = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      mediaStreamRef.current = audioContextRef.current.createMediaStreamSource(stream);
      mediaStreamRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        setScale(1 + Math.min(volume / 200, 0.4));
        requestAnimationFrame(animate);
      };

      animate();

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          socket.emit("audio-stream", { roomId: id, audioChunk: event.data });
        }
      };

      mediaRecorderRef.current.start(100);
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    mediaRecorderRef.current?.stop();
    audioContextRef.current?.close();
    setScale(1);
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-6 md:p-12">
      <h1 className="text-xl md:text-2xl font-bold text-center">🚨 Sending Live Location...</h1>
      <h2 className="text-lg md:text-xl mt-2 text-center">🎙 Audio Sender</h2>

      <div
        onClick={recording ? stopRecording : startRecording}
        className="mt-6 cursor-pointer p-6 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center
                   hover:bg-blue-700 transition duration-300 ease-in-out"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Mic size={50} />
      </div>

      <p className="mt-4 text-sm text-gray-600">
        {recording ? "🎤 Streaming Audio..." : "Tap to Start Streaming"}
      </p>
    </div>
  );
};

export default HelpRequester;
