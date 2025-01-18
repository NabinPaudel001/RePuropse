"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'; // Import useRouter for navigation

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  
//   const router = useRouter(); // Initialize useRouter

  const correctOtp = "456589"; // Correct OTP for demo

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

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      validateOtp(newOtp.join(""));
    }
  };

  const validateOtp = (enteredOtp) => {
    if (enteredOtp === correctOtp) {
      router.push('/seller/dashboard'); // Redirect to dashboard
    } else {
      setErrorMessage("Please provide a valid OTP sent to your email address.");
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(60);
    setIsResendActive(false);
    setErrorMessage(""); // Clear error message on resend
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
            maxLength="1"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="timer text-gray-600 mb-4">
        Resend OTP in: {timer} seconds
      </div>
      <button
        className={`resend-button px-4 py-2 bg-blue-500 text-white rounded-md ${
          isResendActive ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
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
