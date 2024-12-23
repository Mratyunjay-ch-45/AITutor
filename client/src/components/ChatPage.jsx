import React, { useState, useRef } from 'react';
import { AITutorSession } from '../service/GeminiApi';
import { AudioLines, X } from 'lucide-react';
import ThreejsModel from './ThreejsModel';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const speechSynthesisRef = useRef(null);

  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setInputMessage(spokenText);
      
      try {
        setIsLoading(true);
        const newMessages = [...messages, { role: 'user', content: spokenText }];
        setMessages(newMessages);
        
        const result = await AITutorSession.sendMessage(spokenText);
        const text = result.response.text();
        
        setCurrentAnswer(text);
        setMessages([...newMessages, { role: 'assistant', content: text }]);
        
        // Handle speech synthesis
        setIsSpeaking(true);
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesisRef.current = speech;
        
        speech.onend = () => {
          setIsSpeaking(false);
          setCurrentAnswer('');
        };
        
        window.speechSynthesis.speak(speech);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    recognition.start();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      const newMessages = [...messages, { role: 'user', content: inputMessage }];
      setMessages(newMessages);
      setInputMessage('');
      
      const result = await AITutorSession.sendMessage(inputMessage);
      const text = result.response.text();
      
      setMessages([...newMessages, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentAnswer('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020617]">
      {showModel && (
        <div className="fixed inset-0 z-50">
          <ThreejsModel />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleSpeechRecognition}
              disabled={isLoading || isSpeaking}
              className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <AudioLines />
            </button>
            <button
              className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => {
                stopSpeaking();
                setShowModel(false);
              }}
            >
              <X />
            </button>
          </div>
          {currentAnswer && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-2xl w-full mx-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-gray-800">{currentAnswer}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex gap-5 items-center justify-between">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your study-related question..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 shadow-md w-1/2"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
          <button
            onClick={() => {
              setShowModel(true);
              handleSpeechRecognition();
            }}
            disabled={isLoading || isSpeaking}
            className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <AudioLines />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;




