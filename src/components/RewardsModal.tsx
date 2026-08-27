import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BADGES } from '../data/shapes';
import { StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { saveProgress } from '../utils/storage';
import { useTranslation } from '../utils/i18n';
import {
  Trophy,
  Award,
  Star,
  Printer,
  Sparkles,
  Lock,
  CheckCircle2,
  X,
  Smile,
  GraduationCap
} from 'lucide-react';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  lang?: Language;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdate,
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'badges' | 'certificate' | 'profile'>('badges');
  const [studentNameInput, setStudentNameInput] = useState<string>(progress.studentName);

  if (!isOpen) return null;

  const avatars = ['🦁', '🚀', '🌟', '🦄', '🐯', '🤖', '👑', '🧙‍♂️', '🦉', '🐬'];

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playPop();
    const fallbackName = isAr ? 'بَطَلُ الهَنْدَسَةِ الصَّغِيرُ' : 'Young Geometry Champion';
    const updated = { ...progress, studentName: studentNameInput.trim() || fallbackName };
    saveProgress(updated);
    onProgressUpdate(updated);
    const msg = isAr
      ? `مَرْحَبًا بِكَ يَا ${updated.studentName}! تَمَّ حِفْظُ اسْمِكَ فِي الشَّهَادَةِ.`
      : `Welcome ${updated.studentName}! Your name has been saved on the certificate.`;
    appSpeech.speak(msg, lang);
  };

  const handleSelectAvatar = (av: string) => {
    soundEffects.playPop();
    const updated = { ...progress, avatar: av };
    saveProgress(updated);
    onProgressUpdate(updated);
  };

  const handlePrintCertificate = () => {
    soundEffects.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {t.rewards.title}
              </h2>
              <span className="text-sm text-amber-100 font-bold">
                {isAr
                  ? `رَصِيدُكَ: ${progress.stars} ⭐ نَجْمَةً • ${progress.gems} 💎 جَوْهَرَةً`
                  : `Balance: ${progress.stars} ⭐ Stars • ${progress.gems} 💎 Gems`}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2.5 p-4 bg-amber-50/70 border-b-2 border-amber-200 shrink-0 overflow-x-auto">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('badges');
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>{t.rewards.badgesTab} ({progress.unlockedBadges.length}/{BADGES.length})</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('certificate');
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>{t.rewards.certificateTab} 📜</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('profile');
            }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
            }`}
          >
            <Smile className="w-5 h-5" />
            <span>{t.rewards.profileTab}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: BADGES */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES.map(badge => {
                const isUnlocked = progress.unlockedBadges.includes(badge.id);

                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-4 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-300 shadow-sm'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 border ${
                        isUnlocked
                          ? 'bg-amber-400/20 border-amber-300'
                          : 'bg-slate-200 border-slate-300'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-black text-slate-900 text-base sm:text-lg">
                          {isAr ? badge.title : badge.titleEn}
                        </h4>
                        {isUnlocked ? (
                          <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'مُكْتَسَبٌ' : 'Earned'}</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{isAr ? 'مُقْفَلٌ' : 'Locked'}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                        {isAr ? badge.description : badge.descriptionEn}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="flex flex-col items-center gap-6">
              {/* Printable Certificate Frame */}
              <div
                id="printable-certificate"
                className="w-full bg-gradient-to-b from-amber-50/80 via-white to-amber-50/80 p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-lg text-center flex flex-col items-center gap-4 relative overflow-hidden"
              >
                {/* Certificate Watermark Header */}
                <div className="flex items-center justify-between w-full border-b-2 border-amber-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    <span className="text-sm sm:text-base font-black text-amber-900">
                      {isAr ? 'أَكاديمِيَّةُ عَالَمِ المُجَسَّمَاتِ 3D' : '3D Geometry Academy'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-500">
                    {new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                  </span>
                </div>

                <div className="my-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-100 px-4 py-1 rounded-full uppercase tracking-wider">
                    {t.rewards.certOfExcellence}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
                    {t.rewards.certTitle}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-700 max-w-lg font-medium">
                  {t.rewards.certAwardedTo}
                </p>

                {/* Student Name */}
                <div className="bg-amber-100/60 border-b-4 border-amber-400 px-8 py-2.5 rounded-2xl my-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-950">
                    {progress.studentName} {progress.avatar}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium leading-relaxed">
                  {t.rewards.certBody}
                </p>

                {/* Signatures & Seal */}
                <div className="w-full flex items-center justify-between pt-4 border-t border-amber-200 mt-2">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-400 block">{isAr ? 'المُعَلِّمُ المُرْشِدُ' : 'Teacher / Mentor'}</span>
                    <span className="text-sm font-black text-slate-800">{isAr ? 'أ. هَنْدَسْ الذَّكِيُّ 🤖' : 'Smart Handas 🤖'}</span>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
                    ⭐
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-400 block">{isAr ? 'المُسْتَوَى' : 'Mastery'}</span>
                    <span className="text-sm font-black text-amber-800">{isAr ? 'عَبْقَرِيُّ الهَنْدَسَةِ 🌟' : 'Geometry Genius 🌟'}</span>
                  </div>
                </div>
              </div>

              {/* Print Action */}
              <button
                onClick={handlePrintCertificate}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base sm:text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 active:scale-95"
              >
                <Printer className="w-5 h-5" />
                <span>{t.rewards.printCert}</span>
              </button>
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6">
              {/* Name Editor */}
              <form onSubmit={handleUpdateName} className="flex flex-col gap-3">
                <label className="text-sm font-black text-slate-800">
                  {t.rewards.studentNameLabel}
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={studentNameInput}
                    onChange={e => setStudentNameInput(e.target.value)}
                    placeholder={isAr ? 'اكْتُبِ اسْمَ الطَّالِبِ...' : 'Enter student name...'}
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:outline-hidden font-bold text-slate-900 bg-amber-50/40"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black transition-all active:scale-95 shrink-0"
                  >
                    {t.rewards.saveName}
                  </button>
                </div>
              </form>

              {/* Avatar Selector */}
              <div className="flex flex-col gap-3 pt-4 border-t border-amber-100">
                <label className="text-sm font-black text-slate-800">
                  {t.rewards.chooseAvatar}
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
                  {avatars.map(av => (
                    <button
                      key={av}
                      onClick={() => handleSelectAvatar(av)}
                      className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all active:scale-95 ${
                        progress.avatar === av
                          ? 'bg-amber-400/30 border-amber-500 scale-110 shadow-md ring-2 ring-amber-300'
                          : 'bg-white hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
