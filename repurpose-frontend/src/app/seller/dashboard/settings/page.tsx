"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const [username, setUsername] = useState('Nabin Paudel');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('/profile-picture.jpg'); // Placeholder path
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState(null);
  const [securityQuestions, setSecurityQuestions] = useState([
    { question: 'What is your mother\'s maiden name?', answer: '' },
    { question: 'What is your favorite childhood memory?', answer: '' },
  ]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setUploadProgress(100);
      };
      reader.onprogress = (event) => {
        setUploadProgress((event.loaded / event.total) * 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Updated Username:', username);
    console.log('Updated Password:', password);
    console.log('Updated Profile Image:', profileImage);
    console.log('Security Questions:', securityQuestions);
    setNotification({ type: 'success', message: 'Settings updated successfully!' });
  };

  const calculatePasswordStrength = (password) => {
    // Calculate password strength based on length, complexity, etc.
    // Return a score between 0 and 100
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (password.match(/[a-z]/)) strength += 20;
    if (password.match(/[A-Z]/)) strength += 20;
    if (password.match(/[0-9]/)) strength += 20;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
    return strength;
  };

  const handleSecurityQuestionChange = (index, answer) => {
    const newSecurityQuestions = [...securityQuestions];
    newSecurityQuestions[index].answer = answer;
    setSecurityQuestions(newSecurityQuestions);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Image src={profileImage} alt="Profile" width={40} height={40} />
            <span className="ml-2">{username}</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">Settings</a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">Security</a>
              </li>
            </ul>
          </nav>
        </header>
        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden">
              <Image src={profileImage} alt="Profile" layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center cursor-pointer">
                <label htmlFor="profileImageInput" className="cursor-pointer">
                  <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
              <progress value={uploadProgress} max="100" className="w-full h-2 bg-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={passwordStrength >= 60 ? faUnlock : faLock} className="mr-2" />
              <progress value={passwordStrength} max="100" className="w-full h-2 bg-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Security Questions */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Security Questions</h3>
            {securityQuestions.map((question, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 mb-1">{question.question}</label>
                <input
                  type="text"
                  value={question.answer}
                  onChange={(e) => handleSecurityQuestionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>

        {/* Notification */}
        {notification && (
          <div className={`mt-4 p-2 text-center text-white rounded-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
