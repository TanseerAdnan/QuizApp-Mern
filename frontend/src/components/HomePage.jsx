import React from 'react';
import GameInstructions from './GameInstructions';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigateTo = useNavigate();

  const startGame = () => {
    navigateTo('/selectedlanguage');
  }

  return (
    <div className="bg-blue-500 h-screen flex flex-col items-center "> 
      <h1 className="text-white text-4xl font-semibold font-mono shadow-lg mb-20 mt-36">
        Quiz Game For Programmers
      </h1>

      {/* Content Wrapper */}
      <div className="flex justify-between w-full max-w-4xl">
        <div className="w-1/2 p-8"> <GameInstructions /> </div>

        {/* Button */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          <button className="bg-red-700 hover:bg-orange-700 font-arial text-white py-2 px-4 rounded shadow-md mb-4"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
