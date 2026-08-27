// Bilingual Speech synthesis and recognition manager for Arabic and English

import { Language } from '../types';

export interface SpeechRecognitionResultState {
  transcript: string;
  isCorrect: boolean;
  confidence: number;
  message: string;
}

export class AppSpeechManager {
  private synth: SpeechSynthesis | null = null;
  private isVoiceEnabled: boolean = true;
  private currentLanguage: Language = 'ar';
  private selectedArVoice: SpeechSynthesisVoice | null = null;
  private selectedEnVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public setLanguage(lang: Language | string) {
    this.currentLanguage = lang === 'en' ? 'en' : 'ar';
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      // Find Arabic voice
      const arVoice = voices.find(
        v => v.lang.startsWith('ar') || v.lang.includes('ar-') || v.name.includes('Arabic')
      );
      if (arVoice) {
        this.selectedArVoice = arVoice;
      }

      // Find English (prefer child-friendly / clear en-US or en-GB voices)
      const enVoice = voices.find(
        v =>
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))) ||
          v.lang.includes('en-GB') ||
          v.lang.includes('en-US') ||
          v.lang.startsWith('en') ||
          v.name.includes('English')
      );
      if (enVoice) {
        this.selectedEnVoice = enVoice;
      }
    }
  }

  public setVoiceEnabled(enabled: boolean) {
    this.isVoiceEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public getVoiceEnabled(): boolean {
    return this.isVoiceEnabled;
  }

  public speak(text: string, langOverride?: Language | string, onEnd?: () => void) {
    if (!this.isVoiceEnabled || !this.synth) {
      if (onEnd) setTimeout(onEnd, 300);
      return;
    }

    try {
      this.synth.cancel(); // Stop any currently playing audio

      const activeLang = langOverride === 'en' ? 'en' : (langOverride === 'ar' ? 'ar' : this.currentLanguage);
      const utterance = new SpeechSynthesisUtterance(text);

      if (activeLang === 'ar') {
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        if (this.selectedArVoice) {
          utterance.voice = this.selectedArVoice;
        }
      } else {
        utterance.lang = 'en-US';
        utterance.rate = 0.78; // Slow, deliberate and gentle for children
        utterance.pitch = 1.05;
        if (this.selectedEnVoice) {
          utterance.voice = this.selectedEnVoice;
        }
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Remove Arabic diacritics (harakat) for flexible text comparison
  public static normalizeArabic(text: string): string {
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel / harakat
      .replace(/[أإآآ]/g, 'ا') // Normalize Alef
      .replace(/ة/g, 'ه') // Normalize Taa Marbuta
      .replace(/ى/g, 'ي') // Normalize Yaa
      .replace(/[^\u0600-\u06FF\s0-9]/g, '') // Remove non-arabic symbols
      .trim()
      .toLowerCase();
  }

  public static normalizeEnglish(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Verify pronunciation / match spoken words against targets
  public checkMatch(spoken: string, targets: string[], lang: Language | string = this.currentLanguage): boolean {
    const isEnglish = lang === 'en';
    if (!isEnglish) {
      const normSpoken = AppSpeechManager.normalizeArabic(spoken);
      return targets.some(target => {
        const normTarget = AppSpeechManager.normalizeArabic(target);
        return normSpoken.includes(normTarget) || normTarget.includes(normSpoken);
      });
    } else {
      const normSpoken = AppSpeechManager.normalizeEnglish(spoken);
      return targets.some(target => {
        const normTarget = AppSpeechManager.normalizeEnglish(target);
        return normSpoken.includes(normTarget) || normTarget.includes(normSpoken);
      });
    }
  }

  // Interactive Voice Recognition for Kids
  public startListening(
    expectedWords: string[],
    onResult: (result: SpeechRecognitionResultState) => void,
    onError: (err: string) => void,
    langOverride?: Language | string,
    onStart?: () => void
  ): () => void {
    const lang = langOverride === 'en' ? 'en' : 'ar';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const errorMsg =
        lang === 'ar'
          ? 'خاصية التعرف على الصوت غير مدعومة في هذا المتصفح. يمكنك استخدام أزرار الإجابة باللمس!'
          : 'Speech recognition is not supported in this browser. You can use the touch buttons!';
      onError(errorMsg);
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ar' ? 'ar-SA' : 'en-GB';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      let hasFired = false;

      recognition.onstart = () => {
        if (onStart) onStart();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        hasFired = true;
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence || 0.9;
        const isMatch = this.checkMatch(transcript, expectedWords, lang);

        let message = '';
        if (lang === 'ar') {
          message = isMatch
            ? `أحسنت يا بطل! نطقت: "${transcript}" بشكل صحيح وممتاز!`
            : `نطقت: "${transcript}". حاول مجددًا بوضوح: ${expectedWords[0]}`;
        } else {
          message = isMatch
            ? `Super star! You pronounced "${transcript}" clearly and correctly!`
            : `You said: "${transcript}". Let's try again saying: "${expectedWords[0]}"`;
        }

        onResult({
          transcript,
          isCorrect: isMatch,
          confidence,
          message
        });
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        if (!hasFired) {
          if (event.error === 'not-allowed') {
            onError(
              lang === 'ar'
                ? 'يرجى السماح باستخدام الميكروفون لتفعيل التحدث الصوتي.'
                : 'Please allow microphone access to enable speech recognition.'
            );
          } else if (event.error === 'no-speech') {
            onError(
              lang === 'ar'
                ? 'لم أسمع صوتك بوضوح، اضغط على الميكروفون وتحدث بصوت مسموع!'
                : "Couldn't hear you clearly. Tap the mic and speak audibly!"
            );
          } else {
            onError(
              lang === 'ar'
                ? 'حدث خطأ في استقبال الصوت، يمكنك المحاولة مجددًا.'
                : 'Microphone input error, please try again.'
            );
          }
        }
      };

      recognition.start();

      return () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      };
    } catch {
      onError(lang === 'ar' ? 'تعذر تشغيل الميكروفون.' : 'Could not activate microphone.');
      return () => {};
    }
  }
}

export const arabicSpeech = new AppSpeechManager();
export const appSpeech = arabicSpeech;
export { AppSpeechManager as ArabicSpeechManager };
