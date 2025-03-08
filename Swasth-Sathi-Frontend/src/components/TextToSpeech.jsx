import { useState, useEffect } from 'react';

const getVoiceForLanguage = (voices, language) => {
  console.log(language);
  console.log(voices);
  const matchedVoice = voices.find(
    (voice) => voice.lang.startsWith(language) && voice.name.toLowerCase().includes('female')
  );
  return matchedVoice || voices.find((voice) => voice.lang.startsWith(language)) || voices[0];
};

const useTextToSpeech = (language) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-Speech is not supported in this browser.');
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        const voiceForLanguage = getVoiceForLanguage(availableVoices, language);
        setSelectedVoice(voiceForLanguage);
      }
    };

    // Load voices with a timeout fallback for better reliability
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setTimeout(loadVoices, 100); // Fallback if `onvoiceschanged` doesn't fire
    }
  }, [language]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window && selectedVoice)) {
      console.warn('Text-to-Speech is not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = language;
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  return speakText;
};

export default useTextToSpeech;
