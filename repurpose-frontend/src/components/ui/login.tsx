"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import OTPInput from '@/components/ui/otp' // Import your OTPInput component

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false); // State to show OTP input
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const role = "seller";

    // Mock verification logic
    if (email === "nabin@nabin.com" && password === "1245") {
      setShowOTPInput(true); // Show OTP input if email is registered but not verified
    } else {
      console.log(`Logging in as ${role}`);
      router.push(`/${role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>
        {showOTPInput ? (
          <OTPInput /> // Render OTPInput component when OTP input should be shown
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>
            <Button>
              Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
