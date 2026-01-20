import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { TeamWorkImage, LogoPatren, WelcomeImage } from '../assets/images';
import { useAlert } from '../context/AlertContext';
import { motion } from 'framer-motion';
import AuthSpinner from '../components/common/Spinners/AuthSpinner';
const HomePage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { triggerAlert } = useAlert();

  const isModalOpen = showLoginForm || showRegisterForm || isLoading;

  const teamImageAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5) translateY(50px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    config: { duration: 1500 },
  });

  return (
    <div className="relative w-full h-screen bg-gradient-night overflow-hidden flex flex-col items-center justify-center">
      <motion.img
        src={WelcomeImage}
        alt="Cover"
        className="absolute w-full h-full object-cover"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {}

      {}
      {!isModalOpen && (
        <animated.div
          style={teamImageAnimation}
          className="absolute top-1/4 left-2/2 transform -translate-x-/2 -translate-y-1/2 max-w-[506px] aspect-[661/377] flex items-center justify-center"
        >
          <img
            src={TeamWorkImage}
            alt="Team Work"
            className="object-cover w-full h-full rounded-lg  shadow-lg"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 60%, rgba(0,0,0,0.6) 70%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.6) 40%, transparent 100%)',
            }}
          />
        </animated.div>
      )}

      {}
      {!isModalOpen && (
        <div className="z-50 text-center mt-24 text-white p-4 flex  flex-col items-center">
          <div className="relative flex- tems-center justify-center">
            <img
              src={LogoPatren}
              alt="الشعار"
              className="w-[220px] sm:w-[250px] md:w-[288px] max-w-full h-auto"
            />
          </div>

          <div className="relative flex-1 items-center justify-center">
            <div className="flex flex-row gap-4 justify-center items-cente">
              <button
                onClick={() => setShowLoginForm(true)}
                className="px-6 py-2 text-lg font-bold bg-gradient-blue-button text-white rounded-lg"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => setShowRegisterForm(true)}
                className="px-6 py-2 text-lg font-bold bg-green-500 text-white rounded-lg"
                disabled={isLoading}
              >
                الاشتراك
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {isLoading && <AuthSpinner />}

      {}
      {showLoginForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Login
            onAuthStart={() => setIsLoading(true)}
            handleFormClose={() => setShowLoginForm(false)}
            onAuthComplete={(success, message) => {
              setTimeout(() => {
                setIsLoading(false);
                if (success) {
                  setShowLoginForm(false);
                  triggerAlert('success', message);
                } else {
                  triggerAlert('error', message);
                }
              }, 2000);
            }}
          />
        </div>
      )}

      {showRegisterForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Register
            onAuthStart={() => setIsLoading(true)}
            handleFormClose={() => setShowRegisterForm(false)}
            onAuthComplete={(success, message) => {
              setTimeout(() => {
                setIsLoading(false);
                if (success) {
                  setShowLoginForm(false);
                  triggerAlert('success', message);
                } else {
                  triggerAlert('error', message);
                }
              }, 2000);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
