import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { SHAPES_DATA } from '../data/shapes';
import { ShapeId, StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { useTranslation } from '../utils/i18n';
import { saveProgress, addStarsAndGems } from '../utils/storage';
import { Sparkles, Trophy, Volume2, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { ShapeIcon } from './ShapeIcon';
import { RealWorldVisual } from './RealWorldVisual';

interface SortingItem {
  id: string;
  rawId: string;
  name: string;
  nameEn: string;
  emoji: string;
  targetShapeId: ShapeId;
  targetShapeNameAr: string;
  targetShapeNameEn: string;
  description: string;
  descriptionEn: string;
}

interface SortingGameProps {
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  lang?: Language;
}

export const SortingGame: React.FC<SortingGameProps> = ({
  progress,
  onProgressUpdate,
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  // Pool of all real world items mapped to shapes
  const allItems: SortingItem[] = SHAPES_DATA.flatMap(shape =>
    shape.realWorldItems.map(item => ({
      id: `${shape.id}_${item.id}`,
      rawId: item.id,
      name: item.name,
      nameEn: item.nameEn || item.name,
      emoji: item.emoji,
      targetShapeId: shape.id,
      targetShapeNameAr: shape.tashkeelName,
      targetShapeNameEn: shape.nameEn,
      description: item.description,
      descriptionEn: item.descriptionEn || item.description
    }))
  );

  // Pick a random round of 6 items and 4 target baskets
  const setupRound = () => {
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    const roundItems = shuffled.slice(0, 6);
    // Find unique shape ids needed
    const neededShapes = Array.from(new Set(roundItems.map(i => i.targetShapeId)));
    // Add extra shapes if less than 4
    const remainingShapes = SHAPES_DATA.filter(s => !neededShapes.includes(s.id));
    const finalShapeIds = [...neededShapes, ...remainingShapes.map(s => s.id)].slice(0, 4);
    const roundBaskets = finalShapeIds.map(id => SHAPES_DATA.find(s => s.id === id)!);

    return { roundItems, roundBaskets };
  };

  const [gameState, setGameState] = useState<{
    roundItems: SortingItem[];
    roundBaskets: typeof SHAPES_DATA;
    currentIndex: number;
    score: number;
    feedback: string | null;
    isFinished: boolean;
  }>(() => {
    const { roundItems, roundBaskets } = setupRound();
    return {
      roundItems,
      roundBaskets,
      currentIndex: 0,
      score: 0,
      feedback: null,
      isFinished: false
    };
  });

  const [selectedBasketId, setSelectedBasketId] = useState<ShapeId | null>(null);

  const currentItem = gameState.roundItems[gameState.currentIndex];

  const handleSelectBasket = (basketId: ShapeId) => {
    if (gameState.isFinished || !currentItem) return;

    setSelectedBasketId(basketId);
    const isCorrect = basketId === currentItem.targetShapeId;

    if (isCorrect) {
      soundEffects.playCorrect();
      const itemName = isAr ? currentItem.name : currentItem.nameEn;
      const targetName = isAr ? currentItem.targetShapeNameAr : currentItem.targetShapeNameEn;
      const feedbackMsg = isAr
        ? `رَائِعٌ! ${itemName} يَنْتَمِي إِلَى مُجَسَّمِ ${targetName}.`
        : `Awesome! ${itemName} belongs to ${targetName}.`;
      appSpeech.speak(feedbackMsg, lang);

      const nextScore = gameState.score + 1;
      const isLast = gameState.currentIndex + 1 >= gameState.roundItems.length;

      setGameState(prev => ({
        ...prev,
        score: nextScore,
        feedback: feedbackMsg
      }));

      // Update student progress & stars
      const updated = addStarsAndGems(progress, 2, isLast ? 1 : 0);
      updated.itemsSortedCount = (updated.itemsSortedCount || 0) + 1;
      if (!updated.unlockedBadges.includes('sorter_hero') && updated.itemsSortedCount >= 5) {
        updated.unlockedBadges.push('sorter_hero');
        soundEffects.playFanfare();
      }
      saveProgress(updated);
      onProgressUpdate(updated);

      setTimeout(() => {
        if (isLast) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          soundEffects.playFanfare();
          setGameState(prev => ({
            ...prev,
            isFinished: true,
            feedback: null
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentIndex: prev.currentIndex + 1,
            feedback: null
          }));
          setSelectedBasketId(null);
        }
      }, 1400);
    } else {
      soundEffects.playWrong();
      const itemName = isAr ? currentItem.name : currentItem.nameEn;
      const wrongMsg = isAr
        ? `حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل! ${itemName} لا يَنْتَمِي إِلَى هَذَا المُجَسَّمِ.`
        : `Try again! ${itemName} does not match this 3D shape.`;
      appSpeech.speak(wrongMsg, lang);

      setGameState(prev => ({
        ...prev,
        feedback: wrongMsg
      }));

      setTimeout(() => {
        setGameState(prev => ({ ...prev, feedback: null }));
        setSelectedBasketId(null);
      }, 1500);
    }
  };

  const handleRestart = () => {
    soundEffects.playPop();
    const { roundItems, roundBaskets } = setupRound();
    setGameState({
      roundItems,
      roundBaskets,
      currentIndex: 0,
      score: 0,
      feedback: null,
      isFinished: false
    });
    setSelectedBasketId(null);
  };

  const speakItem = () => {
    if (!currentItem) return;
    soundEffects.playPop();
    const itemName = isAr ? currentItem.name : currentItem.nameEn;
    const promptMsg = isAr ? `أَيْنَ نَضَعُ: ${itemName}؟` : `Where does ${itemName} belong?`;
    appSpeech.speak(promptMsg, lang);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-amber-200 shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.sorting.title} 🎯
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 mt-1.5 font-medium leading-relaxed">
            {t.sorting.subtitle}
          </p>
        </div>

        {/* Score Pill */}
        <div className="flex items-center gap-2.5 bg-amber-100 text-amber-900 px-5 py-2.5 rounded-2xl font-black text-base">
          <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
          <span>{t.sorting.score}: {gameState.score} / {gameState.roundItems.length}</span>
        </div>
      </div>

      {!gameState.isFinished ? (
        <div className="flex flex-col gap-6">
          {/* Active Item Card */}
          {currentItem && (
            <div className="bg-gradient-to-br from-amber-100/80 via-orange-50/60 to-amber-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <motion.div
                  key={currentItem.id}
                  initial={{ scale: 0.8, rotate: -6 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-3xl shadow-lg border-2 border-amber-200 flex items-center justify-center p-2 shrink-0"
                >
                  <RealWorldVisual itemId={currentItem.rawId} width={80} height={80} />
                </motion.div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-200/90 px-3.5 py-1 rounded-full">
                      {isAr
                        ? `عُنْصُرٌ ${gameState.currentIndex + 1} مِنْ ${gameState.roundItems.length}`
                        : `Item ${gameState.currentIndex + 1} of ${gameState.roundItems.length}`}
                    </span>
                    <button
                      onClick={speakItem}
                      className="p-2 rounded-full bg-white hover:bg-amber-200 text-amber-800 shadow-xs transition-all active:scale-95"
                      title={isAr ? 'اِسْتَمِعْ لِلاِسْمِ' : 'Listen'}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1.5 leading-tight">
                    {isAr ? currentItem.name : currentItem.nameEn}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 mt-1 max-w-sm font-medium leading-relaxed">
                    {isAr ? currentItem.description : currentItem.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-left bg-white/90 px-5 py-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 block">{isAr ? 'المَطْلُوبُ' : 'Task'}</span>
                <span className="text-base font-black text-amber-800">
                  {isAr ? 'اضْغَطْ عَلَى سَلَّةِ المُجَسَّمِ المُطَابِقِ! 👇' : 'Tap the matching 3D shape basket! 👇'}
                </span>
              </div>
            </div>
          )}

          {/* Feedback message */}
          <AnimatePresence>
            {gameState.feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 sm:p-5 rounded-2xl text-center font-black text-base sm:text-lg shadow-md ${
                  gameState.feedback.includes('رَائِعٌ') || gameState.feedback.includes('Awesome')
                    ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400'
                    : 'bg-rose-100 text-rose-900 border-2 border-rose-400'
                }`}
              >
                {gameState.feedback}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4 Shape Baskets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gameState.roundBaskets.map(basket => {
              const isSelected = selectedBasketId === basket.id;
              const isCorrectTarget = currentItem && currentItem.targetShapeId === basket.id;

              return (
                <motion.button
                  key={basket.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectBasket(basket.id)}
                  className={`relative p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 text-center transition-all shadow-md ${
                    isSelected && isCorrectTarget
                      ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-200'
                      : isSelected && !isCorrectTarget
                      ? 'bg-rose-100 border-rose-500 ring-4 ring-rose-200'
                      : 'bg-white hover:bg-amber-50/50 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 shadow-sm border border-slate-200/80 bg-white/90 backdrop-blur-sm"
                    style={{
                      boxShadow: `0 8px 20px -4px ${basket.color}28`
                    }}
                  >
                    <ShapeIcon
                      shapeId={basket.id}
                      color={basket.color}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {isAr ? basket.tashkeelName : basket.nameEn}
                    </h4>
                    <span className="text-xs sm:text-sm text-slate-600 font-bold block mt-0.5">
                      {basket.facesCount} {t.explorer.faces} • {basket.verticesCount} {t.explorer.vertices}
                    </span>
                  </div>

                  <div className="w-full pt-2 border-t border-amber-100 text-xs sm:text-sm font-black text-amber-800 flex items-center justify-center gap-1">
                    <span>{t.sorting.placeHere}</span>
                    <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Game Finished / Celebration Screen */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-10 px-6 bg-gradient-to-b from-amber-100/70 to-orange-50 rounded-3xl border-2 border-amber-300 flex flex-col items-center gap-5"
        >
          <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center shadow-lg text-5xl animate-bounce">
            🏆
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
            {t.sorting.victoryTitle}
          </h3>

          <p className="text-slate-700 text-base sm:text-lg max-w-md font-medium leading-relaxed">
            {t.sorting.victoryDesc}
          </p>

          <div className="flex items-center gap-3 bg-white px-7 py-3.5 rounded-2xl shadow-sm border-2 border-amber-200 font-black text-amber-800 text-xl">
            <Trophy className="w-7 h-7 text-amber-500" />
            <span>
              {t.sorting.finalScore}: {gameState.score} / {gameState.roundItems.length} ⭐
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="mt-4 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
            <span>{t.sorting.playAgain}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
