import { alertEmail } from "../config/alertEmail.js";
import User from "../models/user.js"
import transpoter from "../config/nodemailer.js";
import {sendWhatsAppMessage} from "../config/sendWhatsApp.js";
import axios from "axios";

export const getUserData  = async (req , res) =>{
    const {userId} = req.body ; 
    if (!userId) {
        return res.json({success : false , message : 'user not logged in'}) ;
    }
    try {
        const user = await User.findById(userId) ;
        if (!user) {
            return res.json({success : false , message : 'User Does Not Exists With Provided UserId'}) ; 
        }
        return res.json({success : true , message : 'returning the user data' , id : user._id , name : user.name , email : user.email , isveriFied : user.isveriFied})
    } catch (error) {
        return res.json({success : false , message : error.message})
    }
}


export const getHelp = async (req , res)=>{
    const {userId, latitude , longitude} = req.body ; 
    if (!userId || !latitude || !longitude) {
        return res.json({success : false , message : "missing credintials" }) ; 
    }
    try {
        const user = await User.findById(userId) ; 
        const numbers = user.emergencyPhonenumber ; 
        const emails = user.emergencyEmail ; 
        const whnumbers = user.emergencyWhNumber ;
        let URL = `https://safetyfy-app.vercel.app/${userId}/requiredHelp`  ;


        async function getPoliceContacts(lat, lon) {
            try {
                // Step 1: Reverse Geocode
                const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const address = geoResponse.data.address;

                // Step 2: Search Nearby Police Station
                const bbox =` ${lat - 0.01},${lon - 0.01},${lat + 0.01},${lon + 0.01}`; // Small area around the location
                const overpassQuery = `[out:json];node["amenity"="police"](${bbox});out;`;
                const overpassURL = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

                const policeResponse = await axios.get(overpassURL);
                const policeStations = policeResponse.data.elements;

                if (policeStations.length === 0) {
                    return "No police station found nearby.";
                }

                // Extracting details
                let policeInfo = policeStations.map(p => ({
                    name: p.tags.name || "Unknown",
                    phone: p.tags.phone || "Not available",
                    email: p.tags.email || "Not available",
                    whatsapp: p.tags.whatsapp || "Not available"
                }));  

                return policeInfo;

            } catch (error) {
                console.error("Error fetching police station details:", error);
                return "Error fetching data.";
            }
        }

        // Example Usage
        const info =await getPoliceContacts(latitude, longitude);
        console.log("info",info)


        for (const email of emails) {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: `Emergency | ${user.name} is in danger`,
                html: alertEmail.replace('{{name}}', user.name).replace('{{name}}', user.name).replace('{{url}}', URL)
            };
            await transporter.sendMail(mailOptions);
        }
        for (const num of whnumbers) {
            if (num) {
                console.log(num);
                await sendWhatsAppMessage(num , URL , user.name);
            } 
        }
    } catch (error) {
        return res.json({success : false , message : error.message })
    }

}