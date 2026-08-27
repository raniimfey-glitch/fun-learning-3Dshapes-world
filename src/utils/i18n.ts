import { Language } from '../types';

export const translations = {
  ar: {
    appName: 'عَالَمُ المُجَسَّمَاتِ 3D',
    appSubtitle: 'لِلأَبْطَالِ الصِّغَارِ • المَرْحَلَةُ الاِبْتِدَائِيَّةُ',
    tabs: {
      explorer: 'المُسْتَكْشِفُ 3D 🎲',
      sorting: 'فَرْزُ الوَاقِعِ 🎯',
      riddles: 'فَوَازِيرُ المُجَسَّمَاتِ 🔍',
      voice: 'التَّحَدُّثُ وَالمُدَقِّقُ 🗣️',
      dashboard: 'لَوْحَةُ التَّقَدُّمِ 📊'
    },
    nav: {
      muteAudio: 'كَتْمُ المُؤَثِّرَاتِ الصَّوْتِيَّةِ',
      unmuteAudio: 'تَشْغِيلُ المُؤَثِّرَاتِ الصَّوْتِيَّةِ',
      muteVoice: 'تَعْطِيلُ القِرَاءَةِ الصَّوْتِيَّةِ',
      unmuteVoice: 'تَفْعِيلُ القِرَاءَةِ الصَّوْتِيَّةِ',
      stars: 'نجمة',
      gems: 'جوهرة',
      language: 'اللغة',
      arabic: 'العربية',
      english: 'الإنجليزية'
    },
    footer: {
      text: 'التّعلّم الممتِع  - عالم المجسمات3D. - سميرة عبد الصدوق'
    },
    explorer: {
      selectShapeHint: 'اخْتَرِ المُجَسَّمَ لِبَدْءِ الاِسْتِكْشَافِ التَّفَاعُلِيِّ',
      faces: 'الأَوْجُهُ',
      edges: 'الأَحْرُفُ (الأَضْلاعُ)',
      vertices: 'الرُّؤُوسُ (الزَّوَايَا)',
      geometricProperties: 'الخَصَائِصُ الحَرَكِيَّةُ وَالمِيزَاتُ',
      rollable: 'قَابِلٌ لِلتَّدَحْرُجِ',
      notRollable: 'غَيْرُ قَابِلٍ لِلتَّدَحْرُجِ',
      slideable: 'قَابِلٌ لِلاِنْزِلاقِ',
      notSlideable: 'غَيْرُ قَابِلٍ لِلاِنْزِلاقِ',
      stackable: 'قَابِلٌ لِلتَّرَاكُمِ وَالرَّصِّ',
      notStackable: 'غَيْرُ قَابِلٍ لِلرَّصِّ',
      linguisticsTitle: 'الأَسْرَارُ اللُّغَوِيَّةُ وَفَصَاحَةُ اللِّسَانِ',
      ruleLabel: 'القَاعِدَةُ النَّحْوِيَّةُ وَالصَّرْفِيَّةُ',
      explanationLabel: 'سَبَبُ التَّسْمِيَةِ وَالشَّرْحُ',
      vocalizationLabel: 'طَرِيقَةُ النُّطْقِ وَالتَّشْكِيلِ',
      pluralLabel: 'صِيغَةُ الجَمْعِ',
      realWorldTitle: 'مُجَسَّمَاتٌ مِنْ حَيَاتِنَا اليَوْمِيَّةِ',
      funFactTitle: 'هَلْ تَعْلَمُ؟ (مَعْلُومَةٌ ذَكِيَّةٌ)',
      explore3D: 'عَرْضٌ ثُلاثِيُّ الأَبْعَادِ 3D',
      unfoldNet: 'شَبَكَةُ النَّشْرِ وَالتَّرْكِيبِ',
      completedBadge: 'تَمَّ الاِسْتِكْشَافُ بِنَجَاحٍ! ⭐'
    },
    viewer: {
      modes: {
        inspect: 'اِسْتِكْشَافٌ حُرٌّ',
        faces: 'عَدُّ الأَوْجُهِ',
        edges: 'عَدُّ الأَحْرُفِ',
        vertices: 'عَدُّ الرُّؤُوسِ'
      },
      interactiveCounts: {
        facesProgress: 'عَدَدْتَ {current} مِنْ أَصْلِ {max} أَوْجُهٍ',
        edgesProgress: 'عَدَدْتَ {current} مِنْ أَصْلِ {max} أَحْرُفٍ',
        verticesProgress: 'عَدَدْتَ {current} مِنْ أَصْلِ {max} رُؤُوسٍ',
        completedAll: 'بَطَلٌ! اِكْتَمَلَ عَدُّ جَمِيعِ العَنَاصِرِ! 🎉'
      },
      controls: {
        autoRotate: 'دَوَرَانٌ تِلْقَائِيٌّ',
        stopRotate: 'إِيقَافُ الدَّوَرَانِ',
        wireframe: 'الهَيْكَلُ الشَّبَكِيُّ',
        solid: 'المُجَسَّمُ المُصْمَتُ',
        reset: 'إِعَادَةُ الضَّبْطِ',
        listenName: 'اِسْتَمِعْ لِلاِسْمِ'
      },
      hints: {
        rotateHint: 'حَرِّكْ بِإِصْبَعِكَ لِتَدْوِيرِ المُجَسَّمِ 360 دَرَجَةً!',
        touchFaceHint: 'اِلْمَسِ الأَوْجُهَ لِتَلْوِينِهَا وَعَدِّهَا!',
        touchEdgeHint: 'اِلْمَسِ الأَحْرُفَ (الأَضْلاعَ) لِعَدِّهَا!',
        touchVertexHint: 'اِلْمَسِ الرُّؤُوسَ المُدَبَّبَةَ لِعَدِّهَا!'
      }
    },
    net: {
      title: 'شَبَكَةُ النَّشْرِ وَالتَّرْكِيبِ الهَنْدَسِيَّةِ',
      subtitle: 'اِسْحَبِ الشَّرِيطَ لِمُشَاهَدَةِ كَيْفَ يَنْفَتِحُ وَيَنْغَلِقُ المُجَسَّمُ!',
      folded: 'مُجَسَّمٌ مُغْلَقٌ',
      unfolded: 'شَبَكَةٌ مُنْبَسِطَةٌ',
      foldBtn: 'طَيُّ المُجَسَّمِ',
      unfoldBtn: 'بَسْطُ الشَّبَكَةِ',
      stepDescription: 'حَالَةُ الشَّبَكَةِ الآنَ:'
    },
    sorting: {
      title: 'تَحَدِّي فَرْزِ المُجَسَّمَاتِ فِي الحَيَاةِ',
      subtitle: 'اِسْحَبِ العُنْصُرَ إِلَى سَلَّةِ المُجَسَّمِ الهَنْدَسِيِّ المُنَاسِبِ لَهُ!',
      score: 'النِّقَاطُ',
      remaining: 'العَنَاصِرُ المُتَبَقِّيَةُ',
      greatJob: 'مُمْتَازٌ جِدًّا! إِجَابَةٌ صَحِيحَةٌ! 🌟',
      tryAgain: 'حَاوِلْ مَرَّةً أُخْرَى، هَذَا العُنْصُرُ يَنْتَمِي لِمُجَسَّمٍ آخَرَ!',
      victoryTitle: 'أَحْسَنْتَ يَا عَبْقَرِيَّ الهَنْدَسَةِ! 🏆',
      victorySubtitle: 'لَقَدْ قُمْتَ بِفَرْزِ جَمِيعِ العَنَاصِرِ بِدِقَّةٍ وَنَجَاحٍ!',
      victoryDesc: 'لَقَدْ قُمْتَ بِفَرْزِ جَمِيعِ العَنَاصِرِ بِدِقَّةٍ وَنَجَاحٍ وَرَبَطْتَ المَفَاهِيمَ بِالبِيئَةِ المُحِيطَةِ!',
      finalScore: 'النَّتِيجَةُ النِّهَائِيَّةُ',
      playAgain: 'اللَّعِبُ مُجَدَّدًا 🔄',
      placeHere: 'ضَعْ هُنَا'
    },
    riddles: {
      title: 'فَوَازِيرُ وَأَلْغَازُ الأَشْكَالِ 3D',
      subtitle: 'اِقْرَأِ اللَّمَحَاتِ الذَّكِيَّةَ وَاخْتَرِ المُجَسَّمَ المَطْلُوبَ!',
      question: 'السُّؤَالُ:',
      hintBtn: 'إِظْهَارُ التَّلْمِيحِ 💡',
      correct: 'إِجَابَةٌ عَبْقَرِيَّةٌ صَحِيحَةٌ! 🎯',
      wrong: 'إِجَابَةٌ خَاطِئَةٌ، رَكِّزْ وَحَاوِلْ مَرَّةً أُخْرَى!',
      nextBtn: 'السُّؤَالُ التَّالِي ➡️',
      nextRiddle: 'الفُزُورَةُ التَّالِيَةُ',
      score: 'نَتِيجَتُكَ'
    },
    voice: {
      title: 'التَّحَدُّثُ التَّفَاعُلِيُّ وَالمُدَقِّقُ اللُّغَوِيُّ',
      subtitle: 'تَدَرَّبْ عَلَى النُّطْقِ العَرَبِيِّ الفَصِيحِ لأَسْمَاءِ المُجَسَّمَاتِ وَقَوَاعِدِ العَدَدِ وَالمَعْدُودِ مَعَ الرُّوبُوتِ "هَنْدَسْ"!',
      clickToSpeak: 'اِضْغَطْ لِلتَّحَدُّثِ',
      listening: 'أَنَا أَسْتَمِعُ إِلَيْكَ الآنَ... تَكَلَّمْ بِوُضُوحٍ!',
      feedbackTitle: 'نَتِيجَةُ النُّطْقِ:',
      tryAgainBtn: 'إِعَادَةُ المُحَاوَلَةِ الصَّوْتِيَّةِ',
      listenFirst: 'اِسْتَمِعْ لِلنُّطْقِ السَّلِيمِ أَوَّلًا',
      assistantTag: 'المُسَاعِدُ اللُّغَوِيُّ: هَنْدَسْ',
      rulesTitle: 'وَقْفَةٌ مَعَ المُدَقِّقِ اللُّغَوِيِّ وَالقَوَاعِدِ النَّحْوِيَّةِ'
    },
    dashboard: {
      title: 'لَوْحَةُ تَحَكُّمٍ وَمُتَابَعَةِ تَقَدُّمِ المُتَعَلِّمِ',
      subtitle: 'مُخَصَّصَةٌ لِلْمُعَلِّمِينَ وَأَوْلِيَاءِ الأُمُورِ لِمُتَابَعَةِ اسْتِيعَابِ المَفَاهِيمِ الهَنْدَسِيَّةِ وَالنُّطْقِ اللُّغَوِيِّ',
      totalStars: 'مَجْمُوعُ النُّجُومِ',
      totalGems: 'الجَوَاهِرُ المَجْمُوعَةُ',
      exploredShapes: 'المُجَسَّمَاتُ المُسْتَكْشَفَةُ',
      sortedItems: 'تَصْنِيفُ مُجَسَّمَاتِ الوَاقِعِ',
      badgesTitle: 'أَوْسِمَةُ الشَّرَفِ وَالإِنْجَازِ 🏅',
      masteryTitle: 'نِسْبَةُ إِتْقَانِ كُلِّ مُجَسَّمٍ',
      officialCertBtn: 'عَرْضُ وَطِبَاعَةُ الشَّهَادَةِ الرَّسْمِيَّةِ 📜',
      overallMastery: 'نِسْبَةُ الإِتْقَانِ العَامَّةُ',
      starsGems: 'النُّجُومُ وَالمُكَافَآتُ',
      voicePractice: 'التَّحَدُّثُ وَالنُّطْقُ الفَصِيحُ',
      shapesDetails: 'تَفَاصِيلُ اسْتِيعَابِ المُجَسَّمَاتِ الهَنْدَسِيَّةِ الفَرْدِيَّةِ',
      mastered: 'مُتْقَنٌ',
      pedagogicalNotes: 'تَوْصِيَاتٌ تَرْبَوِيَّةٌ ذَكِيَّةٌ لِتَعْزِيزِ الفَهْمِ (نَصَائِحُ المُعَلِّمِ)',
      resetButton: 'إِعَادَةُ ضَبْطِ تَقَدُّمِ الطَّالِبِ'
    },
    rewards: {
      title: 'خِزَانَةُ الأَوْسِمَةِ وَالجَوَائِزِ الذَّهَبِيَّةِ',
      modalTitle: 'لَوْحَةُ الشَّرَفِ وَالشَّهَادَةُ التَّقْدِيرِيَّةُ',
      badgesTab: 'الأَوْسِمَةُ المُكْتَسَبَةُ',
      certificateTab: 'الشَّهَادَةُ الرَّسْمِيَّةُ',
      profileTab: 'مَلَفُّ الطَّالِبِ',
      printCert: 'طِبَاعَةُ الشَّهَادَةِ 🖨️',
      close: 'إِغْلاقٌ',
      certOfExcellence: 'شَهَادَةُ تَفَوُّقٍ وَإِبْدَاعٍ هَنْدَسِيٍّ',
      certTitle: 'شَهَادَةُ إِتْقَانِ عَالَمِ المُجَسَّمَاتِ 3D',
      certAwardedTo: 'تُشْهِدُ مَنَصَّةُ عَالَمِ المُجَسَّمَاتِ التَّعْلِيمِيَّةُ بِأَنَّ البَطَلَ المُمَيَّزَ:',
      certBody: 'قَدْ أَتَمَّ بِنَجَاحٍ وَتَفَوُّقٍ جَمِيعَ مَرَاحِلِ اسْتِكْشَافِ المُجَسَّمَاتِ الهَنْدَسِيَّةِ، وَأَظْهَرَ فَهْمًا رَائِعًا لِلْأَوْجُهِ وَالأَحْرُفِ وَالرُّؤُوسِ وَأَصْوَاتِ اللُّغَةِ الفَصِيحَةِ.',
      studentNameLabel: 'اسْمُ الطَّالِبِ (يَظْهَرُ فِي الشَّهَادَةِ):',
      saveName: 'حِفْظُ الاسْمِ',
      chooseAvatar: 'اخْتَرِ الرَّمْزَ الشَّخْصِيَّ (الأَفَاتَارَ):',
      certificate: {
        header: 'شَهَادَةُ إِتْقَانِ عَالَمِ المُجَسَّمَاتِ ثُلاثِيَّةِ الأَبْعَادِ',
        presentedTo: 'تُشْهِدُ مَنَصَّةُ عَالَمِ المُجَسَّمَاتِ التَّعْلِيمِيَّةُ بِأَنَّ البَطَلَ المُمَيَّزَ:',
        studentPlaceholder: 'عَبْقَرِيُّ الرِّيَاضِيَّاتِ الصَّغِيرُ',
        achievement: 'قَدْ أَتَمَّ بِنَجَاحٍ وَتَفَوُّقٍ جَمِيعَ مَرَاحِلِ اسْتِكْشَافِ المُجَسَّمَاتِ الهَنْدَسِيَّةِ، وَأَظْهَرَ فَهْمًا رَائِعًا لِلْأَوْجُهِ وَالأَحْرُفِ وَالرُّؤُوسِ وَأَصْوَاتِ اللُّغَةِ العَرَبِيَّةِ الفَصِيحَةِ.',
        stats: 'نِقَاطُ الإِنْجَازِ:',
        date: 'التَّارِيخُ:',
        signature: 'إِشْرَافُ الأُسْتَاذَةِ: سَمِيرَة عَبْد الصَّدُوق'
      }
    }
  },
  en: {
    appName: '3D Shapes World',
    appSubtitle: 'For Young Explorers • Primary Education',
    tabs: {
      explorer: '3D Explorer 🎲',
      sorting: 'Real-World Sorting 🎯',
      riddles: 'Shape Riddles 🔍',
      voice: 'Speech Lab 🗣️',
      dashboard: 'My Progress 📊'
    },
    nav: {
      muteAudio: 'Mute Sound Effects',
      unmuteAudio: 'Unmute Sound Effects',
      muteVoice: 'Turn Off Voice Narration',
      unmuteVoice: 'Turn On Voice Narration',
      stars: 'Stars',
      gems: 'Gems',
      language: 'Language',
      arabic: 'العربية (Arabic)',
      english: 'English'
    },
    footer: {
      text: 'Fun Learning - 3D Shapes World - Samira Abdel Sadouk'
    },
    explorer: {
      selectShapeHint: 'Select a 3D shape to start exploring interactive geometry!',
      faces: 'Faces',
      edges: 'Edges (Sides)',
      vertices: 'Vertices (Corners)',
      geometricProperties: 'Motion & Geometric Behaviors',
      rollable: 'Can Roll Smoothly',
      notRollable: 'Cannot Roll',
      slideable: 'Can Slide on Flat Surfaces',
      notSlideable: 'Cannot Slide',
      stackable: 'Can be Stacked on Top',
      notStackable: 'Cannot be Stacked',
      linguisticsTitle: 'Etymology & Vocabulary Fun',
      ruleLabel: 'Linguistic & Grammar Rule',
      explanationLabel: 'Name Origin & Explanation',
      vocalizationLabel: 'Pronunciation & Phonics Guide',
      pluralLabel: 'Plural Form',
      realWorldTitle: 'Everyday Objects in Real Life',
      funFactTitle: 'Did You Know? (Fun Fact)',
      explore3D: 'Interactive 3D View',
      unfoldNet: 'Geometry Net (Unfold)',
      completedBadge: 'Exploration Completed! ⭐'
    },
    viewer: {
      modes: {
        inspect: 'Free Orbit',
        faces: 'Count Faces',
        edges: 'Count Edges',
        vertices: 'Count Vertices'
      },
      interactiveCounts: {
        facesProgress: 'Counted {current} of {max} faces',
        edgesProgress: 'Counted {current} of {max} edges',
        verticesProgress: 'Counted {current} of {max} vertices',
        completedAll: 'Awesome Job! You found and counted all elements! 🎉'
      },
      controls: {
        autoRotate: 'Auto-Rotate',
        stopRotate: 'Pause Rotation',
        wireframe: 'Wireframe Mode',
        solid: 'Solid 3D Mode',
        reset: 'Reset Camera',
        listenName: 'Pronounce Name'
      },
      hints: {
        rotateHint: 'Drag with your finger or mouse to orbit 360°!',
        touchFaceHint: 'Tap the faces to highlight and count them!',
        touchEdgeHint: 'Tap glowing edges to count each side!',
        touchVertexHint: 'Tap corners/vertices to count them!'
      }
    },
    net: {
      title: 'Geometric Net & Unfolding Studio',
      subtitle: 'Drag the slider to watch how 3D shapes unfold into 2D flat patterns!',
      folded: 'Folded 3D Solid',
      unfolded: 'Flat 2D Net',
      foldBtn: 'Fold Shape',
      unfoldBtn: 'Unfold Net',
      stepDescription: 'Current Folding State:'
    },
    sorting: {
      title: 'Real-World Shape Sorting Challenge',
      subtitle: 'Drag and drop real-life objects into their matching 3D geometry basket!',
      score: 'Score',
      remaining: 'Items Left',
      greatJob: 'Brilliant! Correct match! 🌟',
      tryAgain: 'Oops, look closely at the shape and try another basket!',
      victoryTitle: 'You are a Geometry Master! 🏆',
      victorySubtitle: 'You correctly classified all real-world objects!',
      victoryDesc: 'You accurately categorized every everyday object and connected geometric solids to the real environment!',
      finalScore: 'Final Score',
      playAgain: 'Play Again 🔄',
      placeHere: 'Drop Here'
    },
    riddles: {
      title: '3D Geometry Mystery Riddles',
      subtitle: 'Read the clever clues and guess the mystery solid shape!',
      question: 'Question:',
      hintBtn: 'Show Hint 💡',
      correct: 'Genius answer! Perfectly correct! 🎯',
      wrong: 'Not quite, check the clues and give it another shot!',
      nextBtn: 'Next Riddle ➡️',
      nextRiddle: 'Next Riddle',
      score: 'Your Score'
    },
    voice: {
      title: 'Interactive Speech & Pronunciation Lab',
      subtitle: 'Practice clear pronunciation of 3D shapes and grammar with Robot Handas!',
      clickToSpeak: 'Tap to Speak',
      listening: 'Listening to your voice... Speak clearly into the mic!',
      feedbackTitle: 'Speech Evaluation:',
      tryAgainBtn: 'Try Speaking Again',
      listenFirst: 'Listen to Correct Pronunciation',
      assistantTag: 'Speech Assistant: Handas',
      rulesTitle: 'Linguistic Corner & Geometry Rules'
    },
    dashboard: {
      title: "Hero's Progress & Mastery Hub",
      subtitle: 'Designed for teachers and parents to monitor geometry concepts and speech mastery.',
      totalStars: 'Total Stars Earned',
      totalGems: 'Total Gems Collected',
      exploredShapes: 'Shapes Mastered',
      sortedItems: 'Real-World Objects Categorized',
      badgesTitle: 'Badges & Achievements 🏅',
      masteryTitle: 'Mastery Level per Shape',
      officialCertBtn: 'View & Print Official Certificate 📜',
      overallMastery: 'Overall Mastery',
      starsGems: 'Stars & Rewards',
      voicePractice: 'Speech & Vocalization',
      shapesDetails: 'Individual 3D Shape Understanding',
      mastered: 'Mastered',
      pedagogicalNotes: 'Smart Pedagogical Insights (Teacher Tips)',
      resetButton: 'Reset Student Progress'
    },
    rewards: {
      title: 'Golden Badges & Honors Showcase',
      modalTitle: 'Hall of Fame & Certificate of Excellence',
      badgesTab: 'Earned Badges',
      certificateTab: 'Official Certificate',
      profileTab: 'Student Profile',
      printCert: 'Print Certificate 🖨️',
      close: 'Close',
      certOfExcellence: 'Certificate of Geometric Excellence',
      certTitle: '3D Shapes Mastery Certificate',
      certAwardedTo: 'This certifies that our outstanding young hero:',
      certBody: 'Has successfully mastered all 3D geometric shapes, identifying faces, edges, vertices, nets, and demonstrating clear vocalization and classification.',
      studentNameLabel: 'Student Name (shown on certificate):',
      saveName: 'Save Name',
      chooseAvatar: 'Choose Avatar Icon:',
      certificate: {
        header: '3D GEOMETRY MASTERY CERTIFICATE',
        presentedTo: 'This is proudly awarded to our young mathematician:',
        studentPlaceholder: 'Little Math Champion',
        achievement: 'For successfully demonstrating complete mastery in 3D geometric shapes, distinguishing faces, edges, vertices, nets, and real-world classification.',
        stats: 'Achievement Stats:',
        date: 'Date of Completion:',
        signature: 'Supervised by: Teacher Samira Abdel Sadouk'
      }
    }
  }
};

export function useTranslation(lang?: Language | string) {
  if (lang === 'en') return translations.en;
  return translations.ar;
}
