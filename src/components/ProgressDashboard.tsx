import React from 'react';
import { SHAPES_DATA } from '../data/shapes';
import { StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { saveProgress, DEFAULT_PROGRESS } from '../utils/storage';
import { useTranslation } from '../utils/i18n';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Mic,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  lang?: Language;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onProgressUpdate,
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  // Calculate overall mastery percentage
  const totalShapes = SHAPES_DATA.length;
  const exploredCount = Object.values(progress.completedShapes).filter(Boolean).length;
  const overallMastery = Math.round((exploredCount / totalShapes) * 100);

  const handleResetProgress = () => {
    const confirmMsg = isAr
      ? 'هَلْ أَنْتَ مُتَأَكِّدٌ مِنْ رَغْبَتِكَ فِي إِعَادَةِ ضَبْطِ تَقَدُّمِ الطَّالِبِ وَبَدْءِ رِحْلَةٍ جَدِيدَةٍ؟'
      : 'Are you sure you want to reset student progress and start fresh?';
    if (window.confirm(confirmMsg)) {
      soundEffects.playPop();
      saveProgress(DEFAULT_PROGRESS);
      onProgressUpdate(DEFAULT_PROGRESS);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-6 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-amber-200 shadow-xl">
      {/* Dashboard Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.dashboard.title} 📊
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 mt-1.5 font-medium leading-relaxed">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Student Profile Pill */}
        <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 px-5 py-2.5 rounded-2xl">
          <span className="text-3xl">{progress.avatar}</span>
          <div>
            <span className="text-base font-black text-slate-900 block">{progress.studentName}</span>
            <span className="text-xs sm:text-sm text-amber-800 font-bold">
              {isAr ? 'المَرْحَلَةُ الاِبْتِدَائِيَّةُ' : 'Elementary Grade'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Key KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mastery Percentage */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-indigo-900">{t.dashboard.overallMastery}</span>
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="my-3">
            <span className="text-4xl sm:text-5xl font-black text-indigo-950">{overallMastery}%</span>
            <div className="w-full bg-indigo-200/60 h-2.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-indigo-700 font-bold">
            {isAr
              ? `${exploredCount} مِنْ ${totalShapes} مُجَسَّمَاتٍ مُكْتَمِلَةٍ`
              : `${exploredCount} of ${totalShapes} 3D shapes mastered`}
          </span>
        </div>

        {/* Stars and Gems */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-amber-900">{t.dashboard.starsGems}</span>
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div className="my-3">
            <span className="text-4xl sm:text-5xl font-black text-amber-950">{progress.stars} ⭐</span>
            <span className="text-sm font-bold text-amber-800 block mt-1.5">
              {isAr ? `وَ ${progress.gems} 💎 جَوْهَرَةَ تَفَوُّقٍ` : `& ${progress.gems} 💎 Mastery Gems`}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-amber-700 font-bold">
            {isAr
              ? `${progress.unlockedBadges.length} أَوْسِمَةٍ مُكْتَسَبَةٍ`
              : `${progress.unlockedBadges.length} Badges Earned`}
          </span>
        </div>

        {/* Voice Practice */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50/50 p-5 sm:p-6 rounded-3xl border-2 border-pink-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-pink-900">{t.dashboard.voicePractice}</span>
            <Mic className="w-6 h-6 text-pink-600" />
          </div>
          <div className="my-3">
            <span className="text-4xl sm:text-5xl font-black text-pink-950">{progress.voiceRecognizedCount}</span>
            <span className="text-sm font-bold text-pink-800 block mt-1.5">
              {isAr ? 'تَحَدِّيَاتٍ صَوْتِيَّةٍ مُكْتَمِلَةٍ' : 'Voice Challenges Completed'}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-pink-700 font-bold">
            {isAr ? 'نُطْقٌ سَلِيمٌ مَعَ التَّشْكِيلِ التَّامِّ' : 'Accurate and Clear Vocalization'}
          </span>
        </div>

        {/* Sorted Items */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 sm:p-6 rounded-3xl border-2 border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-emerald-900">{t.dashboard.sortedItems}</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="my-3">
            <span className="text-4xl sm:text-5xl font-black text-emerald-950">{progress.itemsSortedCount}</span>
            <span className="text-sm font-bold text-emerald-800 block mt-1.5">
              {isAr ? 'عَنَاصِرَ وَاقِعِيَّةٍ مُصَنَّفَةٍ' : 'Real-World Objects Categorized'}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-emerald-700 font-bold">
            {isAr ? 'رَبْطُ المَفَاهِيمِ بِالبِيئَةِ المُحِيطَةِ' : 'Connecting Concepts to Surroundings'}
          </span>
        </div>
      </div>

      {/* Shapes Proficiency Detail Table */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col gap-4">
        <h3 className="font-black text-slate-900 text-lg sm:text-xl flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <span>{t.dashboard.shapesDetails}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SHAPES_DATA.map(shape => {
            const isCompleted = progress.completedShapes[shape.id];
            const mastery = isCompleted ? 100 : progress.shapeMastery[shape.id] || 0;

            return (
              <div
                key={shape.id}
                className={`p-4 rounded-2xl border-2 flex flex-col gap-2.5 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-400'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: shape.color }}
                    />
                    <span className="font-black text-base text-slate-900">
                      {isAr ? shape.tashkeelName : shape.nameEn}
                    </span>
                  </div>
                  {isCompleted ? (
                    <span className="text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {t.dashboard.mastered} ✔️
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-600 font-bold">{mastery}%</span>
                  )}
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                    style={{ width: `${mastery}%` }}
                  />
                </div>

                <span className="text-xs sm:text-sm text-slate-600 font-bold">
                  {shape.facesCount} {t.explorer.faces} • {shape.verticesCount} {t.explorer.vertices} • {shape.edgesCount} {t.explorer.edges}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Insights & Teacher Note */}
      <div className="bg-amber-50/90 rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col gap-3.5">
        <h4 className="font-black text-amber-950 text-base sm:text-lg flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-amber-600" />
          <span>{t.dashboard.pedagogicalNotes}</span>
        </h4>

        <ul className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-2.5 list-disc list-inside font-medium">
          <li>
            <span className="font-black text-amber-950">
              {isAr ? 'التَّدْرِيبُ العَمَلِيُّ بِاللَّمْسِ:' : 'Hands-on Interactive Touch:'}
            </span>{' '}
            {isAr
              ? 'شَجِّعِ الطِّفْلَ عَلَى اسْتِخْدَامِ وَضْعِ "عَدُّ الرُّؤُوسِ وَالأَوْجُهِ 3D" لِيَقُومَ بِالعَدِّ بِنَفْسِهِ إِصْبَعًا بِإِصْبَعٍ.'
              : 'Encourage learners to use interactive 3D face and vertex counting with tactile feedback.'}
          </li>
          <li>
            <span className="font-black text-amber-950">
              {isAr ? 'التَّدْقِيقُ اللُّغَوِيُّ:' : 'Linguistic Precision:'}
            </span>{' '}
            {isAr
              ? 'تَأَكَّدْ مِنْ سَمَاعِ الطَّالِبِ لِلشُّرُوحَاتِ الصَّوْتِيَّةِ لِلتَّمْيِيزِ بَيْنَ "وَجْهٍ مُسْتَوٍ" وَ"سَطْحٍ مُنْحَنٍ"، وَقَوَاعِدِ العَدَدِ وَالمَعْدُودِ.'
              : 'Listen to spoken explanations to distinguish between flat bases and curved surfaces.'}
          </li>
          <li>
            <span className="font-black text-amber-950">
              {isAr ? 'الرَّبْطُ بِالوَاقِعِ:' : 'Real-World Connection:'}
            </span>{' '}
            {isAr
              ? 'اطْلُبْ مِنَ الطَّالِبِ إِحْضَارَ عُلْبَةِ مَنَادِيلَ أَوْ حَجَرِ نَرْدٍ مِنَ المَنْزِلِ لِمُطَابَقَتِهِ مَعَ المُجَسَّمِ ثُلاثِيِّ الأَبْعَادِ فِي التَّطْبِيقِ.'
              : 'Encourage matching real items at home (tissue boxes, dice, cans) to the 3D models.'}
          </li>
        </ul>
      </div>

      {/* Reset Button */}
      <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
        <button
          onClick={handleResetProgress}
          className="text-sm font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-5 py-2.5 rounded-2xl border border-rose-200 transition-all flex items-center gap-2 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.dashboard.resetButton}</span>
        </button>

        <span className="text-xs sm:text-sm text-slate-600 font-bold">
          ⚡ {isAr ? 'البَيَانَاتُ مَحْفُوظَةٌ مَحَلِّيًّا وَتَعْمَلُ بِدُونِ إِنْتَرْنِت 100%' : '100% Offline Local Persistence'}
        </span>
      </div>
    </div>
  );
};
