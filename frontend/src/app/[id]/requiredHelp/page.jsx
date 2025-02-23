"use client"; // Required for using useEffect & useState in Next.js App Router

import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Initialize socket connection once
const socket = io("https://safetyfyapp.onrender.com", {
  transports: ["websocket"],
  secure: true,
});

// Custom Marker Icon
const customIcon = L.icon({
  iconUrl: "https://i.postimg.cc/vTqHtDBV/663342-removebg-preview.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const RequiredHelpPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const audioRef = useRef(null);
  const mediaSource = useRef(null);
  const sourceBuffer = useRef(null);
  const queue = useRef([]);

  useEffect(() => {
    const initializeMediaSource = () => {
      mediaSource.current = new MediaSource();
      audioRef.current.src = URL.createObjectURL(mediaSource.current);

      mediaSource.current.addEventListener("sourceopen", () => {
        try {
          sourceBuffer.current = mediaSource.current.addSourceBuffer("audio/webm; codecs=opus");
          sourceBuffer.current.addEventListener("updateend", () => {
            if (queue.current.length > 0 && !sourceBuffer.current.updating) {
              sourceBuffer.current.appendBuffer(queue.current.shift());
            }
          });
        } catch (error) {
          console.error("Error adding SourceBuffer:", error);
        }
      });

      mediaSource.current.addEventListener("sourceclose", () => {
        console.warn("MediaSource closed. Reinitializing...");
        initializeMediaSource();
      });
    };

    initializeMediaSource();

    const handleAudioStream = (audioChunk) => {
      if (!sourceBuffer.current) return;

      const audioBlob = new Blob([audioChunk], { type: "audio/webm" });
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        if (!sourceBuffer.current.updating) {
          try {
            sourceBuffer.current.appendBuffer(new Uint8Array(arrayBuffer));
          } catch (error) {
            console.error("Error appending buffer:", error);
            initializeMediaSource();
          }
        } else {
          queue.current.push(new Uint8Array(arrayBuffer));
        }
      };

      reader.readAsArrayBuffer(audioBlob);
    };

    socket.on("audio-stream", handleAudioStream);

    return () => {
      socket.off("audio-stream", handleAudioStream);
      if (mediaSource.current) {
        mediaSource.current.removeEventListener("sourceopen", initializeMediaSource);
        mediaSource.current.removeEventListener("sourceclose", initializeMediaSource);
      }
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    socket.emit("joinRoom", id);
    console.log(`Joined room: ${id}`);

    const handleLocationUpdate = (data) => {
      console.log("📍 New Location Received:", data);
      setLocation(data);
    };

    socket.on("updateLocation", handleLocationUpdate);

    return () => {
      socket.off("updateLocation", handleLocationUpdate);
    };
  }, [id]);

  return (
    <div className="flex flex-col mt-20 items-center justify-center w-full min-h-screen p-6 gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">🚨 Tracking User: {name ? name : id}</h2>
        {location ? (
          <p className="text-lg mt-2">📍 Location: {location.latitude}, {location.longitude}</p>
        ) : (
          <p className="text-lg text-gray-500 mt-2">Waiting for location updates...</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6">
        <div className="w-full md:w-1/2 h-96 md:h-[70vh] flex items-center justify-center bg-gray-200 rounded-lg shadow-lg mb-10">
          {location ? (
            <MapContainer center={[location.latitude, location.longitude]} zoom={18} className="h-full w-full rounded-lg">
              <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
              <Marker icon={customIcon} position={[location.latitude, location.longitude]}>
                <Popup>Live Location</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p className="text-lg text-gray-500">Waiting for location...</p>
          )}
        </div>

        <div className="w-full md:w-1/2 h-96 md:h-[70vh] flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">🎙 Audio Receiver</h2>
          <audio ref={audioRef} controls autoPlay className="w-3/4" />
          <p className="mt-2 text-gray-600">Waiting for audio...</p>
        </div>
      </div>
    </div>
  );
};

export default RequiredHelpPage;
