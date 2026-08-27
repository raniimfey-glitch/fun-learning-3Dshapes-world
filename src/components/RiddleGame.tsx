import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { SHAPES_DATA } from '../data/shapes';
import { StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { useTranslation } from '../utils/i18n';
import { saveProgress, addStarsAndGems } from '../utils/storage';
import { ThreeDViewer } from './ThreeDViewer';
import { Sparkles, HelpCircle, Volume2, Lightbulb, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface RiddleGameProps {
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  lang?: Language;
}

export const RiddleGame: React.FC<RiddleGameProps> = ({
  progress,
  onProgressUpdate,
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  // Pool of riddles from all shapes
  const allRiddles = SHAPES_DATA.flatMap(s =>
    s.riddles.map(r => ({
      shapeId: s.id,
      shapeName: isAr ? s.tashkeelName : s.nameEn,
      question: isAr ? r.question : (r.questionEn || r.question),
      hint: isAr ? r.hint : (r.hintEn || r.hint),
      options: isAr ? r.options : (r.optionsEn || r.options),
      correctAnswer: isAr ? r.correctAnswer : (r.correctAnswerEn || r.correctAnswer),
      funFact: isAr ? s.funFact : (s.funFactEn || s.funFact)
    }))
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [show3DClue, setShow3DClue] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const currentRiddle = allRiddles[currentIndex % allRiddles.length];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.trim() === currentRiddle.correctAnswer.trim();

    if (isCorrect) {
      soundEffects.playCorrect();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);

      const msg = isAr
        ? `إِجَابَةٌ مُمْتَازَةٌ وَصَحِيحَةٌ! إِنَّهُ ${currentRiddle.correctAnswer}.`
        : `Excellent and correct! It is ${currentRiddle.correctAnswer}.`;
      appSpeech.speak(msg, lang);

      // Update student stars
      const updated = addStarsAndGems(progress, 3, nextStreak % 3 === 0 ? 1 : 0);
      if (!updated.unlockedBadges.includes('riddle_detective') && nextScore >= 3) {
        updated.unlockedBadges.push('riddle_detective');
        soundEffects.playFanfare();
      }
      saveProgress(updated);
      onProgressUpdate(updated);
    } else {
      soundEffects.playWrong();
      setStreak(0);
      const msg = isAr
        ? `لِلأَسَفِ، الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${currentRiddle.correctAnswer}. تَذَكَّرْ دَائِمًا خَصَائِصَ المُجَسَّمِ!`
        : `Oops! The correct answer is: ${currentRiddle.correctAnswer}. Remember the shape properties!`;
      appSpeech.speak(msg, lang);
    }
  };

  const handleNext = () => {
    soundEffects.playPop();
    setIsAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
    setShow3DClue(false);
    setCurrentIndex(prev => prev + 1);
  };

  const speakQuestion = () => {
    soundEffects.playPop();
    appSpeech.speak(currentRiddle.question, lang);
  };

  const handleRestart = () => {
    soundEffects.playPop();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowHint(false);
    setShow3DClue(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-amber-200 shadow-xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.riddles.title} 🔍
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 mt-1.5 font-medium leading-relaxed">
            {t.riddles.subtitle}
          </p>
        </div>

        {/* Streaks & Score */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1.5 bg-orange-100 text-orange-800 px-4 py-2 rounded-2xl font-black text-sm animate-pulse border border-orange-300">
              <span>{isAr ? `🔥 حَمَاسٌ مُتَتَالٍ: ${streak}` : `🔥 Streak: ${streak}`}</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 bg-amber-100 text-amber-900 px-5 py-2.5 rounded-2xl font-black text-base">
            <Award className="w-6 h-6 text-amber-500" />
            <span>{t.riddles.score}: {score}</span>
          </div>
        </div>
      </div>

      {/* Riddle Card */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-md flex flex-col gap-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center font-black text-xl shadow-sm shrink-0">
              #{currentIndex + 1}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-amber-800 block">
                {isAr ? 'فُزُورَةٌ هَنْدَسِيَّةٌ ذَكِيَّةٌ' : 'Geometry Mystery Riddle'}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-1 leading-relaxed">
                {currentRiddle.question}
              </h3>
            </div>
          </div>

          <button
            onClick={speakQuestion}
            className="p-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 shadow-xs transition-all active:scale-95 flex items-center gap-2 text-sm font-black shrink-0"
            title={isAr ? 'اِسْتَمِعْ لِلْفُزُورَةِ' : 'Listen to Riddle'}
          >
            <Volume2 className="w-6 h-6 text-amber-800" />
            <span className="hidden sm:inline">{isAr ? 'اِسْتَمِعْ' : 'Listen'}</span>
          </button>
        </div>

        {/* Hints and 3D Clue toggles */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setShowHint(!showHint);
              soundEffects.playPop();
              if (!showHint) appSpeech.speak(isAr ? `تَلْمِيحٌ: ${currentRiddle.hint}` : `Hint: ${currentRiddle.hint}`, lang);
            }}
            className="px-5 py-2.5 rounded-2xl bg-amber-100/90 hover:bg-amber-200 text-amber-900 font-black text-sm flex items-center gap-2 transition-all active:scale-95"
          >
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>{showHint ? (isAr ? 'إِخْفَاءُ التَّلْمِيحِ' : 'Hide Hint') : (isAr ? 'مُسَاعَدَةٌ وَتَلْمِيحٌ 💡' : 'Need a Clue? 💡')}</span>
          </button>

          <button
            onClick={() => {
              setShow3DClue(!show3DClue);
              soundEffects.playPop();
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-100/90 hover:bg-indigo-200 text-indigo-900 font-black text-sm flex items-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>{show3DClue ? (isAr ? 'إِخْفَاءُ المُعَايَنَةِ 3D' : 'Hide 3D Clue') : (isAr ? 'مُعَايَنَةٌ ثُلاثِيَّةُ الأَبْعَادِ 3D' : '3D Clue Preview 3D')}</span>
          </button>
        </div>

        {/* Hint Box */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 rounded-2xl bg-amber-100/70 border-2 border-amber-300 text-amber-950 text-sm sm:text-base font-bold flex items-center gap-3"
            >
              <Lightbulb className="w-6 h-6 text-amber-600 shrink-0" />
              <span>{currentRiddle.hint}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Clue Preview */}
        {show3DClue && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-64 rounded-2xl overflow-hidden shadow-inner border-2 border-amber-200"
          >
            <ThreeDViewer shapeId={currentRiddle.shapeId} heightClass="h-64" lang={lang} />
          </motion.div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {currentRiddle.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option.trim() === currentRiddle.correctAnswer.trim();

            let btnStyle = 'bg-white hover:bg-amber-50 text-slate-900 border-amber-200';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-100 text-emerald-950 border-emerald-500 ring-4 ring-emerald-200';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-100 text-rose-950 border-rose-500 ring-4 ring-rose-200';
              } else {
                btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                className={`p-5 rounded-2xl border-2 font-black text-lg sm:text-xl shadow-sm transition-all flex items-center justify-between gap-3 ${isAr ? 'text-right' : 'text-left'} ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-rose-600 shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        {/* Next & Fun Fact area after answer */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-5 border-t-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              <span className="font-black text-amber-800">{isAr ? '💡 هَلْ تَعْلَمُ؟ ' : '💡 Did You Know? '}</span>
              {currentRiddle.funFact}
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
            >
              <span>{t.riddles.nextRiddle} 🚀</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Restart Button */}
      <div className="flex justify-center">
        <button
          onClick={handleRestart}
          className="text-sm font-bold text-slate-500 hover:text-slate-700 flex items-center gap-2 p-2.5 rounded-xl transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{isAr ? 'إِعَادَةُ تَعْيِينِ النِّقَاطِ وَالبَدْءُ مِنْ جَدِيدٍ' : 'Reset Score & Restart Riddles'}</span>
        </button>
      </div>
    </div>
  );
};
