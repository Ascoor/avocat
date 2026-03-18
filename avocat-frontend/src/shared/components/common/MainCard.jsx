import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { cn } from '@shared/lib/utils';

const useIconCardAnimation = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const animationStyles = useSpring({
    transform: isInteracting
      ? 'perspective(900px) scale(1.02) translateY(-5px) rotateX(1deg)'
      : 'perspective(900px) scale(1) translateY(0) rotateX(0deg)',
    config: { mass: 1, tension: 320, friction: 24 },
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
      onClick={() => route && navigate(route)}
      className={cn(
        'card-premium cursor-pointer p-5 sm:p-6 flex w-full items-center justify-between overflow-hidden',
        route && 'hover:border-[hsl(var(--accent)/0.36)] hover:shadow-[var(--shadow-primary-glow)]'
      )}
    >
      <div className="relative flex flex-col items-start gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {label}
        </span>
        <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {count}
        </span>
      </div>

      <div className="premium-icon-shell h-16 w-16 sm:h-20 sm:w-20">
        <img src={icon} alt={label} className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
      </div>
    </animated.div>
  );
};

export default MainCard;
