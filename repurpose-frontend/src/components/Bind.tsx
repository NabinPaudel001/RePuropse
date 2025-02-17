// MainPage.js
import React, { useState } from "react";
import HeroSection from "@/components/ui/HeroSection";
import LoginPage from "@/components/ui/login";

const MainPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStartedClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <HeroSection onGetStartedClick={handleGetStartedClick} />
      {showLogin && <LoginPage onClose={handleCloseLogin} />}
    </div>
  );
};

export default MainPage;
