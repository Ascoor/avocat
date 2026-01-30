import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TeamWorkImage, LogoPatren, WelcomeImage } from '../assets/images';

const HomePage = () => {
  const navigate = useNavigate();
  const teamImageAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.5) translateY(50px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    config: { duration: 1500 },
  });

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-night">
      <motion.img
        src={WelcomeImage}
        alt="Cover"
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <animated.div
          style={teamImageAnimation}
          className="w-full max-w-[520px] sm:max-w-[560px] md:max-w-[620px]"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={TeamWorkImage}
              alt="Team Work"
              className="h-full w-full object-cover"
              style={{
                maskImage:
                  'linear-gradient(to bottom, black 60%, rgba(0,0,0,0.6) 70%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 30%, rgba(0,0,0,0.6) 40%, transparent 100%)',
              }}
            />
          </div>
        </animated.div>

        <div className="flex w-full flex-col items-center gap-6">
          <img
            src={LogoPatren}
            alt="الشعار"
            className="w-[200px] max-w-full sm:w-[240px] md:w-[288px]"
          />
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="xl"
              variant="premium"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              تسجيل الدخول
            </Button>
            <Button
              size="xl"
              variant="glass"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto"
            >
              الاشتراك
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
