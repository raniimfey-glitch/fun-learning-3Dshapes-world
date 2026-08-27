import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { SHAPES_DATA } from '../data/shapes';
import { ShapeId, StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { useTranslation } from '../utils/i18n';
import { markShapeExplored, addStarsAndGems, saveProgress } from '../utils/storage';
import { ThreeDViewer } from './ThreeDViewer';
import { UnfoldingNet } from './UnfoldingNet';
import { ShapeIcon } from './ShapeIcon';
import { RealWorldVisual } from './RealWorldVisual';
import {
  Volume2,
  Sparkles,
  Layers,
  CircleDot,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Palette
} from 'lucide-react';

interface ShapeExplorerProps {
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  initialShapeId?: ShapeId;
  lang: Language;
}

export const ShapeExplorer: React.FC<ShapeExplorerProps> = ({
  progress,
  onProgressUpdate,
  initialShapeId = 'cube',
  lang
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  const [selectedShapeId, setSelectedShapeId] = useState<ShapeId>(initialShapeId);
  const [activeTab, setActiveTab] = useState<'3d' | 'properties' | 'realworld' | 'net' | 'paint'>('3d');
  const [viewerMode, setViewerMode] = useState<'explore' | 'faces' | 'vertices' | 'edges' | 'paint'>('explore');

  const [countedVertices, setCountedVertices] = useState<number>(0);
  const [countedFaces, setCountedFaces] = useState<number>(0);

  const currentIndex = SHAPES_DATA.findIndex(s => s.id === selectedShapeId);
  const currentShape = SHAPES_DATA[currentIndex !== -1 ? currentIndex : 0];

  const handleSelectShape = (id: ShapeId) => {
    soundEffects.playPop();
    setSelectedShapeId(id);
    setCountedVertices(0);
    setCountedFaces(0);
    setViewerMode('explore');

    const shape = SHAPES_DATA.find(s => s.id === id);
    if (shape) {
      const textToSpeak = isAr ? shape.tashkeelName : shape.nameEn;
      appSpeech.speak(textToSpeak, lang);
    }
  };

  const handleNextShape = () => {
    const nextIdx = (currentIndex + 1) % SHAPES_DATA.length;
    handleSelectShape(SHAPES_DATA[nextIdx].id);
  };

  const handlePrevShape = () => {
    const prevIdx = (currentIndex - 1 + SHAPES_DATA.length) % SHAPES_DATA.length;
    handleSelectShape(SHAPES_DATA[prevIdx].id);
  };

  const speakFullDescription = () => {
    soundEffects.playPop();
    if (isAr) {
      const text = `${currentShape.tashkeelName}. ${currentShape.description}. لَهُ ${currentShape.facesCount} أَوْجُهٍ، وَ${currentShape.verticesCount} رُؤُوسٍ، وَ${currentShape.edgesCount} حَرْفًا.`;
      appSpeech.speak(text, 'ar');
    } else {
      const text = `${currentShape.nameEn}. ${currentShape.descriptionEn}. It has ${currentShape.facesCount} faces, ${currentShape.verticesCount} vertices, and ${currentShape.edgesCount} edges.`;
      appSpeech.speak(text, 'en');
    }
  };

  const handleCompleteExploration = () => {
    soundEffects.playCorrect();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    soundEffects.playFanfare();

    const { updated } = markShapeExplored(progress, currentShape.id, 25);
    const withStars = addStarsAndGems(updated, 5, 1);
    saveProgress(withStars);
    onProgressUpdate(withStars);

    const congrats = isAr
      ? `أَحْسَنْتَ يَا بَطَل! تَعَرَّفْتَ عَلَى مُجَسَّمِ ${currentShape.tashkeelName} وَحَصَلْتَ عَلَى 5 نُجُومٍ ذَهَبِيَّةٍ!`
      : `Outstanding work! You mastered the ${currentShape.nameEn} and earned 5 gold stars!`;
    appSpeech.speak(congrats, lang);
  };

  const mainTabs = [
    { id: '3d', label: isAr ? 'عَرْضٌ ثُلاثِيُّ الأَبْعَادِ 3D 🎲' : 'Interactive 3D View 🎲', icon: Maximize2 },
    { id: 'properties', label: isAr ? 'الخَصَائِصُ وَالحَرَكَةُ 📐' : 'Properties & Motion 📐', icon: Layers },
    { id: 'realworld', label: isAr ? 'أَمْثِلَةٌ مِنَ الوَاقِعِ 🌍' : 'Everyday Objects 🌍', icon: Sparkles },
    { id: 'net', label: isAr ? 'شَبَكَةُ النَّشْرِ 📦' : 'Geometry Net 📦', icon: BookOpen },
    { id: 'paint', label: isAr ? 'مُخْتَبَرُ التَّلْوِينِ 🎨' : 'Coloring Studio 🎨', icon: Palette }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-amber-200 shadow-xl">
      {/* Shapes Navigation Carousel */}
      <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SHAPES_DATA.map(shape => {
          const isSelected = shape.id === selectedShapeId;
          const isCompleted = progress.completedShapes[shape.id];

          return (
            <button
              key={shape.id}
              onClick={() => handleSelectShape(shape.id)}
              className={`px-3.5 sm:px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-base whitespace-nowrap transition-all flex items-center gap-2.5 shrink-0 border-2 ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-105 ring-2 ring-amber-300'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200'
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-slate-100/90 flex items-center justify-center p-0.5 shrink-0 border border-slate-200/80 shadow-xs">
                <ShapeIcon
                  shapeId={shape.id}
                  color={shape.color}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>{isAr ? shape.tashkeelName : shape.nameEn}</span>
              {isCompleted && <span className="text-emerald-500">⭐</span>}
            </button>
          );
        })}
      </div>

      {/* Main Shape Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-100/80 via-orange-100/50 to-amber-50 p-5 sm:p-6 rounded-3xl border border-amber-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center p-3 shadow-lg border-2 border-white/90 shrink-0 bg-white/95 backdrop-blur-md transition-transform hover:scale-105"
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
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-black text-slate-900 text-2xl sm:text-3xl leading-tight">
                {isAr ? currentShape.tashkeelName : currentShape.nameEn}
              </h2>
              <span className="text-xs font-black bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full">
                {isAr ? currentShape.englishName : currentShape.tashkeelName}
              </span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base font-semibold mt-1.5 max-w-2xl leading-relaxed">
              {isAr ? currentShape.description : currentShape.descriptionEn}
            </p>
          </div>
        </div>

        {/* Audio Speaker & Mastery Pill */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
          <button
            onClick={speakFullDescription}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isAr ? 'اِسْتَمِعْ لِلشَّرْحِ 🔊' : 'Audio Guide 🔊'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isAr ? `الإِتْقَانُ: ${progress.shapeMastery[currentShape.id] || 0}%` : `Mastery: ${progress.shapeMastery[currentShape.id] || 0}%`}</span>
          </div>
        </div>
      </div>

      {/* Exploratory Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b-2 border-amber-100">
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEffects.playPop();
                setActiveTab(tab.id as unknown as typeof activeTab);
              }}
              className={`px-4 py-3 rounded-2xl font-bold text-xs sm:text-base whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border-b-4 ${
                isActive
                  ? 'border-amber-500 text-amber-900 bg-amber-50/80 font-black'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-amber-50/40'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: 3D Interactive Viewer with Counting Modes */}
      {activeTab === '3d' && (
        <div className="flex flex-col gap-4">
          {/* Submode Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-slate-700">
              {isAr ? 'طَرِيقَةُ المُعَايَنَةِ:' : 'Interactive Mode:'}
            </span>
            {[
              { mode: 'explore', label: isAr ? 'تَدْوِيرٌ حُرٌّ 🔄' : 'Free Orbit 🔄' },
              { mode: 'faces', label: isAr ? 'عَدُّ الأَوْجُهِ 🔲' : 'Count Faces 🔲' },
              { mode: 'vertices', label: isAr ? 'عَدُّ الرُّؤُوسِ (الزَّوَايَا) 🟡' : 'Count Vertices 🟡' },
              { mode: 'edges', label: isAr ? 'عَدُّ الأَحْرُفِ (الخُطُوطِ) 📏' : 'Count Edges 📏' }
            ].map(item => (
              <button
                key={item.mode}
                onClick={() => {
                  soundEffects.playPop();
                  setViewerMode(item.mode as unknown as typeof viewerMode);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                  viewerMode === item.mode
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border border-amber-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 3D Canvas Box */}
          <ThreeDViewer
            shapeId={currentShape.id}
            color={currentShape.color}
            activeMode={viewerMode}
            onCountVertex={c => setCountedVertices(c)}
            onCountFace={c => setCountedFaces(c)}
            lang={lang}
          />

          {/* Quick Metrics Summary Cards under 3D */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-blue-50/90 border-2 border-blue-200 p-3.5 sm:p-5 rounded-2xl text-center">
              <span className="text-xs sm:text-base font-black text-blue-800 block">{t.explorer.faces}</span>
              <span className="text-2xl sm:text-4xl font-black text-blue-900 my-1 block">{currentShape.facesCount}</span>
              <span className="text-xs sm:text-sm font-bold text-blue-700 block">{isAr ? 'أَوْجُهٌ مُسْتَوِيَةٌ' : 'Flat Faces'}</span>
            </div>

            <div className="bg-amber-50/90 border-2 border-amber-200 p-3.5 sm:p-5 rounded-2xl text-center">
              <span className="text-xs sm:text-base font-black text-amber-800 block">{t.explorer.vertices}</span>
              <span className="text-2xl sm:text-4xl font-black text-amber-900 my-1 block">{currentShape.verticesCount}</span>
              <span className="text-xs sm:text-sm font-bold text-amber-700 block">{isAr ? 'رُؤُوسٌ مُدَبَّبَةٌ' : 'Pointed Vertices'}</span>
            </div>

            <div className="bg-emerald-50/90 border-2 border-emerald-200 p-3.5 sm:p-5 rounded-2xl text-center">
              <span className="text-xs sm:text-base font-black text-emerald-800 block">{t.explorer.edges}</span>
              <span className="text-2xl sm:text-4xl font-black text-emerald-900 my-1 block">{currentShape.edgesCount}</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700 block">{isAr ? 'حَوَافٌّ مُسْتَقِيمَةٌ' : 'Straight Edges'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Properties & Dynamics */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-black text-slate-900 text-base sm:text-xl flex items-center gap-2">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <span>{isAr ? 'الخَصَائِصُ الهَنْدَسِيَّةُ التَّفْصِيلِيَّةُ' : 'Detailed Geometric Properties'}</span>
            </h3>

            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <div className="flex items-center justify-between p-3.5 sm:p-4 bg-amber-50/80 rounded-2xl border border-amber-100">
                <span className="font-bold text-slate-800">{isAr ? 'عَدَدُ وَنَوْعُ الأَوْجُهِ:' : 'Faces Count & Type:'}</span>
                <span className="font-black text-amber-950 text-base sm:text-lg">
                  {currentShape.facesCount} ({isAr ? currentShape.facesType : currentShape.facesTypeEn})
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 sm:p-4 bg-amber-50/80 rounded-2xl border border-amber-100">
                <span className="font-bold text-slate-800">{isAr ? 'عَدَدُ وَنَوْعُ الأَحْرُفِ:' : 'Edges Count & Type:'}</span>
                <span className="font-black text-amber-950 text-base sm:text-lg">
                  {currentShape.edgesCount} ({isAr ? currentShape.edgesType : currentShape.edgesTypeEn})
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 sm:p-4 bg-amber-50/80 rounded-2xl border border-amber-100">
                <span className="font-bold text-slate-800">{isAr ? 'عَدَدُ الرُّؤُوسِ (الزَّوَايَا):' : 'Vertices (Corners):'}</span>
                <span className="font-black text-amber-950 text-base sm:text-lg">
                  {currentShape.verticesCount} {isAr ? 'رُؤُوسٍ' : 'Vertices'}
                </span>
              </div>
            </div>

            {/* Linguistics & Etymology Section */}
            <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-col gap-2 mt-2">
              <span className="font-black text-amber-900 text-sm sm:text-base flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>{t.explorer.linguisticsTitle}</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                📌 <strong className="text-slate-900">{t.explorer.ruleLabel}:</strong> {isAr ? currentShape.linguistics.rule : currentShape.linguistics.ruleEn}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                📖 <strong className="text-slate-900">{t.explorer.explanationLabel}:</strong> {isAr ? currentShape.linguistics.explanation : currentShape.linguistics.explanationEn}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                🗣️ <strong className="text-slate-900">{t.explorer.vocalizationLabel}:</strong> {isAr ? currentShape.linguistics.vocalizationNote : currentShape.linguistics.vocalizationNoteEn}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                ✨ <strong className="text-slate-900">{t.explorer.pluralLabel}:</strong> {isAr ? currentShape.linguistics.pluralForm : currentShape.linguistics.pluralFormEn}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col gap-4">
            <h3 className="font-black text-slate-900 text-base sm:text-xl flex items-center gap-2">
              <CircleDot className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              <span>{t.explorer.geometricProperties}</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className={`p-4 rounded-2xl text-center border-2 ${currentShape.rollable ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="text-3xl block mb-1">{currentShape.rollable ? '⚽' : '🚫'}</span>
                <span className="font-black text-xs sm:text-base">{isAr ? 'التَّدَحْرُجُ' : 'Rolling'}</span>
                <span className="text-xs font-bold block mt-1">{currentShape.rollable ? (isAr ? 'يَتَدَحْرَجُ بِسُهُولَةٍ' : 'Rolls easily') : (isAr ? 'لا يَتَدَحْرَجُ' : 'Cannot roll')}</span>
              </div>

              <div className={`p-4 rounded-2xl text-center border-2 ${currentShape.slideable ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="text-3xl block mb-1">{currentShape.slideable ? '🛹' : '🚫'}</span>
                <span className="font-black text-xs sm:text-base">{isAr ? 'الاِنْزِلاقُ' : 'Sliding'}</span>
                <span className="text-xs font-bold block mt-1">{currentShape.slideable ? (isAr ? 'يَنْزَلِقُ عَلَى سَطْحِهِ' : 'Slides smoothly') : (isAr ? 'لا يَنْزَلِقُ' : 'Cannot slide')}</span>
              </div>

              <div className={`p-4 rounded-2xl text-center border-2 ${currentShape.stackable ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <span className="text-3xl block mb-1">{currentShape.stackable ? '🧱' : '🚫'}</span>
                <span className="font-black text-xs sm:text-base">{isAr ? 'الرَّصُّ' : 'Stacking'}</span>
                <span className="text-xs font-bold block mt-1">{currentShape.stackable ? (isAr ? 'يُرَصُّ فَوْقَ بَعْضِهِ' : 'Can be stacked') : (isAr ? 'لا يُرَصُّ' : 'Cannot stack')}</span>
              </div>
            </div>

            <div className="p-4 bg-indigo-50/80 border border-indigo-100 rounded-2xl text-xs sm:text-base font-medium text-indigo-950 leading-relaxed">
              💡 <span className="font-black text-indigo-900">{t.explorer.funFactTitle}:</span> {isAr ? currentShape.funFact : currentShape.funFactEn}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Real World Examples */}
      {activeTab === 'realworld' && (
        <div className="flex flex-col gap-5">
          <div className="text-xs sm:text-base text-slate-700 font-bold bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <span>
              {isAr ? (
                <>أَمْثِلَةٌ دَقِيقَةٌ وَمُطَابِقَةٌ تَمَامًا لِمُجَسَّمِ <span className="font-black text-amber-950">{currentShape.tashkeelName}</span> مِنْ حَيَاتِنَا اليَوْمِيَّةِ:</>
              ) : (
                <>Accurate, geometrically matched examples of <span className="font-black text-amber-950">{currentShape.nameEn}</span> from the real world:</>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentShape.realWorldItems.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-md flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-4 transition-all"
              >
                <div className="shrink-0 flex items-center justify-center p-2 bg-gradient-to-b from-slate-50 to-amber-50/50 rounded-2xl border border-amber-100 shadow-inner">
                  <RealWorldVisual itemId={item.id} />
                </div>

                <div className="flex flex-col flex-1 h-full justify-between gap-2.5">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
                      <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full">
                        {isAr ? item.category : item.categoryEn}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {isAr ? item.name : item.nameEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium leading-relaxed">
                      {isAr ? item.description : item.descriptionEn}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      const text = isAr ? `${item.name}. ${item.description}` : `${item.nameEn}. ${item.descriptionEn}`;
                      appSpeech.speak(text, lang);
                    }}
                    className="mt-2 self-center sm:self-start px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs sm:text-sm font-black flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span>{isAr ? 'اِسْتَمِعْ لِلشَّرْحِ 🔊' : 'Listen to Description 🔊'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Unfolding Net */}
      {activeTab === 'net' && (
        <UnfoldingNet shapeId={currentShape.id} color={currentShape.color} lang={lang} />
      )}

      {/* Tab 5: Creative Painting */}
      {activeTab === 'paint' && (
        <div className="flex flex-col gap-4">
          <div className="text-xs sm:text-base text-slate-700 font-bold bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            🎨 <span className="font-black text-amber-900">{isAr ? 'مُخْتَبَرُ التَّلْوِينِ:' : 'Coloring Studio:'}</span>{' '}
            {isAr
              ? 'اخْتَرْ أَلْوَانَكَ المُفَضَّلَةَ وَالْمَسْ أَوْجُهَ المُجَسَّمِ فِي وَضْعِ 3D لِتَلْوِينِهَا وَتَخْصِيصِهَا!'
              : 'Pick your favorite colors and touch the 3D faces to paint and customize your shape!'}
          </div>

          <ThreeDViewer
            shapeId={currentShape.id}
            color={currentShape.color}
            activeMode="paint"
            lang={lang}
          />
        </div>
      )}

      {/* Bottom Completion & Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-amber-100">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={handlePrevShape}
            className="px-4 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-200 shadow-xs font-bold text-xs sm:text-base flex items-center gap-2 transition-all active:scale-95"
          >
            {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            <span>{isAr ? 'المُجَسَّمُ السَّابِقُ' : 'Previous Shape'}</span>
          </button>

          <button
            onClick={handleNextShape}
            className="px-4 py-2.5 sm:py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-200 shadow-xs font-bold text-xs sm:text-base flex items-center gap-2 transition-all active:scale-95"
          >
            <span>{isAr ? 'المُجَسَّمُ التَّالِي' : 'Next Shape'}</span>
            {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        <button
          onClick={handleCompleteExploration}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95"
        >
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          <span>{isAr ? 'أَتْقَنْتُ هَذَا المُجَسَّمَ! احْصُلْ عَلَى المُكَافَأَةِ ⭐' : 'I Mastered This Shape! Claim Reward ⭐'}</span>
        </button>
      </div>
    </div>
  );
};
