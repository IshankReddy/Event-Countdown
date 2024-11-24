import React, { useState, useEffect } from 'react';
import { Timer, TimeLeft } from './types';
import CountdownTimer from './components/CountdownTimer';
import AddTimerForm from './components/AddTimerForm';
import { Timer as TimerIcon } from 'lucide-react';

function App() {
  const [timers, setTimers] = useState<Timer[]>(() => {
    const saved = localStorage.getItem('timers');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((timer: any) => ({
        ...timer,
        targetDate: new Date(timer.targetDate)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const calculateTimeLeft = (targetDate: Date): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const handleAddTimer = (title: string, targetDate: Date, color: string) => {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      title,
      targetDate,
      color
    };
    setTimers([...timers, newTimer]);
  };

  const handleDeleteTimer = (id: string) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  // Force update every second
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TimerIcon className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Event Countdown</h1>
          </div>
          <p className="text-gray-600">Create countdowns for your important events and milestones</p>
        </header>

        <AddTimerForm onAdd={handleAddTimer} />

        <div className="grid gap-6 md:grid-cols-2">
          {timers.map(timer => (
            <CountdownTimer
              key={timer.id}
              timer={timer}
              timeLeft={calculateTimeLeft(timer.targetDate)}
              onDelete={handleDeleteTimer}
            />
          ))}
        </div>

        {timers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>No countdowns yet. Add your first event above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;