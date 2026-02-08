import { useState, useEffect } from 'react';

const AnalogClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const radius = 60;
  const center = radius;
  const hourAngle = ((date.getHours() % 12) + date.getMinutes() / 60) * 30;
  const minuteAngle = date.getMinutes() * 6;
  const secondAngle = date.getSeconds() * 6;

  const handStyle = (angle, length, color, width) => ({
    x1: center,
    y1: center,
    x2: center + length * Math.cos((Math.PI * (angle - 90)) / 180),
    y2: center + length * Math.sin((Math.PI * (angle - 90)) / 180),
    stroke: color,
    strokeWidth: width,
  });

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (Math.PI / 6) * (i - 3);
      const x = center + (radius - 10) * Math.cos(angle);
      const y = center + (radius - 10) * Math.sin(angle);
      numbers.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="black"
        >
          {i}
        </text>,
      );
    }
    return numbers;
  };

  return (
    <svg
      width={2 * radius}
      height={2 * radius}
      className="drop-shadow-md ring-avocat-blue shadow-md   shadow-avocat-blue dark:shadow-avocat-orange-dark dark:shadow-bottom  rounded-full "
    >
      <circle
        cx={center}
        cy={center}
        r={radius - 4}
        className="fill-white dark:fill-orange-200/80 stroke-avocat-blue   dark:stroke-orange-400 stroke-4"
      />
      {renderNumbers()}
      <line {...handStyle(hourAngle, radius * 0.5, 'black', 4)} />
      <line {...handStyle(minuteAngle, radius * 0.7, 'blue', 3)} />
      <line {...handStyle(secondAngle, radius * 0.9, 'red', 1)} />
      <circle cx={center} cy={center} r="2" className="fill-blue-800" />
    </svg>
  );
};

export default AnalogClock;
