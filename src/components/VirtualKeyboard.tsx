import React from 'react';
import { Button } from './ui/button';

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  targetWord: string;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, guesses, targetWord }) => {
  const getKeyStyle = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return 'bg-gray-400 text-white';
    
    for (const guess of guesses) {
      if (guess.includes(key)) {
        if (targetWord.includes(key)) {
          return targetWord.split('').some((letter, index) => letter === key && guess[index] === key)
            ? 'bg-green-500 text-white'
            : 'bg-yellow-500 text-white';
        }
        return 'bg-gray-500 text-white';
      }
    }
    return 'bg-gray-200';
  };

  return (
    <div className="mt-4">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((key) => (
            <Button
              key={key}
              className={`px-4 py-6 m-1 rounded h-15 font-bold ${getKeyStyle(key)}
                ${key === 'ENTER' || key === 'BACKSPACE' ? 'w-16' : 'w-10'}`}
              onClick={() => onKeyPress(key)}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;