import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";
import { useEffect } from "react";

function PatientSelection() {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);

  useEffect(() => {
          // Speak the main heading and subheading on page load
          speakText(`${t('patient_selection_page.main_heading')}.${t('patient_selection_page.subheading')}`);
        }, [speakText, t, i18n.language]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">

      <header className="bg-gray-800 text-white py-4">
        <h1
          onMouseEnter={() => speakText(t('patient_selection_page.header_title'))}
          className="text-2xl"
        >
          {t('patient_selection_page.header_title')}
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-white">
        <h2
          className="text-3xl mb-4"
          onMouseEnter={() => speakText(t('patient_selection_page.main_heading'))}
        >
          {t('patient_selection_page.main_heading')}
        </h2>

        <p
          className="mb-8"
          onMouseEnter={() => speakText(t('patient_selection_page.subheading'))}
        >
          {t('patient_selection_page.subheading')}
        </p>

        <div className="space-x-4">
          <Link to="/registration">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-4xl py-6 px-10 mx-2 rounded-2xl shadow-md"
              onMouseEnter={() => speakText(t('patient_selection_page.new_user_button'))}
            >
              {t('patient_selection_page.new_user_button')}
            </button>
          </Link>

          <Link to="/patient-id">
            <button
              className="bg-green-500 hover:bg-green-600 text-white text-4xl py-6 px-10 mx-2 rounded-2xl shadow-md"
              onMouseEnter={() => speakText(t('patient_selection_page.existing_user_button'))}
            >
              {t('patient_selection_page.existing_user_button')}
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-2">
        <p
          onMouseEnter={() => speakText(t('patient_selection_page.footer_text'))}
        >
          {t('patient_selection_page.footer_text')}
        </p>
      </footer>

    </div>
  );
}

export default PatientSelection;
