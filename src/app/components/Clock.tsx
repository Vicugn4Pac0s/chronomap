import { useEffect } from 'react';
import useTimeStore from '../stores/timeStore';

interface ClockProps {
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ className }) => {
  const { time, updateTime } = useTimeStore();

  useEffect(() => {
    const timerId = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={`text-white text-4xl font-mono ${className}`}>
      {time}
    </div>
  );
};

export default Clock;