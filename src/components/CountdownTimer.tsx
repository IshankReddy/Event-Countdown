import React from 'react';
import { Timer, TimeLeft } from '../types';
import { Clock, Calendar, Trash2 } from 'lucide-react';

interface Props {
  timer: Timer;
  timeLeft: TimeLeft;
  onDelete: (id: string) => void;
}

export default function CountdownTimer({ timer, timeLeft, onDelete }: Props) {
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className={`p-6 rounded-xl shadow-lg ${timer.color} transform transition-all duration-300 hover:scale-102 hover:shadow-xl`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          {timer.title}
        </h3>
        <button
          onClick={() => onDelete(timer.id)}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Delete timer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <TimeBlock value={days} label="Days" />
        <TimeBlock value={hours} label="Hours" />
        <TimeBlock value={minutes} label="Minutes" />
        <TimeBlock value={seconds} label="Seconds" />
      </div>
      
      <div className="mt-4 text-white/80 text-sm flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>Target: {timer.targetDate.toLocaleDateString()} {timer.targetDate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/10 rounded-lg p-3">
      <div className="text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  );
}