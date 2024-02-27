import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colorTheme from "../style";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const GameMain = ({ language, apiEndpoint }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);

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
        const initialSelectedOptions = {};
        fetchedQuestions.forEach((_, index) => {
          initialSelectedOptions[index] = "";
        });
        setSelectedOptions(initialSelectedOptions);
        setQuestions(fetchedQuestions);
        setLoading(false);
        questionsLoaded.current = true; //Questions are loaded
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        console.error("Error fetching questions:", error);
      });
  }, [apiEndpoint, language]);


  useEffect(() => {
    if (questionsLoaded.current && currentQuestionIndex >= questions.length) {
    if (questionsLoaded.current && currentQuestionIndex >= questions.length) {
      // Game Over, save the game record and fetch the percentage
      saveGameRecord(scoreRef.current);
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
  const notify = () => {
    toast.info("Please choose an option before moving to the next question.", {
      position: "top-center",
      autoClose: 20000, // Close the notification after 2 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#fca311",
        color: "white",
      },
    });
  };

  //Loading bar
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleNextQuestion = () => {
    // Check if an option is selected
    if (!selectedOptions[currentQuestionIndex]) {
      notify();
      //alert("Please choose an option before moving to the next question");
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
    navigate("/selectedlanguage");
  };

  // Saving the score in DB
  // Saving the score in DB
  const saveGameRecord = async (score) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/storingScore`, {
        score,
      });
      console.log("Game record saved successfully");
      await axios.post(`${import.meta.env.VITE_BASE_URL}/storingScore`, {
        score,
      });
      console.log("Game record saved successfully");
    } catch (error) {
      console.error("Failed to save game record:", error);
      console.error("Failed to save game record:", error);
    }
  };

  // Fetching the percentage through API
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
        console.error("Error fetching percentage:", error);
      });
  };

  const showSummaryHandler = () => {
    setShowSummary(true);
  const showSummaryHandler = () => {
    setShowSummary(true);
  };

  const closeSummaryHandler = () => {
    setShowSummary(false);
  const closeSummaryHandler = () => {
    setShowSummary(false);
  };

  return (
    <div
      className={`bg-gradient-to-r ${colorTheme.primary} from-30% ${colorTheme.secondary} h-screen flex flex-col justify-center items-center`}
    >
      {loading ? (
        // Loading indicator
        <BarLoader color="#fff" css={override} loading={loading} size={150} />
      ) : (
        <>
          {questions.length > 0 && (
            <>
              {currentQuestionIndex < questions.length ? (
                <div className="bg-blue-50 p-8 rounded-lg shadow-md w-96 text-center">
                  <h2
                    style={{ fontFamily: "Young Serif, serif" }}
                    className="text-3xl font-semibold font-sans mb-4"
                  >
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <p className="mb-6 font-serif">
                    {questions[currentQuestionIndex].question}
                  </p>
                  <div className="flex flex-col font-serif">
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <label
                          key={index}
                          style={{ fontFamily: "Poppins, sans-serif" }}
                          className="mb-2 flex items-center"
                        >
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
                    className="bg-[#fca311] text:black hover:bg-[#003049] hover:text-white py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="bg-blue-50 p-8 rounded-lg shadow-md w-96 text-center">
                  <h2
                    style={{ fontFamily: "Young Serif, serif" }}
                    className="text-3xl font-semibold font-mono mb-4 shadow-lg"
                  >
                    Game Over
                  </h2>
                  <p className="font-semibold">
                    Your Score: {score}/{questions.length}
                  </p>
                  {percentage !== null && (
                    <div className="items-center text-center rounded-lg justify-between mt-4">
                      <p className="bg-gradient-to-r from-blue-600 to-green-400 font-semibold rounded-lg">
                        {percentage.toFixed(2)}% Player's Scored 7 or More..
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <button
                      className="bg-[#fca311] mt-12 py-4 px-2 rounded hover:bg-[#003049] hover:text-white font-semibold transition duration-300 ease-in-out"
                      onClick={showSummaryHandler}
                    >
                      Show Summary
                    </button>
                    <button
                      className="bg-[#fca311] mt-12 py-3 px-8 rounded hover:bg-[#003049] hover:text-white font-semibold transition duration-300 ease-in-out"
                      onClick={homePage}
                    >
                      Play Again
                    </button>
                  </div>
                  {showSummary && (
                    <div className="summary-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 border-2 border-gray-300 rounded max-h-96 overflow-y-auto w-full md:w-3/4 lg:w-1/2">
                      <button
                        className="close-btn text-black font-semibold absolute top-4 hover:bg-[#003049] right-4 bg-[#fca311] hover:text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                        onClick={closeSummaryHandler}
                      >
                        Close
                      </button>
                      <h3
                        style={{ fontFamily: "Young Serif, serif" }}
                        className="text-xl font-semibold underline font-sans mb-2"
                      >
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
        </>
      )}
    </div>
  );
};


export default GameMain;
