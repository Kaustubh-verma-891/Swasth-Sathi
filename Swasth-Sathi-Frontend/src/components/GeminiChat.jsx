import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function HealthChatComponent() {
  const [inputValue, setInputValue] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('How are you feeling today?');

  const genAI = new GoogleGenerativeAI(`${import.meta.env.GEMINI_API_KEY}`);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      setSpeechRecognition(recognition);

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleVoiceInput = () => {
    if (speechRecognition) {
      if (isListening) {
        speechRecognition.stop();
      } else {
        speechRecognition.start();
      }
    }
  };

  const askNextQuestion = async (patientResponse) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Patient said: "${patientResponse}". What's the next relevant health question to ask?`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: 'doctor', message: response },
      ]);

      setCurrentQuestion(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Gemini response', error);
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { role: 'user', message: inputValue },
      ]);

      askNextQuestion(inputValue);
      setInputValue('');
    }
  };

  const renderConversation = () => {
    return conversationHistory.map((entry, index) => (
      <div
        key={index}
        className={`p-3 my-2 rounded-lg ${entry.role === 'user' ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'
          }`}
      >
        <p>{entry.message}</p>
      </div>
    ));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center text-blue-600">Health Assistant Chat</h2>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentQuestion}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isListening}
        />
        <button
          onClick={handleVoiceInput}
          className={`w-16 h-16 flex justify-center items-center rounded-full ${isListening ? 'bg-red-500' : 'bg-green-500'
            } text-white text-xl transition-colors duration-200`}
        >
          {isListening ? '🔴' : '🎤'}
        </button>
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <span className="text-blue-500 font-semibold">Loading...</span>
        </div>
      ) : (
        <div className="mt-4 space-y-2">{renderConversation()}</div>
      )}
    </div>
  );
}

export default HealthChatComponent;
