"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStore, FaUserTie } from "react-icons/fa"; // Import icons from react-icons

export default function LoginPage() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Logging in as ${role}`);
    router.push(`/${role}/dashboard`); // Redirect to role-specific dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {role === "" ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-2xl border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Choose Your Role</h1>
          <div className="flex space-x-12 justify-center"> 
            <div className="flex flex-col items-center">
              <div className="relative">
                <FaUserTie className="text-8xl text-red-500 mb-6 transition-transform transform hover:scale-110" />
                <div className="absolute top-0 left-0 bg-red-200 rounded-full w-24 h-24 blur-lg opacity-40"></div>
              </div>
              <button
                onClick={() => handleRoleSelection("seller")}
                className="px-8 py-4 bg-red-500 text-white rounded-full hover:bg-red-600 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Seller
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <FaStore className="text-8xl text-blue-500 mb-6 transition-transform transform hover:scale-110" />
                <div className="absolute top-0 left-0 bg-blue-200 rounded-full w-24 h-24 blur-lg opacity-40"></div>
              </div>
              <button
                onClick={() => handleRoleSelection("store")}
                className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Store
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
          <form onSubmit={handleLogin}>
            {role === "store" && (
              <div className="mb-4">
                <label htmlFor="storeId" className="block text-gray-700 font-medium mb-2">
                  Store ID
                </label>
                <input
                  type="text"
                  id="storeId"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 to-blue-500 text-white font-medium rounded-full hover:from-red-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => setRole("")}
            className="mt-6 w-full py-2 text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            Back to Role Selection
          </button>
        </div>
      )}
    </div>
  );
}
