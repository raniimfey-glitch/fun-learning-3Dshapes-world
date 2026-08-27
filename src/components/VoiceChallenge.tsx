import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { SHAPES_DATA } from '../data/shapes';
import { ShapeData, StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { useTranslation } from '../utils/i18n';
import { saveProgress, addStarsAndGems } from '../utils/storage';
import { Mic, Volume2, Sparkles, MessageSquare, BookOpen } from 'lucide-react';
import { ShapeIcon } from './ShapeIcon';

interface VoiceChallengeProps {
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  lang?: Language;
}

export const VoiceChallenge: React.FC<VoiceChallengeProps> = ({
  progress,
  onProgressUpdate,
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [, setTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);

  const currentShape: ShapeData = SHAPES_DATA[selectedShapeIndex];

  const handleListen = () => {
    soundEffects.playPop();
    setIsListening(true);
    setTranscript('');
    setFeedback(null);

    const expectedWords = [
      currentShape.name,
      currentShape.tashkeelName,
      currentShape.id,
      currentShape.nameEn,
      currentShape.englishName
    ];

    const stop = appSpeech.startListening(
      expectedWords,
      result => {
        setIsListening(false);
        setTranscript(result.transcript);

        if (result.isCorrect) {
          soundEffects.playCorrect();
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          const successMsg = isAr
            ? `مُبْدِعٌ جِدًّا! نَطَقْتَ "${result.transcript}" بِنُطْقٍ صَحِيحٍ وَفَصِيحٍ! 🌟`
            : `Awesome job! You pronounced "${result.transcript}" accurately! 🌟`;
          setFeedback({ isSuccess: true, text: successMsg });
          appSpeech.speak(successMsg, lang);

          // Update student progress
          const updated = addStarsAndGems(progress, 4, 1);
          updated.voiceRecognizedCount = (updated.voiceRecognizedCount || 0) + 1;
          if (!updated.unlockedBadges.includes('linguist_champion') && updated.voiceRecognizedCount >= 3) {
            updated.unlockedBadges.push('linguist_champion');
            soundEffects.playFanfare();
          }
          saveProgress(updated);
          onProgressUpdate(updated);
        } else {
          soundEffects.playWrong();
          const targetWord = isAr ? currentShape.tashkeelName : currentShape.nameEn;
          const retryMsg = isAr
            ? `نَطَقْتَ "${result.transcript}". حَاوِلْ مَرَّةً أُخْرَى أَنْ تَقُولَ بِنُطْقٍ وَاضِحٍ: ${targetWord}`
            : `You said "${result.transcript}". Try again saying clearly: ${targetWord}`;
          setFeedback({ isSuccess: false, text: retryMsg });
          appSpeech.speak(retryMsg, lang);
        }
      },
      errorMsg => {
        setIsListening(false);
        setFeedback({ isSuccess: false, text: errorMsg });
      },
      lang
    );

    setStopListeningFn(() => stop);
  };

  const handleStop = () => {
    if (stopListeningFn) {
      stopListeningFn();
    }
    setIsListening(false);
  };

  const handleSimulateSpeechSuccess = () => {
    soundEffects.playCorrect();
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    const targetWord = isAr ? currentShape.tashkeelName : currentShape.nameEn;
    const successMsg = isAr
      ? `أَحْسَنْتَ النُّطْقَ يَا بَطَلَ الهَنْدَسَةِ! كَلِمَةُ (${targetWord}) صَحِيحَةٌ تَمَامًا!`
      : `Great pronunciation! The word "${targetWord}" is spot on!`;
    setTranscript(targetWord);
    setFeedback({ isSuccess: true, text: successMsg });
    appSpeech.speak(successMsg, lang);

    const updated = addStarsAndGems(progress, 3, 0);
    updated.voiceRecognizedCount = (updated.voiceRecognizedCount || 0) + 1;
    saveProgress(updated);
    onProgressUpdate(updated);
  };

  const speakCorrectPronunciation = () => {
    soundEffects.playPop();
    const word = isAr ? currentShape.tashkeelName : currentShape.nameEn;
    appSpeech.speak(word, lang);
  };

  const speakLinguisticRule = () => {
    soundEffects.playPop();
    if (isAr) {
      appSpeech.speak(`${currentShape.linguistics.rule}. ${currentShape.linguistics.explanation}`, 'ar');
    } else {
      appSpeech.speak(`${currentShape.nameEn}: ${currentShape.linguistics.explanationEn || currentShape.linguistics.ruleEn}`, 'en');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-amber-200 shadow-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.voice.title} 🗣️
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 mt-1.5 font-medium leading-relaxed">
            {t.voice.subtitle}
          </p>
        </div>

        {/* Mascot Tag */}
        <div className="flex items-center gap-2.5 bg-indigo-100 text-indigo-950 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base">
          <span className="text-2xl">🤖</span>
          <span>{t.voice.assistantTag}</span>
        </div>
      </div>

      {/* Shape Selector Chips */}
      <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-none">
        {SHAPES_DATA.map((shape, idx) => (
          <button
            key={shape.id}
            onClick={() => {
              soundEffects.playPop();
              setSelectedShapeIndex(idx);
              setFeedback(null);
              setTranscript('');
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              selectedShapeIndex === idx
                ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                : 'bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-200'
            }`}
          >
            <span>{isAr ? shape.tashkeelName : shape.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Voice Challenge Box */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-md flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center p-3 shadow-lg border-2 border-white shrink-0 bg-white/95 backdrop-blur-md"
              style={{
                boxShadow: `0 10px 25px -5px ${currentShape.color}33, 0 8px 10px -6px ${currentShape.color}22`
              }}
            >
              <ShapeIcon
                shapeId={currentShape.id}
                color={currentShape.color}
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            <div>
              <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full">
                {isAr ? 'النُّطْقُ الصَّحِيحُ بِالتَّشْكِيلِ التَّامِّ' : 'Accurate Pronunciation'}
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-1.5 leading-tight">
                {isAr ? currentShape.tashkeelName : currentShape.nameEn}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                {isAr ? currentShape.linguistics.vocalizationNote : currentShape.linguistics.vocalizationNoteEn}
              </p>
            </div>
          </div>

          <button
            onClick={speakCorrectPronunciation}
            className="p-4 sm:p-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 font-black text-base sm:text-lg active:scale-95 shrink-0"
          >
            <Volume2 className="w-6 h-6" />
            <span>{isAr ? 'اِسْتَمِعْ لِلنُّطْقِ الفَصِيحِ 🔊' : 'Listen to Pronunciation 🔊'}</span>
          </button>
        </div>

        {/* Linguistic / Vocabulary Checker Card */}
        <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border-2 border-amber-200 shadow-xs flex flex-col gap-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-indigo-600 shrink-0" />
              <h4 className="font-black text-slate-900 text-base sm:text-lg">
                {t.voice.rulesTitle}
              </h4>
            </div>

            <button
              onClick={speakLinguisticRule}
              className="text-xs sm:text-sm font-black text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isAr ? 'اِسْتَمِعْ لِلشَّرْحِ' : 'Listen to Explanation'}</span>
            </button>
          </div>

          <div className="bg-indigo-50/70 p-4 sm:p-5 rounded-xl border border-indigo-100 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            <p className="font-black text-indigo-950 text-base sm:text-lg mb-1.5">
              📌 {isAr ? currentShape.linguistics.rule : currentShape.linguistics.ruleEn}
            </p>
            <p className="leading-relaxed">
              {isAr ? currentShape.linguistics.explanation : currentShape.linguistics.explanationEn}
            </p>
            <p className="mt-3 text-slate-700 font-medium">
              <span className="font-black text-indigo-900">
                {isAr ? 'جَمْعُ الكَلِمَةِ:' : 'Plural Form:'}
              </span>{' '}
              {isAr ? currentShape.linguistics.pluralForm : currentShape.linguistics.pluralFormEn}
            </p>
          </div>
        </div>

        {/* Microphone Recording Area */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-amber-100/50 to-orange-100/40 rounded-3xl border-2 border-dashed border-amber-300 gap-4">
          <p className="text-base sm:text-lg font-bold text-slate-800 text-center">
            {isAr ? (
              <>
                اضْغَطْ عَلَى زِرِّ المِيكْرُوفُونِ وَانْطِقِ اسْمَ المُجَسَّمِ:{' '}
                <span className="text-amber-800 font-black">"{currentShape.tashkeelName}"</span>
              </>
            ) : (
              <>
                Tap the microphone and say the shape name:{' '}
                <span className="text-amber-800 font-black">"{currentShape.nameEn}"</span>
              </>
            )}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isListening ? handleStop : handleListen}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white ring-8 ring-rose-200 animate-pulse'
                : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white hover:shadow-2xl hover:scale-105'
            }`}
          >
            <Mic className={`w-12 h-12 sm:w-14 sm:h-14 ${isListening ? 'animate-bounce' : ''}`} />
          </motion.button>

          <span className="text-sm font-bold text-slate-600">
            {isListening
              ? isAr ? 'جَارٍ الاِسْتِمَاعُ لِصَوْتِكَ.. تَحَدَّثِ الآنَ!' : 'Listening... Speak now!'
              : isAr ? 'اضْغَطْ لِلتَّحَدُّثِ بِصَوْتٍ وَاضِحٍ' : 'Tap to speak clearly'}
          </span>

          {/* Feedback Display */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-2xl text-center font-black text-base sm:text-lg shadow-md max-w-lg w-full ${
                feedback.isSuccess
                  ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-400'
                  : 'bg-rose-100 text-rose-950 border-2 border-rose-400'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}

          {/* Quick manual / touch fallback confirmation */}
          <div className="pt-2 flex flex-col items-center gap-1">
            <button
              onClick={handleSimulateSpeechSuccess}
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-amber-900 bg-white/80 hover:bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isAr ? 'نَطَقْتُ الكَلِمَةَ وَأُرِيدُ تَأْكِيدَ إِجَابَتِي ✔️' : 'I pronounced the word! Confirm answer ✔️'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
