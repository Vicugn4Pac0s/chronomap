import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

interface ClockProps {
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ className }) => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={`text-white text-4xl font-mono ${className}`}>
      {time.format('YYYY/MM/DD HH:mm:ss')}
    </div>
  );
};

export default Clock;