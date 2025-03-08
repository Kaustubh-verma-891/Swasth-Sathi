import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import useTextToSpeech from '../../components/TextToSpeech';
import { useEffect } from 'react';

function Welcome() {
  const { t, i18n } = useTranslation();

  // Use the custom hook for text-to-speech functionality
  const speakText = useTextToSpeech(i18n.language);

  useEffect(() => {
    // Speak the main heading and subheading on page load
    speakText(`${t('welcome_page.main_heading')}. ${t('welcome_page.main_subheading')}`);
  }, [speakText, t, i18n.language]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-6">
        <div className="flex items-center justify-center space-x-2">
          <h1
            className="text-3xl font-bold"
            onMouseEnter={() => speakText(t('welcome_page.header_title'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.header_title')}
          </h1>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-white px-4">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <h2
            className="text-4xl font-semibold"
            onMouseEnter={() => speakText(t('welcome_page.main_heading'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.main_heading')}
          </h2>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-8">
          <p
            className="text-lg"
            onMouseEnter={() => speakText(t('welcome_page.main_subheading'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.main_subheading')}
          </p>
        </div>

        <div className="mb-8">
          <label
            htmlFor="language-select"
            className="block text-lg font-medium mb-2"
            onMouseEnter={() => speakText(t('welcome_page.language_label'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.language_label')}
          </label>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <button
            className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700"
            onMouseEnter={() => speakText(t('welcome_page.speak_button'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.speak_button')}
          </button>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <Link to="/patientselection">
            <button
              className="bg-yellow-500 text-black py-3 px-6 rounded-lg text-lg hover:bg-yellow-600"
              onMouseEnter={() => speakText(t('welcome_page.start_health_check_button'))} // Trigger text-to-speech on hover
            >
              {t('welcome_page.start_health_check_button')}
            </button>
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="flex items-center justify-center">
          <p
            className="text-sm"
            onMouseEnter={() => speakText(t('welcome_page.footer_text'))} // Trigger text-to-speech on hover
          >
            {t('welcome_page.footer_text')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
