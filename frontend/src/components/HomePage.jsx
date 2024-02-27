import React from 'react';
import GameInstructions from './GameInstructions';
import { useNavigate } from 'react-router-dom';
import colorTheme from '../style';

const HomePage = () => {
  const navigateTo = useNavigate();

  const startGame = () => {
    navigateTo('/selectedlanguage');
  };

  return (
    <div className={`bg-gradient-to-r ${colorTheme.primary} from-30% ${colorTheme.secondary} h-screen flex flex-col items-center text-white`}>
      <div className="container mx-auto p-8 bg-gradient-to-r from-[#003049] from-20% to-[#14213d] rounded-lg shadow-md mt-32 mb-20 relative">
        <h1 style={{ fontFamily: 'Young Serif, serif' }} className="text-4xl font-semibold text-center font-mono mb-8">
          Quiz Game For Programmers
        </h1>

        {/* Content Wrapper */}
        <div className="flex flex-col w-full max-w-4xl lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-1/2 p-8 lg:pr-4">
            <GameInstructions />
          </div>

          {/* Button */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:justify-end">
            <button
              className={`bg-yellow-600 betterhover:hover:bg-[#003049] transition duration-300 ease-in-out font-arial text-white py-2 px-4 rounded shadow-md mb-4 lg:mb-0 lg:absolute lg:bottom-8 lg:right-8`}
              onClick={startGame}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
