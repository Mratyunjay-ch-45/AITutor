import React, { useState, useRef, useEffect } from 'react';
import { AITutorSession } from '../service/GeminiApi';
import { AudioLines, X, Moon, Sun } from 'lucide-react';
import ThreejsModel from './ThreejsModel';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const speechSynthesisRef = useRef(null);
  const audioIconRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    if (isListening && audioIconRef.current) {
      const animate = () => {
        audioIconRef.current.style.transform = `scale(${1 + Math.sin(Date.now() / 200) * 0.2})`;
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isListening]);

  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    
    setIsListening(true);
    
    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setInputMessage(spokenText);
      
      try {
        setIsLoading(true);
        const newUserMessage = { role: 'user', content: spokenText };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        
        const result = await AITutorSession.sendMessage(spokenText);
        const text = result.response.text();
        
        setCurrentAnswer(text);
        const newAssistantMessage = { role: 'assistant', content: text };
        setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
        
        setIsSpeaking(true);
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesisRef.current = speech;
        
        speech.onend = () => {
          setIsSpeaking(false);
          setCurrentAnswer('');
          handleSpeechRecognition();
        };
        
        window.speechSynthesis.speak(speech);
      } catch (error) {
        console.error('Error:', error);
        handleSpeechRecognition();
      } finally {
        setIsLoading(false);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      const newUserMessage = { role: 'user', content: inputMessage };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputMessage('');
      
      const result = await AITutorSession.sendMessage(inputMessage);
      const text = result.response.text();
      
      const newAssistantMessage = { role: 'assistant', content: text };
      setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopSpeaking = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentAnswer('');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      <div className={`flex flex-col h-screen  ${isDarkMode ? 'bg-[#020617] text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
        <div className="flex justify-between items-center w-full p-4">
        <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold flex items-center flex-row gap-2"
                    >
                        AITUTOR
                        <img src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309" alt="" className='w-10 h-10 rounded-full' />
                    </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
          >
            
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
       
        <motion.div 
          className="flex-1 p-4  overflow-y-auto scrollbar-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[#2563EB] text-white'
                      : isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {showModel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <ThreejsModel />
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                ref={audioIconRef}
                onClick={handleSpeechRecognition}
                disabled={isLoading || isSpeaking}
                className={`p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 ${
                  isListening ? 'animate-pulse' : ''
                }`}
              >
                <AudioLines />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => {
                  stopSpeaking();
                  setShowModel(false);
                }}
              >
                <X />
              </motion.button>
            </div>
            {currentAnswer && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center absolute bottom-8 w-full m-4 mx-auto"
              >
                <div className={`flex justify-center items-center p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                  <p>{currentAnswer}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex gap-5 items-center justify-center">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your study-related question..."
              className={`flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-md w-1/2 ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800'
              }`}
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              ref={audioIconRef}
              onClick={() => {
                setShowModel(true);
                handleSpeechRecognition();
              }}
              disabled={isLoading || isSpeaking}
              className={`p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 ${
                isListening ? 'animate-pulse' : ''
              }`}
            >
              <AudioLines />
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
