import React from 'react';
import { StudentProgress, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { useTranslation } from '../utils/i18n';
import { FlagIcon } from './FlagIcon';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Trophy,
  BarChart3,
  Layers,
  HelpCircle,
  Shapes,
  MessageSquare
} from 'lucide-react';

export type NavigationTab = 'explorer' | 'sorting' | 'riddles' | 'voice' | 'dashboard';

interface NavbarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenRewards: () => void;
  progress: StudentProgress;
  isMuted: boolean;
  onToggleMute: () => void;
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenRewards,
  progress,
  isMuted,
  onToggleMute,
  isVoiceEnabled,
  onToggleVoice,
  lang,
  onLanguageChange
}) => {
  const t = useTranslation(lang);

  const tabs = [
    { id: 'explorer' as NavigationTab, label: t.tabs.explorer, icon: Shapes },
    { id: 'sorting' as NavigationTab, label: t.tabs.sorting, icon: Layers },
    { id: 'riddles' as NavigationTab, label: t.tabs.riddles, icon: HelpCircle },
    { id: 'voice' as NavigationTab, label: t.tabs.voice, icon: MessageSquare },
    { id: 'dashboard' as NavigationTab, label: t.tabs.dashboard, icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo, App Title & Mobile Quick Actions */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onTabChange('explorer')}
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-amber-500 shrink-0 border-2 border-amber-300">
              <img src="/icon.svg" alt="3D Shapes Icon" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-lg sm:text-2xl leading-tight">
                {t.appName}
              </h1>
              <span className="text-xs sm:text-sm font-bold text-amber-800 block">
                {t.appSubtitle}
              </span>
            </div>
          </div>

          {/* Mobile Language & Rewards */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Language Switcher Mobile */}
            <div className="flex items-center bg-amber-50 p-1 rounded-xl border border-amber-200">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onLanguageChange('ar');
                }}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all ${
                  lang === 'ar'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
                title="العربية (الجزائر)"
              >
                <FlagIcon country="dz" className="w-4 h-3" />
                <span>ع</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onLanguageChange('en');
                }}
                className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
                title="English (UK)"
              >
                <FlagIcon country="gb" className="w-4 h-3" />
                <span>EN</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenRewards();
              }}
              className="flex items-center gap-1 bg-amber-100/90 text-amber-900 px-2.5 py-1.5 rounded-xl font-black text-xs shadow-xs active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{progress.stars} ⭐</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange(tab.id);
                }}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-base whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md scale-102 ring-2 ring-amber-300'
                    : 'bg-amber-50/70 hover:bg-amber-100/80 text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Controls: Language Selector, Sound & Speech, Rewards */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher Buttons (Algerian 🇩🇿 & British 🇬🇧 Flags) */}
          <div className="flex items-center bg-amber-50 p-1.5 rounded-2xl border border-amber-200 shadow-xs">
            <button
              onClick={() => {
                soundEffects.playPop();
                onLanguageChange('ar');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                lang === 'ar'
                  ? 'bg-amber-500 text-white shadow-xs font-black'
                  : 'text-slate-700 hover:bg-amber-100/80'
              }`}
              title="اللغة العربية (علم الجزائر 🇩🇿)"
            >
              <FlagIcon country="dz" className="w-5 h-3.5" />
              <span>العربية</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                onLanguageChange('en');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs font-black'
                  : 'text-slate-700 hover:bg-amber-100/80'
              }`}
              title="English (British Flag 🇬🇧)"
            >
              <FlagIcon country="gb" className="w-5 h-3.5" />
              <span>English</span>
            </button>
          </div>

          {/* Sound & Speech Toggles */}
          <div className="flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-2xl border border-amber-200">
            <button
              onClick={() => {
                onToggleMute();
                soundEffects.playPop();
              }}
              className={`p-2 rounded-xl transition-all ${
                !isMuted ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title={!isMuted ? t.nav.muteAudio : t.nav.unmuteAudio}
            >
              {!isMuted ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <button
              onClick={() => {
                onToggleVoice();
                soundEffects.playPop();
              }}
              className={`p-2 rounded-xl transition-all ${
                isVoiceEnabled ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title={isVoiceEnabled ? t.nav.muteVoice : t.nav.unmuteVoice}
            >
              {isVoiceEnabled ? <Mic className="w-4 h-4 sm:w-5 sm:h-5" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Rewards Modal Opener */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenRewards();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-3.5 py-2 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{progress.stars} ⭐</span>
            <span className="text-amber-100">|</span>
            <span>{progress.gems} 💎</span>
          </button>
        </div>
      </div>
    </header>
  );
};
