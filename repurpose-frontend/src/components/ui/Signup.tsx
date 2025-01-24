"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStore, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import PhoneInput from 'react-phone-input-2'; // Import the phone input library
import 'react-phone-input-2/lib/style.css'; // Import the styles for the phone input
import { Button } from "@/components/ui/button";
import OTPInput from '@/components/ui/otp' // Import your OTPInput component
import { apiRequest } from '../../middleware/errorInterceptor';


export default function SignupPage() {
  const [role, setRole] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [contact, setContact] = useState(""); 
  const [showOTPInput, setShowOTPInput] = useState(false);
  // const [firstName, setFirstName] = useState<String[]>([]);
  // const [lastName, setLastName] = useState("");
  const [storeName, setStoreName] = useState("");
  // const [address, setAddress] = useState("");
  const [userID, setUserID] = useState("")

  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    storeName: "",
  });


  const router = useRouter();

  // const handleRoleSelection = (selectedRole: string) => {
  //   setRole(selectedRole);
  // };

  const handleRoleSelection = (selectedRole: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      role: selectedRole,
    }));
  };


  const handleInput = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate passwords
    const errors = validatePassword(formData.password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }
    if (formData.password !== confirmPassword) {
      setPasswordErrors(["Passwords do not match"]);
      return;
    }

    try {
      console.log(`Signing up as ${formData.role}`);
      console.log("formData", formData)
      // Call the backend API to register the user
      const response = await apiRequest("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that the body is JSON
        },
        body: JSON.stringify(formData),
      });


      console.log("Registration successful:", response);
      if (response.code === 201) {
        setUserID(response.data.id)
        console.log("I am here");
        setShowOTPInput(true); // Show OTP input after successful registration
        await sendOTPToEmail();
      }

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const sendOTPToEmail = async () => {
    // Simulate an API call to send OTP to the user's email
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  console.log("formdata herr", formData);

  const validatePassword = (password: string) => {
    const errors = [];
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*()).");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showOTPInput ? (
        <OTPInput userID={userID}/>
      ) : (
        <>
          {formData.role === "" ? (
            <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-3xl border border-gray-300">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Select Your Role</h1>
              <div className="flex space-x-16">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <FaUserTie className="text-9xl text-[hsl(var(--destructive))] mb-8 transition-transform transform hover:scale-110" />
                    <div className="absolute top-0 left-0 bg-[hsl(var(--destructive-foreground))] rounded-full w-28 h-28 blur-lg opacity-40"></div>
                  </div>
                  <button type="button"
                    onClick={() => handleRoleSelection("seller")}
                    className="px-10 py-5 bg-[hsl(var(--destructive))] text-white rounded-full hover:bg-red-400 text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Seller
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <FaStore className="text-9xl text-[hsl(var(--primary))] mb-8 transition-transform transform hover:scale-110" />
                    <div className="absolute top-0 left-0 bg-[hsl(var(--primary-foreground))] rounded-full w-28 h-28 blur-lg opacity-40"></div>
                  </div>
                  <button
                    onClick={() => handleRoleSelection("store")}
                    className="px-10 py-5 bg-[hsl(var(--primary))] text-white rounded-full hover:bg-green-500 text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Store
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-300">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign Up as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</h1>
              <form onSubmit={handleSignup}>
                {formData.role === "seller" ? (
                  <>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          name="firstName"
                          // value={firstName}
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          name="lastName"

                          // value={lastName}
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"

                        // value={email}
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                        Contact
                      </label>
                      <PhoneInput
                        country={'np'} // Default to Nepal
                        value={formData.phoneNumber} // Bind the input value to formData.phoneNumber
                        onChange={(value) => setFormData(prevFormData => ({
                          ...prevFormData,
                          phoneNumber: value.startsWith('+') ? value : `+${value}`, // Ensure the '+' sign is included
                        }))}

                        inputClass="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        // value={password}
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <div className="mb-6 relative">
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {passwordErrors.length > 0 && (
                      <ul className="text-red-500 mb-4 list-disc list-inside">
                        {passwordErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label htmlFor="storeName" className="block text-gray-700 font-medium mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        id="storeName"
                        placeholder="Store Name"
                        // value={storeName}
                        name="storeName"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        required
                      />
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <label htmlFor="ownerFirstName" className="block text-gray-700 font-medium mb-2">
                          Owner First Name
                        </label>
                        <input
                          type="text"
                          id="ownerFirstName"
                          placeholder="First Name"
                          name="firstName"
                          // value={ownerFirstName}
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="ownerLastName" className="block text-gray-700 font-medium mb-2">
                          Owner Last Name
                        </label>
                        <input
                          type="text"
                          id="ownerLastName"
                          placeholder="Last Name"
                          name="lastName"
                          // value={ownerLastName}
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        placeholder="Address"
                        name="address"
                        // value={address}
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                        Contact
                      </label>
                      <PhoneInput
                        country={'np'} // Default to Nepal
                        value={formData.phoneNumber} // Bind the input value to formData.phoneNumber
                        onChange={(value) => setFormData(prevFormData => ({
                          ...prevFormData,
                          phoneNumber: value.startsWith('+') ? value : `+${value}`, // Ensure the '+' sign is included
                        }))}
                        inputClass="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        // value={email}
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        // value={password}
                        name="password"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <div className="mb-6 relative">
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {passwordErrors.length > 0 && (
                      <ul className="text-red-500 mb-4 list-disc list-inside">
                        {passwordErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r shadow-lg hover:shadow-xl transition-all"
                >
                  Sign Up
                </Button>
              </form>
              <button
                onClick={() => setRole("")}
                className="mt-6 w-full py-2 text-primary hover:text-gray-700 underline transition-colors"
              >
                Back to Role Selection
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
