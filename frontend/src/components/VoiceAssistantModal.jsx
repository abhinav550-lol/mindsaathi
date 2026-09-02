import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceAssistantModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      setIsListening(false);
      setTranscript('');
      setAssistantReply('');
    }
  }, [isOpen]);

  const speakReply = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (cmdText) => {
    const text = cmdText.toLowerCase();
    setTranscript(cmdText);

    if (text.includes('game') || text.includes('play') || text.includes('खोल') || text.includes('खेल')) {
      const reply = "Opening your cognitive games now!";
      setAssistantReply(reply);
      speakReply(reply);
      setTimeout(() => {
        onClose();
        navigate('/games');
      }, 1500);
    } else if (text.includes('progress') || text.includes('score') || text.includes('प्रगति') || text.includes('स्कोर')) {
      const reply = "Showing your cognitive progress dashboard!";
      setAssistantReply(reply);
      speakReply(reply);
      setTimeout(() => {
        onClose();
        navigate('/progress');
      }, 1500);
    } else if (text.includes('reminder') || text.includes('medicine') || text.includes('दवा') || text.includes('पानी')) {
      const reply = "Your next reminder is Donepezil 5mg at 8:00 AM. Opening Reminders page.";
      setAssistantReply(reply);
      speakReply(reply);
      setTimeout(() => {
        onClose();
        navigate('/reminders');
      }, 2000);
    } else {
      const reply = `I heard: "${cmdText}". You can ask me to start games, show progress, or check reminders.`;
      setAssistantReply(reply);
      speakReply(reply);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('Listening for your voice...');
        };

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const resultText = event.results[current][0].transcript;
          setTranscript(resultText);
          if (event.results[current].isFinal) {
            setIsListening(false);
            handleCommand(resultText);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
          setTranscript('Voice recognition paused. Try quick commands below.');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        setTranscript('Microphone unavailable. Use quick buttons below.');
      }
    } else {
      setIsListening(false);
      setTranscript('Browser Speech Recognition not supported directly. Use quick buttons below.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" style={{ animation: 'revealUp 0.4s ease forwards' }}>
      <div
        className="w-full max-w-lg rounded-2xl p-6 sm:p-8 flex flex-col items-center"
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
        }}
      >

        {/* Microphone Icon */}
        <div className="relative mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
            style={{
              background: isListening ? 'var(--accent)' : 'var(--surface)',
              color: isListening ? 'var(--white)' : 'var(--foreground)',
              boxShadow: isListening ? '0 0 0 8px rgba(255,101,0,0.15)' : 'none',
            }}
          >
            🎤
          </div>
          {isListening && (
            <span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
              style={{ background: 'var(--accent)', color: 'var(--black)' }}
            >
              Listening...
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-1" style={{ color: 'var(--foreground)' }}>
          {t('voiceAssistant')}
        </h2>
        <p className="text-center text-base mb-6" style={{ color: 'var(--muted)' }}>
          Speak clearly or tap a quick command.
        </p>

        {/* Live Transcript */}
        <div
          className="w-full rounded-xl p-4 mb-6 min-h-[80px] flex flex-col justify-center text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-lg font-medium italic" style={{ color: 'var(--foreground)' }}>
            "{transcript || 'Waiting for voice input...'}"
          </p>
          {assistantReply && (
            <p className="text-sm font-medium mt-2" style={{ color: 'var(--accent)' }}>
              ✦ {assistantReply}
            </p>
          )}
        </div>

        {/* Quick Commands */}
        <div className="w-full mb-6">
          <p className="eyebrow-label text-center mb-3">Quick Commands</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { text: '"Start my game"', cmd: 'Start my game' },
              { text: '"Show my progress"', cmd: 'Show my progress' },
              { text: '"Next reminder?"', cmd: 'What is my next reminder?' },
            ].map((item) => (
              <button
                key={item.cmd}
                onClick={() => handleCommand(item.cmd)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                🗣️ {item.text}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={startListening}
            className="accent-btn flex-1 text-lg"
          >
            {isListening ? 'Listening...' : 'Tap to Speak'}
          </button>
          <button
            onClick={onClose}
            className="secondary-btn px-6 text-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
