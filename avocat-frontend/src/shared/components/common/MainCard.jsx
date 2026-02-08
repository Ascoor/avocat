import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const useIconCardAnimation = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const animationStyles = useSpring({
    transform: isInteracting
      ? 'perspective(900px) scale(1.05) translateY(-10px) rotateX(2deg)'
      : 'perspective(900px) scale(1) translateY(0) rotateX(0deg)',
    backdropFilter: isInteracting ? 'blur(15px)' : 'blur(5px)',
    config: { mass: 1, tension: 350, friction: 25 },
  });

  return { animationStyles, setIsInteracting };
};

const MainCard = ({ count, icon, label, route }) => {
  const { animationStyles, setIsInteracting } = useIconCardAnimation();
  const navigate = useNavigate();

  return (
    <animated.div
      style={animationStyles}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      onClick={() => navigate(route)}
      className="stat-card cursor-pointer backdrop-blur backdrop-filter p-6 flex items-center justify-between w-full max-w-sm transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {}
      <div className="flex flex-col items-start ml-4">
        <div className="text-sm uppercase tracking-[0.2em] text-[var(--app-muted)] mb-2">
          {label}
        </div>

        <div className="text-3xl font-extrabold text-[var(--app-text)] tracking-tight">
          {count}
        </div>
      </div>

      {}
      <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/70 dark:bg-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl">
        <img src={icon} alt={label} className="w-12 h-12 object-contain" />
      </div>
    </animated.div>
  );
};

export default MainCard;
