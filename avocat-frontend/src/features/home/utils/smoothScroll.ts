const easeInOutQuart = (progress: number) => {
  if (progress < 0.5) return 8 * progress * progress * progress * progress;
  const inverse = -2 * progress + 2;
  return 1 - (inverse * inverse * inverse * inverse) / 2;
};

export const smoothScrollTo = (targetY: number, duration = 900) => {
  const startY = window.scrollY;
  const deltaY = targetY - startY;
  let animationFrame = 0;
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuart(progress);

    window.scrollTo({ top: startY + deltaY * eased, behavior: 'auto' });

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(step);
    }
  };

  animationFrame = window.requestAnimationFrame(step);
  return () => window.cancelAnimationFrame(animationFrame);
};

export const scrollToSection = (sectionId: string, offset = 72) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(Math.max(sectionTop - offset, 0));
};
