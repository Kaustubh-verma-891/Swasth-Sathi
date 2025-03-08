import React from 'react';
import HealthChatComponent from '../../components/GeminiChat';
// import GeminiInReact from '../../components/GeminiChat';
const Questionnaire = () => {
   return <div><HealthChatComponent/></div>
};

const SymptomQuestion = ({ question }) => {
  return (
    <div className="mb-4">
      <p className="mb-2 ">{question}</p>
      <div className="flex space-x-2">
        <button className="bg-green-500 text-white py-1 px-3 rounded-lg shadow-lg">Low</button>
        <button className="bg-yellow-500 text-black py-1 px-3 rounded-lg shadow-lg">Moderate</button>
        <button className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-lg">Severe</button>
      </div>
    </div>
  );
};

export default Questionnaire;
