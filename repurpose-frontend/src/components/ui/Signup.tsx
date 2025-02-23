"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStore, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import PhoneInput from 'react-phone-input-2'; // Import the phone input library
import 'react-phone-input-2/lib/style.css'; // Import the styles for the phone input
import { Button } from "@/components/ui/button";
import OTPInput from '@/components/ui/otp'; // Import your OTPInput component
import { apiRequest } from '../../middleware/errorInterceptor';

interface SignupFormValues {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  storeName?: string;
}

interface SignupFormErrors {
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  storeName?: string;
}

function validateSignupForm(values: SignupFormValues): SignupFormErrors {
  let errors: SignupFormErrors = {};

  // Validate role
  if (!values.role) {
    errors.role = "(required)";
  }

  // Validate first name
  if (!values.firstName || values.firstName.trim().length < 3) {
    errors.firstName = "(invalid First Name)";
  }

  // Validate last name
  if (!values.lastName || values.lastName.trim().length < 3) {
    errors.lastName = "(invalid Last Name)";
  }

  // Validate first name
  if (!values.firstName || values.firstName.trim().length < 1) {
    errors.firstName = "(required)";
  }

  // Validate last name
  if (!values.lastName || values.lastName.trim().length < 1) {
    errors.lastName = "(required)";
  }

  // Validate email
  const emailPattern = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,4}$/;
  if (!values.email || values.email.trim() === "") {
    errors.email = "(required)";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "(invalid email)";
  }

  // Validate phone number (excluding country code)
  const phoneNumberWithoutCountryCode = values.phoneNumber.replace(/^\+977/, '');
  if (!phoneNumberWithoutCountryCode) {
    errors.phoneNumber = "(required)"
  }
  else if (phoneNumberWithoutCountryCode.length < 7 || phoneNumberWithoutCountryCode.length > 10) {
    errors.phoneNumber = "(Invalid Phone Number)";
  }

  // Validate address
  if (!values.address || values.address.trim().length < 1) {
    errors.address = "(required)";
  }

  // Validate store name (for store role)
  const storeNamePattern = /^[A-Za-z0-9 ]{2,}$/;
  if (values.role === "store" && (!values.storeName || !storeNamePattern.test(values.storeName))) {
    errors.storeName = "(Invalid Store Name)";
  }

  // Validate password
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!values.password || values.password.trim() === "") {
    errors.password = "(required)";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "(Invalid Password)";
  }

  // if (!values.confirmPassword || values.confirmPassword.trim() === "") {
  //   console.log("con", values.confirmPassword);
  //   errors.confirmPassword = "(required)"
  // } else if (values.confirmPassword !== values.password) {
  //   errors.confirmPassword = "(Passwords do not match) "
  // }

  return errors;
}


export default function SignupPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [userID, setUserID] = useState("");
  const [serverError, setServerError] = useState("");

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

    // Validate form data
    const errors = validateSignupForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Validate passwords
    const passwordValidationErrors = validatePassword(formData.password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      return;
    }
    if (formData.password !== confirmPassword) {
      setPasswordErrors(["Passwords do not match"]);
      return;
    }

    try {
      console.log(`Signing up as ${formData.role}`);
      console.log("formData", formData);
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
        setUserID(response.data.id);
        console.log("I am here");
        setShowOTPInput(true); // Show OTP input after successful registration
        await sendOTPToEmail();
      }

    } catch (error: any) {
      console.log("Error during signup:", error);
      setServerError(error.message);
      console.log(error.message)
    }
  };

  const sendOTPToEmail = async () => {
    // Simulate an API call to send OTP to the user's email
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

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

  console.log("SER", serverError);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {showOTPInput ? (
        <OTPInput userID={userID} />
      ) : (
        <>
          {formData.role === "" ? (
            <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-3xl border border-gray-300">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Select Your Role</h1>
              <div className="flex space-x-16">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <FaUserTie className="text-9xl text-blue-500 mb-8 transition-transform transform hover:scale-110 hover:text-blue-600" />
                    <div className="absolute top-0 left-0 bg-[hsl(var(--destructive-foreground))] rounded-full w-28 h-28 blur-lg opacity-40"></div>
                  </div>
                  <button type="button"
                    onClick={() => handleRoleSelection("seller")}
                    className="px-10 py-5 bg-blue-500 text-white rounded-full hover:bg-blue-800 hover:text-xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Seller
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <FaStore className="text-9xl text-[hsl(var(--primary))] mb-8 transition-transform transform hover:scale-110 hover:text-green-700" />
                    <div className="absolute top-0 left-0 bg-[hsl(var(--primary-foreground))] rounded-full w-28 h-28 blur-lg opacity-40"></div>
                  </div>
                  <button
                    onClick={() => handleRoleSelection("store")}
                    className="px-10 py-5 bg-[hsl(var(--primary))] text-white rounded-full hover:bg-green-800 text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
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
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                            First Name
                          </label>
                          {formErrors.firstName && <span className="text-red-500">{formErrors.firstName}</span>}
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          name="firstName"
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                        />
                      </div>
                      <div className="w-1/2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                            Last Name
                          </label>
                          {formErrors.lastName && <span className="text-red-500">{formErrors.lastName}</span>}
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email
                        </label>
                        {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                        {serverError && <span className="text-red-500">{serverError}</span>}

                      </div>
                      <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                          Contact
                        </label>
                        {formErrors.phoneNumber && <span className="text-red-500">{formErrors.phoneNumber}</span>}
                      </div>
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
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                          Address
                        </label>
                        {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                      </div>
                      <input
                        type="text"
                        id="address"
                        placeholder="Address"
                        name="address"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                      />
                    </div>
                    <div className="mb-4 relative">
                      <div className="flex justify-between">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                          Password
                        </label>
                        {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-12 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <div className="mb-6 relative">
                      <div className="flex justify-between">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                          Confirm Password
                        </label>
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--destructive))] shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-12 text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <small className="text-gray-500">Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</small>
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
                      <div className="flex justify-between">
                        <label htmlFor="storeName" className="block text-gray-700 font-medium mb-2">
                          Store Name
                        </label>
                        {formErrors.storeName && <span className="text-red-500">{formErrors.storeName}</span>}
                      </div>
                      <input
                        type="text"
                        id="storeName"
                        placeholder="Store Name"
                        name="storeName"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">

                          <label htmlFor="ownerFirstName" className="block text-gray-700 font-medium mb-2">
                            Owner First Name
                          </label>
                          {formErrors.firstName && <span className="text-red-500">{formErrors.firstName}</span>}
                        </div>
                        <input
                          type="text"
                          id="ownerFirstName"
                          placeholder="First Name"
                          name="firstName"
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        />
                      </div>
                      <div className="w-1/2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">

                          <label htmlFor="ownerLastName" className="block text-gray-700 font-medium mb-2">
                            Owner Last Name
                          </label>
                          {formErrors.lastName && <span className="text-red-500">{formErrors.lastName}</span>}
                        </div>
                        <input
                          type="text"
                          id="ownerLastName"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={handleInput}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                          Address
                        </label>
                        {formErrors.address && <span className="text-red-500">{formErrors.address}</span>}
                      </div>
                      <input
                        type="text"
                        id="address"
                        placeholder="Address"
                        name="address"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                          Contact
                        </label>
                        {formErrors.phoneNumber && <span className="text-red-500">{formErrors.phoneNumber}</span>}
                      </div>
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
                      <div className="flex justify-between">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email
                        </label>
                        {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                        {serverError && <span className="text-red-500">{serverError}</span>}
                      </div>
                      <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                    </div>
                    <div className="mb-4 relative">
                      <div className="flex justify-between">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                          Password
                        </label>
                        {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-12 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <div className="mb-6 relative">
                      <div className="flex justify-between">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                          Confirm Password
                        </label>
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-12 text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <small className="text-gray-500">Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</small>
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
              <div className="text-center mt-4">
                <span>Already have an account? </span>
                <button
                    type="button"
                    onClick={() => router.push('/?login=true')}
                    className="text-green-500 hover:underline"
                >
                  Login
                </button>

              </div>
              <button
                onClick={() => setFormData({ ...formData, role: "" })}
                className=" w-full py-2 text-primary hover:text-gray-700 underline transition-colors"
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
