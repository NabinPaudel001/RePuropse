"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../middleware/errorInterceptor";
import { setAccessToken, setRefreshToken, setUserId } from "@/utils/tokens";
import { useSocket } from '../../contexts/SocketContext'
import { useUser } from '@/contexts/UserContext';

const OTPInput = ({ userID }: { userID: string }) => {
  const { user, setUser } = useUser();
  
  const { socket, isConnected, setIsLoggedIn } = useSocket();
  const [role, setRole] = useState(""); // Add role state

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if (socket && isConnected && userID && role) {
      console.log('Socket connected vayo:', socket.id);
      socket.emit("register", userID, role); // Emit the 'register' event to backend
    }
  }, [socket, isConnected, userID, role]); 

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsResendActive(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isResendActive]);

  const handleChange = (element: any, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await apiRequest("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that the body is JSON
        },
        body: JSON.stringify({ userID, otp: enteredOtp }),
      });

      console.log("response", response)

      
      if (response.code === 200) {
                setUserId(response.data.id);
                setRole(response.data.role);
                setAccessToken(response.data.token); // Save token in localStorage
                setRefreshToken(response.data.refreshToken)
                setUser(response.data);
                console.log("her vai user", user)
        
                // Set login status to true, which triggers socket connection
                setIsLoggedIn(true);
        setAccessToken(response.data.token)
        if (response.data.role === "seller") {
          router.push("/seller/dashboard/home"); // Redirect to dashboard on success
        }
        if (response.data.role === "store") {
          router.push("/store/dashboard/home"); // Redirect to dashboard on success
        }
      } else {
        setErrorMessage(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while verifying the OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(""));
    setTimer(60);
    setIsResendActive(false);
    setErrorMessage(""); // Clear error message on resend

    // Call the resend OTP API
    try {
      const response = await apiRequest("/api/auth/resend-otp", {
        method: "POST",
        body: JSON.stringify({ userID }), // Sending the userID for OTP resend
      });

      if (response.code === 200) {
        // OTP successfully resent
        setTimer(60); // Reset timer
        setIsResendActive(false); // Reset resend button to inactive until timer is done
        setErrorMessage("OTP has been resent. Please check your email.");
      } else {
        // Handle any error responses
        setErrorMessage(response.message || "An error occurred while resending OTP.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while resending the OTP.");
    }
  };


  return (
    <div className="otp-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <div className="otp-inputs flex space-x-2 mb-4">
        {otp.map((data, index) => (
          <input
            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="otp"
            maxLength={1}
            placeholder="0"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <button
        className="submit-button px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Submit"}
      </button>
      <div className="timer text-gray-600 mb-4">
        Resend OTP in: {timer} seconds
      </div>
      <button
        className={`resend-button px-4 py-2 bg-blue-500 text-white rounded-md ${isResendActive ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
          }`}
        onClick={handleResend}
        disabled={!isResendActive}
      >
        Resend OTP
      </button>
    </div>
  );
};

export default OTPInput;
