import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function DiagnosticQuestions() {
  const navigate=useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const questions = location.state?.questions || [];
  const symptoms = location.state?.symptoms || "";
  const [report,setReport] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setAnswers(new Array(questions.length).fill(""));
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axiosInstance.post("/ai/generate-report",{symptoms,questions,answers});
    navigate("/ai-diagnosis", { state: { report: response.data.report } });
    setIsLoading(false)

    console.log(response.data.report);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center">
        <p className="text-2xl font-semibold text-white animate-pulse">
          {t('loading_message', { defaultValue: "Loading report..." })}
        </p>
      </div>
    );
  }

  if(report.length > 0){
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex items-center justify-center">
      <p className="text-2xl font-semibold text-white animate-pulse">
        {report}
      </p>
    </div>
    )
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-4">
        <h1
          className="text-2xl font-bold"
          onMouseEnter={() => speakText(t('diagnostic_questions_page.header_title'))}
        >
          {t('diagnostic_questions_page.header_title')}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h2 
          onMouseEnter={() => speakText(t('diagnostic_questions_page.main_heading'))}
          className="text-2xl font-semibold text-gray-800 mb-6">
            {t('diagnostic_questions_page.main_heading')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="space-y-1">
                <label
                  htmlFor={`question-${index}`}
                  className="text-lg font-medium text-gray-700"
                  onMouseEnter={() => speakText(question)}
                >
                  {question}
                </label>
                <input
                  id={`question-${index}`}
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
              onMouseEnter={() => speakText(t('diagnostic_questions_page.submit_button'))}
            >
              {t('diagnostic_questions_page.submit_button')}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-3 w-full text-center">
        <p onMouseEnter={() => speakText(t('diagnostic_questions_page.footer_text'))}
        className="text-sm">{t('diagnostic_questions_page.footer_text')}</p>
      </footer>
    </div>
  );
}
