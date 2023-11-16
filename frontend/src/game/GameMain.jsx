import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//api endpoint is basically refers to the backend url and language = api of the language i am hitting
const GameMain = ({language, apiEndpoint}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  
  //Fetching question through API 
  useEffect(() => {
   
  
    axios
      .get(`${apiEndpoint}/${language}Q`)
      .then((response) => {
        const fetchedQuestions = response.data.questions;
        setQuestions(fetchedQuestions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [apiEndpoint, language]);
  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      // Game Over, save the game record and fetch the percentage
      saveGameRecord(score);
      fetchPercentage();
    }
  }, [currentQuestionIndex, questions, score]);

  // Play again button logic
  const navigate = useNavigate();
  const homePage = () => {
    navigate('/selectedlanguage')
  }

  //Saving the score in DB 
  const saveGameRecord = async (score) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/storingScore`, { score });
      console.log('Game record saved successfully');
    } catch (error) {
      console.error('Failed to save game record:', error);
    }
  };

  //Fetching the percentage through API
  const fetchPercentage = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/displayScore`)
      .then((response) => {
        const fetchedPercentage = response.data.percentage;
        setPercentage(fetchedPercentage);
      })
      .catch((error) => {
        console.error('Error fetching percentage:', error);
      });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption('');
  };

  return (
    <div className="bg-blue-500 h-screen flex flex-col justify-center items-center">
      {currentQuestionIndex < questions.length ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-3xl font-semibold font-sans mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="mb-4 font-serif">{questions[currentQuestionIndex].question}</p>
          <div className="flex flex-col font-serif">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="mb-2 flex items-center">
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="bg-gray-200 p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-3xl font-semibold font-mono mb-4 shadow-lg">Game Over</h2>
        <p>Your Score: {score}/{questions.length}</p>
        {percentage !== null && (
          <div className="items-center text-center rounded-lg justify-between mt-4">
            <p className='bg-green-400 font-semibold rounded-lg'>{percentage.toFixed(2)}% Player's Scored 7 or More..</p>
          </div>
        )}
        <div>
          <button className='bg-red-500 mt-3 ml-48 py-3 px-2 rounded hover:bg-red-600 font-semibold' onClick={homePage}>
            Play Again
          </button>
        </div>
      </div>
    )}
  </div>
);
};
export default GameMain;
