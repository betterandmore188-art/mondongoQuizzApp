'use client';

import { useState } from 'react';

const iconTemplates = [
  { value: 'fox', label: 'Fox', icon: '🦊' },
  { value: 'leaf', label: 'Leaf', icon: '🍃' },
  { value: 'rocket', label: 'Rocket', icon: '🚀' },
  { value: 'lightbulb', label: 'Lightbulb', icon: '💡' },
  { value: 'ghost', label: 'Ghost', icon: '👻' },
  { value: 'spark', label: 'Spark', icon: '⚡' },
];

export default function IconSelector() {
  const [selectedIcon, setSelectedIcon] = useState(iconTemplates[0].value);

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-xs text-slate-500 uppercase tracking-[0.24em] md:text-base">
        Choose your avatar
      </span>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {iconTemplates.map((item) => (
          <label
            key={item.value}
            className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 bg-white text-2xl transition-all duration-200 ${
              selectedIcon === item.value
                ? 'border-main shadow-[0_0_0_6px_rgba(59,130,246,0.16)]'
                : 'border-transparent hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="icon-selector"
              value={item.value}
              aria-label={item.label}
              checked={selectedIcon === item.value}
              onChange={() => setSelectedIcon(item.value)}
              className="sr-only"
            />
            <span aria-hidden="true">{item.icon}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
