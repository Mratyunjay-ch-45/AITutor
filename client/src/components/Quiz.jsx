import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const Quiz = () => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detailedResults, setDetailedResults] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const navigate = useNavigate();

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };


    const handleTopicSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://aitutor-ctpy.onrender.com/quiz/generate', {
                topic: topic,
                numQuestions: 10,
                numOptions: 4
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data && response.data.questions) {
                const formattedQuestions = response.data.questions.map(q => ({
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correctAnswer
                }));

                setQuestions(formattedQuestions);
                setUserAnswers({});
                setScore(null);
                setDetailedResults(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error generating quiz:', error);
            setError(error.response?.data?.error || 'Failed to generate quiz. Please try again.');
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionIndex, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: answer
        });
    };

    const handleQuizSubmit = async () => {
        try {
            const response = await axios.post('https://aitutor-ctpy.onrender.com/quiz/submit', {
                questions: questions,
                userAnswers: Object.values(userAnswers)
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const { score, correctAnswers, totalQuestions, detailedResults } = response.data;
            setScore(score);
            setDetailedResults(detailedResults);
            
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setError(error.response?.data?.error || 'Failed to submit quiz. Please try again.');
        }
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#020617] text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
            <style>
                {`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    * {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold flex items-center gap-2"
                    >
                        AITUTOR
                        <img 
                            src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309" 
                            alt="" 
                            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full'
                        />
                    </motion.h1>
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className={`p-3 sm:p-4 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/chat')}
                            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-black hover:bg-gray-900 text-white text-sm sm:text-base"
                        >
                            <img 
                                src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309"
                                alt="AI Avatar"
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                            />
                            <span>Chat with AI</span>
                        </motion.button>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <form onSubmit={handleTopicSubmit} className="mb-8">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter a topic for your quiz"
                                className={`flex-1 p-3 rounded-lg border focus:outline-none focus:border-blue-500 ${
                                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading || !topic.trim()}
                            >
                                {loading ? 'Generating...' : 'Generate Quiz'}
                            </button>
                            
                        </div>
                    </form>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-red-500/20 text-red-200' : 'bg-red-100 text-red-800'}`}
                        >
                            {error}
                        </motion.div>
                    )}

                    {questions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {questions.map((question, index) => (
                                <div 
                                    key={index} 
                                    className={`p-6 rounded-lg ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                                    }`}
                                >
                                    <h3 className="text-lg mb-4">{question.question}</h3>
                                    <div className="space-y-2">
                                        {question.options.map((option, optionIndex) => (
                                            <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={userAnswers[index] === option}
                                                    onChange={() => handleAnswerSelect(index, option)}
                                                    className="form-radio text-blue-500"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            <button
                                onClick={handleQuizSubmit}
                                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                disabled={Object.keys(userAnswers).length !== questions.length}
                            >
                                Submit Quiz
                            </button>

                            {score !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`text-center p-6 rounded-lg ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                                    }`}
                                >
                                    <h2 className="text-2xl mb-2">Your Score</h2>
                                    <p className="text-4xl font-bold">{score.toFixed(1)}%</p>
                                    
                                    {detailedResults && (
                                        <div className="mt-6 text-left">
                                            <h3 className="text-xl mb-4">Detailed Results</h3>
                                            {detailedResults.map((result, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`p-4 mb-4 rounded-lg ${
                                                        result.isCorrect 
                                                            ? (isDarkMode ? 'bg-green-500/20' : 'bg-green-100') 
                                                            : (isDarkMode ? 'bg-red-500/20' : 'bg-red-100')
                                                    }`}
                                                >
                                                    <p className="font-medium mb-2">{result.question}</p>
                                                    <p>Your answer: {result.userAnswer}</p>
                                                    {!result.isCorrect && (
                                                        <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
                                                            Correct answer: {result.correctAnswer}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Quiz;

