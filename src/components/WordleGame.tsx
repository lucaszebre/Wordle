'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import VirtualKeyboard from './VirtualKeyboard';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const WORD_LIST = ['REACT', 'NEXTJS', 'TAILO', 'STYLE', 'TWEET']; 

const WordleGame: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setTargetWord(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
  }, []);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error(`Guess must be ${WORD_LENGTH} letters long.`);
        return;
      }
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        toast.success('Congratulations! You guessed the word!');
        setGameOver(true);
      } else if (newGuesses.length === MAX_GUESSES) {
        toast.error(`Game over! The word was ${targetWord}`);
        setGameOver(true);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (targetWord[index] === letter) {
      return 'bg-green-500';
    } else if (targetWord.includes(letter)) {
      return 'bg-yellow-500';
    } else {
      return 'bg-gray-300';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-rows-6 gap-1 mb-4">
        {[...Array(MAX_GUESSES)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {[...Array(WORD_LENGTH)].map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] || '';
              return (
                <div
                  key={colIndex}
                  className={`w-14 h-14 flex items-center justify-center border-2 border-gray-300 text-2xl font-bold
                    ${rowIndex < guesses.length ? getLetterStyle(letter, colIndex, guesses[rowIndex]) : ''}
                    ${rowIndex === guesses.length && colIndex < currentGuess.length ? 'border-blue-500' : ''}`}
                >
                  {rowIndex === guesses.length ? currentGuess[colIndex] : letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <VirtualKeyboard onKeyPress={handleKeyPress} guesses={guesses} targetWord={targetWord} />
    </div>
  );
};

export default WordleGame;