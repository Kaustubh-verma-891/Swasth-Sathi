import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { code: 'pu', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' }
  ];

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("selectedLanguage", event.target.value); // Change the language
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
      <select
        id="language-select"
        onChange={changeLanguage}
        value={i18n.language}
        className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
