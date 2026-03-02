import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { cn } from '@shared/lib/utils';

const useIconCardAnimation = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const animationStyles = useSpring({
    transform: isInteracting
      ? 'perspective(900px) scale(1.03) translateY(-6px) rotateX(1deg)'
      : 'perspective(900px) scale(1) translateY(0) rotateX(0deg)',
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
      onClick={() => route && navigate(route)}
      className={cn(
        "card-premium cursor-pointer p-5 sm:p-6 flex items-center justify-between w-full transition-all duration-300",
        route && "hover:border-[hsl(var(--accent)/0.4)]"
      )}
    >
      {/* Text */}
      <div className="flex flex-col items-start gap-1.5">
        <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
          {label}
        </span>
        <span className="text-3xl font-extrabold text-foreground tracking-tight">
          {count}
        </span>
      </div>

      {/* Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-primary/8 dark:bg-primary/12 border border-border/50 shadow-sm transition-all duration-300">
        <img src={icon} alt={label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
      </div>
    </animated.div>
  );
};

export default MainCard;