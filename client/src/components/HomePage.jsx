import React from 'react';
import { motion } from 'framer-motion'
import {useNavigate} from 'react-router-dom';


    
const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
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

            <div className='flex flex-col w-full justify-between items-center bg-[#020617] text-white'>
            
                <div className="flex justify-between items-center w-full p-10">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold flex items-center flex-row gap-2"
                    >
                        AITUTOR
                        <img src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309" alt="" className='w-10 h-10 rounded-full' />
                    </motion.h1>
                    <div className='flex flex-row gap-2'>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
                        onClick={()=>navigate("/register")}
                    >
                        Register
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </motion.button>
                    </div>
                </div>
                <motion.div 
                    className="flex justify-between p-10 w-full h-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div 
                        className="w-1/2 pr-8"
                        initial={{ x: -100 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1 
                            className="text-5xl font-bold mb-4"
                            initial={{ y: -20 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Your Personal AI Learning Companion
                        </motion.h1>
                        <motion.p 
                            className="text-xl mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Experience personalized learning with our advanced AI tutor. Get instant answers, engage in natural conversations, and enhance your understanding through interactive study sessions.
                        </motion.p>
                        <div className="space-y-4">
                            <motion.div 
                                className="flex items-center"
                                initial={{ x: -50 }}
                                whileInView={{ x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <p>24/7 availability for your study needs</p>
                            </motion.div>
                            <motion.div 
                                className="flex items-center text-white"
                                initial={{ x: -50 }}
                                whileInView={{ x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                <p>Voice interaction for natural learning experience</p>
                            </motion.div>
                            <motion.div 
                                className="flex items-center"
                                initial={{ x: -50 }}
                                whileInView={{ x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>Personalized learning paths and feedback</p>
                            </motion.div>
                        </div>
                        <motion.button 
                            className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Learning Now
                        </motion.button>
                    </motion.div>
                    <motion.div 
                        className="w-1/2"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img 
                            src="https://cdna.artstation.com/p/assets/images/images/053/682/988/large/onur-inci-screenshot005.jpg?1662767290" 
                            alt="AI Tutor" 
                            className="w-full object-cover bg-white shadow-lg rounded-lg h-full hover:shadow-2xl transition-shadow duration-300"
                        />
                    </motion.div>
                </motion.div>
                
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Interactive Learning</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Engage with our AI tutor through natural conversations and receive instant, personalized feedback to enhance your understanding.
                    </p>
                    <div className="mt-6 flex items-center text-blue-500">
                        <span className="font-semibold">Learn More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Voice Integration</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Learn hands-free with our advanced voice recognition system. Speak naturally and receive spoken responses from your AI tutor.
                    </p>
                    <div className="mt-6 flex items-center text-blue-500">
                        <span className="font-semibold">Try Voice</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Adaptive Learning</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Experience a customized learning journey that adapts to your pace and style, ensuring optimal understanding and retention.
                    </p>
                    <div className="mt-6 flex items-center text-blue-500">
                        <span className="font-semibold">Start Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.div>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-20 px-4 md:px-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                    Study Smarter with AI
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Instant Answers */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white shadow-xl"
                    >
                        <div className="h-40 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Instant Expert Answers</h3>
                        <p className="mb-6 opacity-90">
                            Get immediate, detailed responses to all your academic questions, 24/7. No waiting required.
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                            Ask Now
                        </button>
                    </motion.div>

                    {/* Personalized Explanations */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-xl text-white shadow-xl"
                    >
                        <div className="h-40 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Clear Explanations</h3>
                        <p className="mb-6 opacity-90">
                            Receive step-by-step explanations tailored to your understanding level and learning style.
                        </p>
                        <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                            Learn More
                        </button>
                    </motion.div>

                    {/* Voice Interaction */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl text-white shadow-xl"
                    >
                        <div className="h-40 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Voice Chat</h3>
                        <p className="mb-6 opacity-90">
                            Simply speak your questions and receive spoken answers. Perfect for multitasking while studying.
                        </p>
                        <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors">
                            Try Voice Chat
                        </button>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Have a Question? Your AI Study Partner is Ready!
                    </h3>
                    <button className="bg-blue-600 mb-5 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                        Start Chatting
                    </button>
                </motion.div>
            </motion.div>

            </div>




        </>
    )
}

export default HomePage;

