import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GameMain = ({ language, apiEndpoint }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  //To handle Game Record - for ending and saving 
  const questionsLoaded = useRef(false);
  const scoreRef = useRef(score);

  useEffect(() => {
    axios
      .get(`${apiEndpoint}/${language}Q`)
      .then((response) => {
        const fetchedQuestions = response.data.questions;
        const initialSelectedOptions = {};
        fetchedQuestions.forEach((_, index) => {
          initialSelectedOptions[index] = "";
        });
        setSelectedOptions(initialSelectedOptions);
        setQuestions(fetchedQuestions);
        questionsLoaded.current = true; //Questions are loaded
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [apiEndpoint, language]);

  useEffect(() => {
    if (questionsLoaded.current && currentQuestionIndex >= questions.length) {
      // Game Over, save the game record and fetch the percentage
      saveGameRecord(scoreRef.current);
      fetchPercentage();
    }
  }, [currentQuestionIndex, questions.length]);

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    });
  };

  const handleNextQuestion = () => {
    // Check if an option is selected
    if (!selectedOptions[currentQuestionIndex]) {
      alert("Please choose an option before moving to the next question");
      return;
    }

    // Check if the selected option is correct
    if (
      selectedOptions[currentQuestionIndex] ===
      questions[currentQuestionIndex].correctAnswer
    ) {
      setScore(score + 1);
      scoreRef.current = score + 1;
    }

    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const navigate = useNavigate();
  const homePage = () => {
    navigate("/selectedlanguage");
  };

  // Saving the score in DB
  const saveGameRecord = async (score) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/storingScore`, {
        score,
      });
      console.log("Game record saved successfully");
    } catch (error) {
      console.error("Failed to save game record:", error);
    }
  };

  // Fetching the percentage through API
  const fetchPercentage = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/displayScore`)
      .then((response) => {
        const fetchedPercentage = response.data.percentage;
        setPercentage(fetchedPercentage);
      })
      .catch((error) => {
        console.error("Error fetching percentage:", error);
      });
  };

  const showSummaryHandler = () => {
    setShowSummary(true);
  };

  const closeSummaryHandler = () => {
    setShowSummary(false);
  };

  return (
    <div className="bg-blue-500 h-screen flex flex-col justify-center items-center">
      {questions.length > 0 && (
        <>
          {currentQuestionIndex < questions.length ? (
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
              <h2 className="text-3xl font-semibold font-sans mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="mb-4 font-serif">
                {questions[currentQuestionIndex].question}
              </p>
              <div className="flex flex-col font-serif">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label key={index} className="mb-2 flex items-center">
                      <input
                        type="radio"
                        name="options"
                        value={option}
                        checked={
                          selectedOptions[currentQuestionIndex] === option
                        }
                        onChange={() => handleOptionSelect(option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  )
                )}
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
              <h2 className="text-3xl font-semibold font-mono mb-4 shadow-lg">
                Game Over
              </h2>
              <p>
                Your Score: {score}/{questions.length}
              </p>
              {percentage !== null && (
                <div className="items-center text-center rounded-lg justify-between mt-4">
                  <p className="bg-green-400 font-semibold rounded-lg">
                    {percentage.toFixed(2)}% Player's Scored 7 or More..
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <button
                  className="bg-green-600 mt-12 py-3 px-2 rounded hover:bg-green-700 font-semibold"
                  onClick={showSummaryHandler}
                >
                  Show Summary
                </button>
                <button
                  className="bg-red-500 mt-12 py-3 px-2 rounded hover:bg-red-600 font-semibold"
                  onClick={homePage}
                >
                  Play Again
                </button>
              </div>
              {showSummary && (
                <div className="summary-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg  bg-white p-8 border-2 border-gray-300 rounded max-h-96 overflow-y-auto">
                  <button
                    className="close-btn absolute top-4 hover:bg-red-600 right-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={closeSummaryHandler}
                  >
                    Close
                  </button>
                  <h3 className="text-xl font-semibold underline font-sans mb-2">
                    Summary:
                  </h3>
                  {questions.map((question, index) => (
                    <div key={index} className="mb-2 font-serif">
                      <p>{`Q${index + 1}: ${question.question}`}</p>
                      <p>{`Your Answer: ${selectedOptions[index]}`}</p>
                      <p>{`Correct Answer: ${question.correctAnswer}`}</p>
                      <hr className="my-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameMain;
