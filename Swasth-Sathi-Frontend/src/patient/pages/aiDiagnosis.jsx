import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useTextToSpeech from "../../components/TextToSpeech";

export default function Diagnosis() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  const navigate = useNavigate();
  function parseGeminiResponse(responseText) {
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
  
    try {
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  const rawData = location.state?.report || {};
  console.log(rawData);

  const parsedData = parseGeminiResponse(rawData);

  const diagnosisData = {
    diagnosis: parsedData.diagnosis || t("diagnosis_page.diagnosis_message"),
    advice: Array.isArray(parsedData.advice) ? parsedData.advice : parsedData.advice?.split('\n- ')?.slice(1) || [],
    recommendations: Array.isArray(parsedData.recommendation) ? parsedData.recommendation : parsedData.recommendation?.split('\n- ')?.slice(1) || [],
  };
  console.log(diagnosisData);

  useEffect(() => {
    speakText(`${t("diagnosis_page.main_heading")}. ${diagnosisData.diagnosis}`);
  }, [diagnosisData, speakText, t]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-6 shadow-md">
        <h1 className="text-3xl font-extrabold" onMouseEnter={() => speakText(t("diagnosis_page.header_title"))}>
          {t("diagnosis_page.header_title")}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-5xl w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6" onMouseEnter={() => speakText(t("diagnosis_page.main_heading"))}>
            {t("diagnosis_page.main_heading")}
          </h2>

          <p className="text-lg text-gray-600 mb-6" onMouseEnter={() => speakText(diagnosisData.diagnosis)}>
            <strong>{t("diagnosis_page.diagnosis_label")}:</strong> {diagnosisData.diagnosis}
          </p>

          {diagnosisData.advice.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3" onMouseEnter={() => speakText(t("diagnosis_page.advice_title"))}>
                {t("diagnosis_page.advice_title")}
              </h3>
              <ul className="text-lg text-gray-600 list-disc list-inside">
                {diagnosisData.advice.map((tip, index) => (
                  <li key={index} className="mb-2" onMouseEnter={() => speakText(tip)}>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* {diagnosisData.recommendations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3" onMouseEnter={() => speakText(t("diagnosis_page.recommendations_title"))}>
                {t("diagnosis_page.recommendations_title")}
              </h3>
              <ul className="text-lg text-gray-600 list-disc list-inside">
                {diagnosisData.recommendations.map((rec, index) => (
                  <li key={index} className="mb-2" onMouseEnter={() => speakText(rec)}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          <div className="flex justify-center space-x-4">
            <button onClick={() => navigate("/payment-gateway")} className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105">
              {t("diagnosis_page.consult_doctor_button")}
            </button>
            <button onClick={() => navigate("/feedback")} className="py-3 px-6 border-2 border-gray-400 text-gray-800 font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:border-gray-600">
              {t("diagnosis_page.thank_you_button")}
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 w-full text-center shadow-inner">
        <p className="text-sm" onMouseEnter={() => speakText(t("diagnosis_page.footer_text"))}>
          {t("diagnosis_page.footer_text")}
        </p>
      </footer>
    </div>
  );
}
