import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useTextToSpeech from "../../components/TextToSpeech";

export default function Feedback() {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, review });
    navigate("/");
  };

  useEffect(() => {
    speakText(t('feedback_page.header_title'));
  }, [speakText, t]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 text-center">
      <header className="bg-gray-800 text-white py-6">
        <div className="flex items-center justify-center space-x-2">
          <h1
            className="text-3xl font-bold"
            onMouseEnter={() => speakText(t('feedback_page.header_title'))}
          >
            {t('feedback_page.header_title')}
          </h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-white px-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2
            className="text-2xl font-bold text-blue-800 mb-4"
            onMouseEnter={() => speakText(t('feedback_page.form_title'))}
          >
            {t('feedback_page.form_title')}
          </h2>

          <div className="flex mb-4 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-8 h-8 cursor-pointer ${star <= rating ? "text-yellow-400 " : "text-gray-300"}`}
                onClick={() => {
                  setRating(star);
                  speakText(`${star} ${t('feedback_page.star_rating')}`);
                }}
              />
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={t('feedback_page.review_placeholder')}
            className="text-black mb-4 w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            onMouseEnter={() => speakText(t('feedback_page.review_placeholder'))}
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg mb-4"
            onMouseEnter={() => speakText(t('feedback_page.submit_button'))}
          >
            {t('feedback_page.submit_button')}
          </button>
        </form>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="flex items-center justify-center">
          <p
            className="text-sm"
            onMouseEnter={() => speakText(t('feedback_page.footer_text'))}
          >
            {t('feedback_page.footer_text')}
          </p>
        </div>
      </footer>
    </div>
  );
}
