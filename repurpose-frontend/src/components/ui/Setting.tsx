"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUser } from '@/contexts/UserContext';
import { apiRequest } from '@/middleware/errorInterceptor';
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const { user } = useUser();
  const userRole = user?.role;

  useEffect(() => {
    if (userRole === 'seller') {
      document.documentElement.style.setProperty('--primary', '140.1 75.2% 30.3%'); // Green theme
      document.documentElement.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
    } else {
      document.documentElement.style.setProperty('--primary', '217 91% 60%'); // Blue theme
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
    }
  }, [userRole]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  const [isSureToDelete, setIsSureToDelete] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const router = useRouter();


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setPasswordStrength(calculatePasswordStrength(newPasswordValue));
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

  const handleDeleteAccount = async () => {
    if (confirmDeleteText === 'Confirm delete my account' && isSureToDelete) {
      // Handle account deletion logic here
      // e.preventDefault();
      // Handle password change logic here
      try {
        const response = await apiRequest("/api/auth/me", {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        // console.log('Password changed to:', newPassword);
        console.log("response in delete account", response)
        setAccountDeleted(true); // Show confirmation popup
      } catch (error: any) {
        console.log("error in change password", error.message);
      }
      console.log('Account deleted');
    } else {
      console.log('Deletion not confirmed');
    }
  };

  const logoutUser = async () => {
    // Clear user-related data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push('/');
  }

  const handleSubmitPasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password change logic here

    console.log("newpassword", newPassword);
    console.log("old password", oldPassword)
    try {
      const response = await apiRequest("/api/auth/change-password", {
        method: 'PATCH',
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: { 'Content-Type': 'application/json' }
      });

      // console.log('Password changed to:', newPassword);
      console.log("response in change password", response)
      alert("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (error: any) {
      console.log("error in change password", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[hsl(var(--background))] overflow-hidden">
      <div className="bg-[hsl(var(--card))] shadow-md rounded-lg p-4 w-full max-w-lg mt-2 overflow-hidden">
        <header className="flex justify-center items-center mb-2 overflow-hidden">
          {/* <div className="flex items-center">
            <Image src="/profile-picture.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
            </div> */}
          <div className='flex flex-col items-center overflow-hidden'>
            <div className="w-32 h-32 rounded-full border-4 border-[hsl(var(--card))] overflow-hidden relative">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer overflow-hidden"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 text-5xl font-bold cursor-pointer">
                  {user?.firstName?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>
            <p className="ml-2 text-[hsl(var(--foreground))]">{user?.firstName} {user?.lastName}</p>
          </div>
        </header>
        <form onSubmit={handleSubmitPasswordChange}>
          {/* Change Password Section */}
          <label className="block text-[hsl(var(--foreground))] mb-2">Change Password</label>
          <div className="block gap-4">
            <div className="w-full">
              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 mb-5 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={handleNewPasswordChange}
                className="w-full px-3 py-2 mb-3 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              />
              <div className="flex items-center mt-2 mb-5">
                <FontAwesomeIcon icon={passwordStrength >= 60 ? faUnlock : faLock} className="mr-2" />
                <progress
                  value={passwordStrength}
                  max="100"
                  className="w-full h-2 bg-[hsl(var(--muted))] rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg shadow hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Manage Account Section */}
        <div className="mb-4">
          <label className="block text-[hsl(var(--foreground))] mb-2">Manage Account</label>
          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Popup */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg mb-4">Confirm Account Deletion</h2>
              <p className="text-sm text-gray-600 mb-2">Please type "Confirm delete my account" to proceed.</p>
              <input
                type="text"
                placeholder="Confirm delete my account"
                value={confirmDeleteText}
                onChange={(e) => setConfirmDeleteText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={isSureToDelete}
                  onChange={(e) => setIsSureToDelete(e.target.checked)}
                  className="mr-2"
                  title="I am sure to delete my account"
                />
                <label>I am sure to delete my account</label>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="w-full px-4 py-2 mt-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Account Deleted Success Popup */}
        {accountDeleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
              <h2 className="text-lg font-semibold mb-2">Account Deleted</h2>
              <p className="text-sm text-gray-600 mb-4">We're sad to see you go. 😢</p>
              <button
                onClick={logoutUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SettingsPage;
