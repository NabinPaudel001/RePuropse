"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const role = "seller";
    console.log(`Logging in as ${role}`);
    router.push(`/${role}/dashboard`);
  };

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google login success:', response);
    // Handle Google login success logic here
    router.push('/seller/dashboard');
  };

  const handleFacebookLoginSuccess = (response: any) => {
    console.log('Facebook login success:', response);
    // Handle Facebook login success logic here
    router.push('/seller/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>
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
        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log('Google login error')}
          />
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            callback={handleFacebookLoginSuccess}
            render={(renderProps: any) => (
              <button type="button" onClick={renderProps.onClick} className="w-full mt-4 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                Login with Facebook
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}
