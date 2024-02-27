import React from 'react';

const GameInstructions = () => {
  return (
    <div className="bg-black-200 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Games Instructions</h2>
      <p>
        - Select the language in which you think you
          can score max amount of score.
      </p>
      <p>
        - There will be 10 questions with 4 options 
          in which 1 will be the correct answer.
      </p>
    </div>
  );
};

export default GameInstructions;
