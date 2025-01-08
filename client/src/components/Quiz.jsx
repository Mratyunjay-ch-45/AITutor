import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Quiz = () => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [detailedResults, setDetailedResults] = useState(null);

    const handleTopicSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/quiz/generate', {
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
            const response = await axios.post('http://localhost:8000/quiz/submit', {
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
        <div className='flex flex-col w-full justify-between items-center bg-[#020617] text-white min-h-screen p-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl"
            >
                <form onSubmit={handleTopicSubmit} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter a topic for your quiz"
                            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="p-4 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
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
                            <div key={index} className="bg-white/5 p-6 rounded-lg">
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
                                                className="form-radio text-blue-600"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        <button
                            onClick={handleQuizSubmit}
                            className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            disabled={Object.keys(userAnswers).length !== questions.length}
                        >
                            Submit Quiz
                        </button>

                        {score !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center p-6 bg-white/5 rounded-lg"
                            >
                                <h2 className="text-2xl mb-2">Your Score</h2>
                                <p className="text-4xl font-bold">{score.toFixed(1)}%</p>
                                
                                {detailedResults && (
                                    <div className="mt-6 text-left">
                                        <h3 className="text-xl mb-4">Detailed Results</h3>
                                        {detailedResults.map((result, index) => (
                                            <div key={index} className={`p-4 mb-4 rounded-lg ${result.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                                <p className="font-medium mb-2">{result.question}</p>
                                                <p>Your answer: {result.userAnswer}</p>
                                                {!result.isCorrect && (
                                                    <p className="text-red-300">Correct answer: {result.correctAnswer}</p>
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
    );
};

export default Quiz;

