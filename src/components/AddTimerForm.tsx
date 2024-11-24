import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const COLORS = [
  'bg-gradient-to-br from-purple-600 to-blue-600',
  'bg-gradient-to-br from-pink-600 to-red-600',
  'bg-gradient-to-br from-green-600 to-teal-600',
  'bg-gradient-to-br from-orange-600 to-yellow-600',
];

interface Props {
  onAdd: (title: string, date: Date, color: string) => void;
}

export default function AddTimerForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const targetDate = new Date(`${date}T${time}`);
    onAdd(title, targetDate, selectedColor);
    setTitle('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-blue-600" />
        Add New Countdown
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <div className="flex items-center gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full ${color} ${
                selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Countdown
      </button>
    </form>
  );
}