import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";
import axiosInstance from "../../utils/axiosInstance";
export default function AIInteraction() {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState(""); // Status message
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);

  const handleSend = async () => {
    console.log("Sending to Gemini API:", input);
    try {
      const response = await axiosInstance.post("/ai/generate-questions", { symptoms: input });
      console.log("response is here",response.data);
      navigate("/diagnostic-questions", { state: { questions: response.data.questions, symptoms:input} });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = i18n.language || "en-US"; // Use the selected language

    recognition.onstart = () => {
      setIsListening(true);
      setStatus(t("ai_interaction_page.listening_status")); // "Please speak..."
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      setIsListening(false);
      setStatus(""); // Clear status
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
      setStatus(t("ai_interaction_page.error_status")); // "Error, try again."
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-indigo-200 text-center">
      <header className="bg-gray-800 text-white py-6">
        <h1
          className="text-4xl font-extrabold tracking-wide"
          onMouseEnter={() => speakText(t("ai_interaction_page.title"))}
        >
          {t("ai_interaction_page.title")}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl transform transition-transform hover:scale-105">
          <h2
            className="text-2xl font-semibold text-blue-800 mb-6"
            onMouseEnter={() => speakText(t("ai_interaction_page.prompt"))}
          >
            {t("ai_interaction_page.prompt")}
          </h2>
          
          {/* Status Message */}
          {status && <p className="text-red-500 font-semibold mb-2">{status}</p>}
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("ai_interaction_page.placeholder")}
            className="w-full text-lg p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
                isListening ? "bg-red-500" : "bg-gray-300"
              } hover:shadow-lg`}
            >
              <FaMicrophone className="w-7 h-7 text-white" />
            </button>

            <button
              onClick={handleSend}
              className="flex items-center justify-center w-32 h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
              onMouseEnter={() => speakText(t("ai_interaction_page.send_button"))}
            >
              <IoMdSend className="w-6 h-6 mr-2" />
              {t("ai_interaction_page.send_button")}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <p
          className="text-sm"
          onMouseEnter={() => speakText(t("ai_interaction_page.footer_text"))}
        >
          {t("ai_interaction_page.footer_text")}
        </p>
      </footer>
    </div>
  );
}
