"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OTPInput from '@/components/ui/otp'; 
import { apiRequest } from '../../middleware/errorInterceptor';
import { setAccessToken } from "@/utils/tokens";

export default function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false); // State to show OTP input
  const [userID, setUserID] = useState("")
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleLogin = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const role = "seller";

  //   // Mock verification logic
  //   if (email === "nabin@nabin.com" && password === "1245") {
  //     setShowOTPInput(true); // Show OTP input if email is registered but not verified
  //   } else {
  //     console.log(`Logging in as ${role}`);
  //     router.push(`/${role}/dashboard`);
  //   }
  // };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        console.log("formData", formData)
        // Call the backend API to register the user
        const response = await apiRequest("/api/auth/login", {
          method: "POST", body: JSON.stringify(formData)
        });
  
        console.log("Registration successful:", response);
        if (response.code === 403) {
          setUserID(response.data.id)
          console.log("I am here");
          setShowOTPInput(true); // Show OTP input after successful registration
        }
        if (response.code === 200) {
          console.log("res ma token", response.data.token)
                setAccessToken(response.data.token)
                router.push(`/${response.data.role}/dashboard/home`);
        }
  
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };

  const handleInput = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignupRedirect = () => {
    router.push("/signup"); // Redirect to the signup page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>
        {showOTPInput ? (
          <OTPInput userID={userID} />
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                // value={email}
                name="email"
                onChange={handleInput}
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
                name="password"
                // value={password}
                onChange={handleInput}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>
            <Button className="px-6 py-4">
              Login
            </Button>
          </form>
        )}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleSignupRedirect}
              className="text-primary hover:underline"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
