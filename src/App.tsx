import React, { useState, useEffect } from 'react';
import { Navbar, NavigationTab } from './components/Navbar';
import { ShapeExplorer } from './components/ShapeExplorer';
import { SortingGame } from './components/SortingGame';
import { RiddleGame } from './components/RiddleGame';
import { VoiceChallenge } from './components/VoiceChallenge';
import { ProgressDashboard } from './components/ProgressDashboard';
import { RewardsModal } from './components/RewardsModal';
import { StudentProgress, Language } from './types';
import { loadProgress, saveProgress } from './utils/storage';
import { soundEffects } from './utils/audio';
import { appSpeech } from './utils/speech';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('explorer');
  const [progress, setProgress] = useState<StudentProgress>(loadProgress());
  const [isRewardsOpen, setIsRewardsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);

  // Sync document direction and lang attribute whenever lang changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Sync state with audio managers
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEffects.setMuted(next);
  };

  const handleToggleVoice = () => {
    const next = !isVoiceEnabled;
    setIsVoiceEnabled(next);
    appSpeech.setVoiceEnabled(next);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    soundEffects.playPop();
    const welcomeText = newLang === 'ar'
      ? 'أَهْلًا بِكَ فِي عَالَمِ المُجَسَّمَاتِ!'
      : 'Welcome to the 3D Geometry World!';
    appSpeech.speak(welcomeText, newLang);
  };

  const handleProgressUpdate = (updated: StudentProgress) => {
    setProgress(updated);
    saveProgress(updated);
  };

  // Welcome greeting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      appSpeech.speak(
        'مَرْحَبًا بِكَ يا بَطَلَ الهَنْدَسَةِ فِي عالَمِ المُجَسَّماتِ ثُلاثِيَّةِ الأَبْعادِ! هَيَّا نَسْتَكْشِفْ وَنَتَعَلَّمْ مَعًا.',
        'ar'
      );
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-100/40 text-slate-800 flex flex-col ${
        lang === 'ar' ? "font-['Tajawal',sans-serif]" : "font-sans"
      }`}
    >
      {/* Top Friendly Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenRewards={() => setIsRewardsOpen(true)}
        progress={progress}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isVoiceEnabled={isVoiceEnabled}
        onToggleVoice={handleToggleVoice}
        lang={lang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Learning Canvas */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 flex flex-col items-center">
        {currentTab === 'explorer' && (
          <ShapeExplorer
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            lang={lang}
          />
        )}

        {currentTab === 'sorting' && (
          <SortingGame
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            lang={lang}
          />
        )}

        {currentTab === 'riddles' && (
          <RiddleGame
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            lang={lang}
          />
        )}

        {currentTab === 'voice' && (
          <VoiceChallenge
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            lang={lang}
          />
        )}

        {currentTab === 'dashboard' && (
          <ProgressDashboard
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            lang={lang}
          />
        )}
      </main>

      {/* Footer strictly keeping user specification */}
      <footer className="w-full bg-white/70 backdrop-blur-md border-t border-amber-200/60 py-4 px-4 text-center text-sm sm:text-base text-slate-700 font-bold max-w-6xl mx-auto flex items-center justify-center">
        <span>التّعلّم الممتِع  - عالم المجسمات3D. - سميرة عبد الصدوق</span>
      </footer>

      {/* Rewards & Printable Certificate Modal */}
      <RewardsModal
        isOpen={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
        progress={progress}
        onProgressUpdate={handleProgressUpdate}
        lang={lang}
      />
    </div>
  );
}
