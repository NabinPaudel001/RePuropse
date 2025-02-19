"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SettingsPage = () => {
  // Simulate user role; change this value to 'store' for the green theme
  const userRole = 'seller';

  useEffect(() => {
    if (userRole === 'seller') {
      document.documentElement.style.setProperty('--primary', '217 91% 60%'); // Blue theme
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
    } else {
      document.documentElement.style.setProperty('--primary', '140.1 75.2% 30.3%'); // Green theme
      document.documentElement.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
    }
  }, [userRole]);

  const [username, setUsername] = useState('Nabin Paudel');
  const [email, setEmail] = useState('nabin@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('/profile-picture.jpg'); // Placeholder path
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePhoneChange = (value: string) => setPhone(value);
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
        }
        setUploadProgress(100);
      };
      reader.onprogress = (event) => {
        setUploadProgress((event.loaded / event.total) * 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Updated Username:', username);
    console.log('Updated Email:', email);
    console.log('Updated Phone:', phone);
    console.log('Updated Address:', address);
    console.log('Updated Password:', password);
    console.log('Updated Profile Image:', profileImage);
    setNotification({ type: 'success', message: 'Settings updated successfully!' });
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
    return strength;
  };

  return (
    <div className="flex justify-center items-center  bg-[hsl(var(--background))]">
      {/* Reduced top spacing by using a small margin-top (mt-2) */}
      <div className="bg-[hsl(var(--card))] shadow-md rounded-lg p-4 w-full max-w-lg mt-2">
        <header className="flex justify-center items-center mb-2">
          <div className="flex items-center">
            <Image src={profileImage} alt="Profile" width={40} height={40} className="rounded-full" />
            <span className="ml-2 text-[hsl(var(--foreground))]">{username}</span>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full border-4 border-[hsl(var(--border))] overflow-hidden">
              <Image src={profileImage} alt="Profile" layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center cursor-pointer">
                <label htmlFor="profileImageInput" className="cursor-pointer">
                  <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
                </label>
                <input
                  title="Profile Image"
                  placeholder="Upload Profile Image"
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
              <progress value={uploadProgress} max="100" className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg" />
            </div>
          </div>

          {/* Username and Email in one row */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">Username</label>
              <input
                type="text"
                title="Username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Phone and Address in one row */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">Phone</label>
              <PhoneInput
                inputStyle={{ width: '100%' }}
                value={phone}
                onChange={handlePhoneChange}
                containerClass="phone-input-container"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">Address</label>
              <input
                type="text"
                value={address}
                placeholder="Address"
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
            </div>
          </div>

          {/* Passwords (Current & New) in one row */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
              <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={passwordStrength >= 60 ? faUnlock : faLock} className="mr-2" />
                <progress
                  value={passwordStrength}
                  max="100"
                  className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-[hsl(var(--foreground))] mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={handleNewPasswordChange}
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
