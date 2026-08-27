import { ShapeData, Badge } from '../types';

export const SHAPES_DATA: ShapeData[] = [
  {
    id: 'cube',
    name: 'المُكَعَّبُ',
    nameEn: 'Cube',
    tashkeelName: 'المُكَعَّبُ',
    englishName: 'Cube',
    color: '#3B82F6', // Blue
    secondaryColor: '#60A5FA',
    iconName: 'Box',
    description: 'مُجَسَّمٌ هَنْدَسِيٌّ لَهُ سِتَّةُ أَوْجُهٍ مُرَبَّعَةٍ مُتَطَابِقَةٍ، وَثَمَانِيَةُ رُؤُوسٍ، وَاثْنَا عَشَرَ حَرْفًا مُتَسَاوِيَةَ الطُّولِ.',
    descriptionEn: 'A solid 3D shape with 6 identical square faces, 8 vertices (corners), and 12 straight edges of equal length.',
    facesCount: 6,
    facesType: 'مُرَبَّعَةُ الشَّكْلِ وَمُتَطَابِقَةٌ جَمِيعُهَا',
    facesTypeEn: '6 Identical flat square faces',
    edgesCount: 12,
    edgesType: 'أَحْرُفٌ مُسْتَقِيمَةٌ مُتَسَاوِيَةٌ فِي الطُّولِ',
    edgesTypeEn: '12 Equal straight edges',
    verticesCount: 8,
    rollable: false,
    slideable: true,
    stackable: true,
    linguistics: {
      rule: 'العَدَدُ وَالمَعْدُودُ: سِتَّةُ أَوْجُهٍ (مُؤَنَّثٌ وَمُذَكَّرٌ)',
      ruleEn: 'Word Origin: Derived from Greek "Kybos" (solid square box)',
      explanation: 'نَقُولُ: "سِتَّةُ أَوْجُهٍ" بِتَاءِ التَّأْنِيثِ لِأَنَّ مُفْرَدَ أَوْجُهٍ هُوَ "وَجْهٌ" (مُذَكَّرٌ)، وَالأَعْدَادُ مِنْ 3 إِلَى 9 تُخَالِفُ المَعْدُودَ فِي التَّذْكِيرِ وَالتَّأْنِيثِ!',
      explanationEn: 'The word "Cube" describes a 3-dimensional regular polyhedron with six square faces meeting at right angles.',
      vocalizationNote: 'تُنْطَقُ كَلِمَةُ (مُكَعَّب) بِضَمِّ المِيمِ وَفَتْحِ الكَافِ وَتَشْدِيدِ العَيْنِ المَفْتُوحَةِ: مُ-كَعْ-عَب.',
      vocalizationNoteEn: 'Pronounced as /kjuːb/ with a long "u" sound, rhyming with "tube".',
      pluralForm: 'مُكَعَّبَاتٌ (جَمْعُ مُؤَنَّثٍ سَالِمٌ)',
      pluralFormEn: 'Cubes (regular plural adding -s)'
    },
    realWorldItems: [
      {
        id: 'dice',
        name: 'حَجَرُ النَّرْدِ',
        nameEn: 'Playing Dice',
        emoji: '🎲',
        category: 'أَلْعَابٌ',
        categoryEn: 'Games',
        description: 'حَجَرُ النَّرْدِ مُكَعَّبٌ هَنْدَسِيٌّ كَامِلٌ لَهُ 6 أَوْجُهٍ مُرَبَّعَةٍ مُتَطَابِقَةٍ مَرْقُومَةٍ بِالنِّقَاطِ.',
        descriptionEn: 'Playing dice are perfect geometric cubes with 6 identical numbered square faces.'
      },
      {
        id: 'rubik_cube',
        name: 'مُكَعَّبُ رُوبِيك',
        nameEn: "Rubik's Cube",
        emoji: '🧊',
        category: 'أَلْغَازٌ',
        categoryEn: 'Puzzles',
        description: 'لُغْزٌ شَهِيرٌ ثُلاثِيُّ الأَبْعَادِ يَتَكَوَّنُ مِنْ 6 أَوْجُهٍ مُرَبَّعَةٍ مُلَوَّنَةٍ تَلْتَقِي عِنْدَ 8 رُؤُوسٍ.',
        descriptionEn: "World-famous 3D twisty puzzle made of 6 colorful square faces and 8 corner vertices."
      }
    ],
    riddles: [
      {
        question: 'لَدَيَّ 6 أَوْجُهٍ كُلُّهَا مُرَبَّعَاتٌ مُتَطَابِقَةٌ، وَ8 رُؤُوسٍ، وَ12 حَرْفًا، فَمَنْ أَكُونُ؟',
        questionEn: 'I have 6 identical square faces, 8 corners, and 12 equal edges. What am I?',
        hint: 'تَذَكَّرْ حَجَرَ النَّرْدِ وَمُكَعَّبَ رُوبِيك المُلَوَّنَ!',
        hintEn: 'Think of playing dice or a colorful Rubik puzzle!',
        options: ['المُكَعَّبُ', 'الأُسْطُوَانَةُ', 'الهَرَمُ'],
        optionsEn: ['Cube', 'Cylinder', 'Pyramid'],
        correctAnswer: 'المُكَعَّبُ',
        correctAnswerEn: 'Cube'
      },
      {
        question: 'كَمْ عَدَدُ رُؤُوسِ المُكَعَّبِ؟',
        questionEn: 'How many vertices (corners) does a cube have?',
        hint: 'عُدَّ الزَّوَايَا المُدَبَّبَةَ فِي الأَعْلَى وَالأَسْفَلِ (4 + 4)!',
        hintEn: 'Count the 4 top corners plus 4 bottom corners!',
        options: ['6 رُؤُوسٍ', '8 رُؤُوسٍ', '12 رَأْسًا'],
        optionsEn: ['6 Vertices', '8 Vertices', '12 Vertices'],
        correctAnswer: '8 رُؤُوسٍ',
        correctAnswerEn: '8 Vertices'
      }
    ],
    funFact: 'إِذَا قُمْتَ بِفَتْحِ شَبَكَةِ المُكَعَّبِ، فَسَتَحْصُلُ عَلَى 6 مُرَبَّعَاتٍ مُتَّصِلَةٍ تُشْبِهُ حَرْفَ T أَوْ الصَّلِيبَ!',
    funFactEn: 'When you unfold a cube net, you get 6 connected squares forming a cross or T-shape pattern!',
    difficulty: 'مبتدئ',
    difficultyEn: 'Beginner'
  },
  {
    id: 'cuboid',
    name: 'مُتَوَازِي المُسْتَطِيلَاتِ',
    nameEn: 'Cuboid (Rectangular Prism)',
    tashkeelName: 'مُتَوَازِي المُسْتَطِيلَاتِ',
    englishName: 'Cuboid / Rectangular Prism',
    color: '#10B981', // Emerald
    secondaryColor: '#34D399',
    iconName: 'Package',
    description: 'مُجَسَّمٌ لَهُ 6 أَوْجُهٍ مُسْتَطِيلَةِ الشَّكْلِ (كُلُّ وَجْهَيْنِ مُتَقَابِلَيْنِ مُتَطَابِقَانِ)، وَ8 رُؤُوسٍ، وَ12 حَرْفًا.',
    descriptionEn: 'A 3D solid with 6 rectangular faces (opposite faces are identical), 8 vertices, and 12 edges.',
    facesCount: 6,
    facesType: 'مُسْتَطِيلَةٌ (كُلُّ وَجْهَيْنِ مُتَقَابِلَيْنِ مُتَسَاوِيَانِ)',
    facesTypeEn: '6 Rectangular faces (opposite faces are equal)',
    edgesCount: 12,
    edgesType: 'أَحْرُفٌ مُسْتَقِيمَةٌ غَيْرُ مُتَسَاوِيَةٍ جَمِيعُهَا فِي الطُّولِ',
    edgesTypeEn: '12 Straight edges (in 3 parallel sets)',
    verticesCount: 8,
    rollable: false,
    slideable: true,
    stackable: true,
    linguistics: {
      rule: 'مُتَوَازِي: اسْمُ فَاعِلٍ، وَالمُسْتَطِيلَاتِ: مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالكَسْرَةِ',
      ruleEn: 'Cuboid means "resembling a cube, but stretched with rectangular faces".',
      explanation: 'سُمِّيَ "مُتَوَازِيَ المُسْتَطِيلَاتِ" لِأَنَّ أَوْجُهَهُ مُسْتَطِيلاتٌ مُتَوَازِيَةٌ، كُلُّ وَجْهٍ يُقَابِلُ وَجْهًا مُوَازِيًا لَهُ وَمُطَابِقًا لَهُ.',
      explanationEn: 'Also called a Rectangular Prism because its cross-section forms matching rectangles.',
      vocalizationNote: 'تُنْطَقُ: مُ-تَ-وَا-زِي ال-مُسْ-تَ-طِي-لَاتِ بِكَسْرِ الزَّايِ وَمَدِّ اليَاءِ.',
      vocalizationNoteEn: 'Pronounced as /ˈkjuː.bɔɪd/ with stress on the first syllable.',
      pluralForm: 'مُتَوَازِيَاتُ المُسْتَطِيلَاتِ',
      pluralFormEn: 'Cuboids'
    },
    realWorldItems: [
      {
        id: 'tissue_box',
        name: 'عُلْبَةُ المَنَادِيلِ',
        nameEn: 'Tissue Box',
        emoji: '📦',
        category: 'المَنْزِلُ',
        categoryEn: 'Home',
        description: 'عُلْبَةُ المَنَادِيلِ الوَرَقِيَّةِ مُتَوَازِي مُسْتَطِيلاتٍ كَامِلٌ لَهُ 6 أَوْجُهٍ مُسْتَطِيلَةٍ.',
        descriptionEn: 'Everyday tissue box with 6 flat rectangular faces and 8 corners.'
      },
      {
        id: 'book',
        name: 'الكِتَابُ المَدْرَسِيُّ',
        nameEn: 'School Textbook',
        emoji: '📕',
        category: 'الدِّرَاسَةُ',
        categoryEn: 'School',
        description: 'الكِتَابُ المَدْرَسِيُّ لَهُ طُولٌ وَعَرْضٌ وَسَمَاكَةٌ تُشَكِّلُ مُتَوَازِيَ مُسْتَطِيلاتٍ.',
        descriptionEn: 'Your school textbook with length, width, and thickness forms a rectangular prism.'
      }
    ],
    riddles: [
      {
        question: 'أَنَا مُجَسَّمٌ أُشْبِهُ عُلْبَةَ المَنَادِيلِ، لِي 6 أَوْجُهٍ مُسْتَطِيلَةٍ وَ8 رُؤُوسٍ، فَمَنْ أَكُونُ؟',
        questionEn: 'I look like a tissue box with 6 rectangular faces and 8 corners. What am I?',
        hint: 'كِتَابُكَ المَدْرَسِيُّ أَيْضًا لَهُ نَفْسُ هَذَا الشَّكْلِ الهَنْدَسِيِّ!',
        hintEn: 'Your school textbook also shares this exact 3D geometry!',
        options: ['مُتَوَازِي المُسْتَطِيلَاتِ', 'الكُرَةُ', 'المَخْرُوطُ'],
        optionsEn: ['Cuboid', 'Sphere', 'Cone'],
        correctAnswer: 'مُتَوَازِي المُسْتَطِيلَاتِ',
        correctAnswerEn: 'Cuboid'
      },
      {
        question: 'مَا الشَّكْلُ الهَنْدَسِيُّ لِأَوْجُهِ مُتَوَازِي المُسْتَطِيلَاتِ؟',
        questionEn: 'What is the 2D geometric shape of cuboid faces?',
        hint: 'شَكْلٌ رُبَاعِيٌّ لَهُ أَرْبَعَةُ أَضْلاعٍ مُتَوَازِيَةٍ لَيْسَتْ كُلُّهَا مُتَسَاوِيَةً كَالمُرَبَّعِ!',
        hintEn: 'A 4-sided polygon with parallel opposite sides, unlike a square!',
        options: ['مُسْتَطِيلٌ', 'دَائِرَةٌ', 'مُثَلَّثٌ'],
        optionsEn: ['Rectangle', 'Circle', 'Triangle'],
        correctAnswer: 'مُسْتَطِيلٌ',
        correctAnswerEn: 'Rectangle'
      }
    ],
    funFact: 'المُكَعَّبُ هُوَ حَالَةٌ خَاصَّةٌ مِنْ مُتَوَازِي المُسْتَطِيلَاتِ تَسَاوَتْ فِيهَا جَمِيعُ الأَبْعَادِ!',
    funFactEn: 'A cube is actually a special cuboid where length, width, and height are all equal!',
    difficulty: 'مبتدئ',
    difficultyEn: 'Beginner'
  },
  {
    id: 'sphere',
    name: 'الكُرَةُ',
    nameEn: 'Sphere',
    tashkeelName: 'الكُرَةُ',
    englishName: 'Sphere',
    color: '#EC4899', // Pink
    secondaryColor: '#F472B6',
    iconName: 'Circle',
    description: 'مُجَسَّمٌ كُرَوِيٌّ مَلْسَاءُ مُنْحَنٍ تَمَامًا، لَيْسَ لَهُ أَوْجُهٌ مُسْتَوِيَةٌ، وَلا رُؤُوسٌ، وَلا أَحْرُفٌ (0، 0، 0).',
    descriptionEn: 'A perfectly round, smooth 3D curved surface with 0 flat faces, 0 edges, and 0 vertices.',
    facesCount: 0,
    facesType: 'لَيْسَ لَهَا أَوْجُهٌ مُسْتَوِيَةٌ (سَطْحٌ مُنْحَنٍ وَاحِدٌ مُغْلَقٌ)',
    facesTypeEn: 'No flat faces (Single continuous curved surface)',
    edgesCount: 0,
    edgesType: 'لا تُوجَدُ أَحْرُفٌ مُسْتَقِيمَةٌ (0)',
    edgesTypeEn: 'No straight edges (0)',
    verticesCount: 0,
    rollable: true,
    slideable: false,
    stackable: false,
    linguistics: {
      rule: 'الكُرَةُ: اسْمٌ مُؤَنَّثٌ لَفْظًا وَمَعْنًى، يُجْمَعُ عَلَى كُرَاتٍ',
      ruleEn: 'Sphere comes from ancient Greek "sphaira" meaning globe or ball.',
      explanation: 'الكُرَةُ فِي اللُّغَةِ تَعْنِي الشَّيْءَ المُسْتَدِيرَ، وَسُمِّيَتْ بِذَلِكَ لِاسْتِدَارَتِهَا الكَامِلَةِ مِنْ كُلِّ الجِهَاتِ.',
      explanationEn: 'Every point on a sphere surface is at the exact same distance (radius) from its center.',
      vocalizationNote: 'تُنْطَقُ بِضَمِّ الكَافِ وَفَتْحِ الرَّاءِ: كُ-رَةٌ.',
      vocalizationNoteEn: 'Pronounced as /sfɪər/ with a soft "ph" sounding like "f".',
      pluralForm: 'كُرَاتٌ (جَمْعُ مُؤَنَّثٍ سَالِمٌ) أَوْ كُرُونَ',
      pluralFormEn: 'Spheres'
    },
    realWorldItems: [
      {
        id: 'football',
        name: 'كُرَةُ القَدَمِ',
        nameEn: 'Soccer Ball',
        emoji: '⚽',
        category: 'رِيَاضَةٌ',
        categoryEn: 'Sports',
        description: 'كُرَةُ اللَّعِبِ الجِلْدِيَّةُ مُسْتَدِيرَةٌ تَمَامًا تَتَدَحْرَجُ بِسَلاسَةٍ فِي كُلِّ اتِّجَاهٍ.',
        descriptionEn: 'The sports soccer ball is a perfect sphere that rolls smoothly in all directions.'
      },
      {
        id: 'globe',
        name: 'مُجَسَّمُ الكُرَةِ الأَرْضِيَّةِ',
        nameEn: 'Earth Globe',
        emoji: '🌍',
        category: 'جُغْرَافْيَا',
        categoryEn: 'Geography',
        description: 'مُجَسَّمٌ كُرَوِيٌّ تَعْلِيمِيٌّ يُمَثِّلُ كَوْكَبَ الأَرْضِ بِقَارَّاتِهِ وَمُحِيطَاتِهِ.',
        descriptionEn: 'An educational spherical globe representing planet Earth with its continents and oceans.'
      }
    ],
    riddles: [
      {
        question: 'لَيْسَ لِي أَيُّ وَجْهٍ مُسْتَوٍ، وَلا رَأْسٌ، وَلا حَرْفٌ، وَأَسْتَطِيعُ التَّدَحْرُجَ فِي كُلِّ اتِّجَاهٍ، فَمَنْ أَكُونُ؟',
        questionEn: 'I have 0 flat faces, 0 corners, and 0 edges, and I roll in every direction. What am I?',
        hint: 'فَكِّرْ فِي كُرَةِ القَدَمِ وَكَوْكَبِ الأَرْضِ!',
        hintEn: 'Think of a soccer ball or planet Earth!',
        options: ['الكُرَةُ', 'المُكَعَّبُ', 'المَوْشُورُ'],
        optionsEn: ['Sphere', 'Cube', 'Prism'],
        correctAnswer: 'الكُرَةُ',
        correctAnswerEn: 'Sphere'
      },
      {
        question: 'كَمْ عَدَدُ أَوْجُهِ الكُرَةِ المُسْتَوِيَةِ؟',
        questionEn: 'How many flat faces does a sphere have?',
        hint: 'الكُرَةُ كُلُّهَا سَطْحٌ مُنْحَنٍ وَلا تُوجَدُ أَيَّةُ أَوْجُهٍ مُسْتَوِيَةٍ!',
        hintEn: 'A sphere is entirely curved with no flat surfaces at all!',
        options: ['0 أَوْجُهٍ (صِفْرٌ)', '1 وَجْهٌ', '2 وَجْهَانِ'],
        optionsEn: ['0 Flat faces (Zero)', '1 Face', '2 Faces'],
        correctAnswer: '0 أَوْجُهٍ (صِفْرٌ)',
        correctAnswerEn: '0 Flat faces (Zero)'
      }
    ],
    funFact: 'الكُرَةُ هِيَ المُجَسَّمُ الوَحِيدُ الَّذِي يَتَدَحْرَجُ بِحُرِّيَّةٍ فِي جَمِيعِ الاِتِّجَاهَاتِ بِدُونِ أَيِّ عَائِقٍ!',
    funFactEn: 'The sphere is the only 3D geometric solid that can roll smoothly in every possible direction!',
    difficulty: 'مبتدئ',
    difficultyEn: 'Beginner'
  },
  {
    id: 'cylinder',
    name: 'الأُسْطُوَانَةُ',
    nameEn: 'Cylinder',
    tashkeelName: 'الأُسْطُوَانَةُ',
    englishName: 'Cylinder',
    color: '#8B5CF6', // Purple
    secondaryColor: '#A78BFA',
    iconName: 'Cylinder',
    description: 'مُجَسَّمٌ لَهُ وَجْهَانِ دَائِرِيَّانِ مُتَطَابِقَانِ (قَاعِدَةٌ عُلْيَا وَسُفْلَى)، وَسَطْحٌ جَانِبِيٌّ مُنْحَنٍ، وَحَرْفَانِ دَائِرِيَّانِ، وَلا يَمْلِكُ أَيَّ رَأْسٍ.',
    descriptionEn: 'A 3D solid with 2 identical circular flat bases (top and bottom), 1 curved side surface, 2 curved edges, and 0 vertices.',
    facesCount: 2,
    facesType: 'وَجْهَانِ دَائِرِيَّانِ مُسْتَوِيَانِ + سَطْحٌ مُنْحَنٍ',
    facesTypeEn: '2 Flat circular bases + 1 curved side',
    edgesCount: 2,
    edgesType: 'حَرْفَانِ دَائِرِيَّانِ مُنْحَنِيَانِ',
    edgesTypeEn: '2 Curved circular boundary edges',
    verticesCount: 0,
    rollable: true,
    slideable: true,
    stackable: true,
    linguistics: {
      rule: 'الأُسْطُوَانَةُ: اسْمٌ مُؤَنَّثٌ بَدَأَ بِهَمْزَةِ وَصْلٍ، وَتُكْتَبُ أُسْطُوَانَة',
      ruleEn: 'Cylinder is derived from Greek "kulindros" meaning a roller or tumbler.',
      explanation: 'سُمِّيَتْ أُسْطُوَانَةً لِأَنَّهَا تَدُورُ وَتُدَحْرِجُ كَالأَسَاطِينِ وَالأَعْمِدَةِ المُسْتَدِيرَةِ.',
      explanationEn: 'Its net consists of 2 circles and 1 unrolled rectangle.',
      vocalizationNote: 'تُنْطَقُ بِضَمِّ الهَمْزَةِ وَسُكُونِ السِّينِ: أُسْ-طُ-وَا-نَةٌ.',
      vocalizationNoteEn: 'Pronounced as /ˈsɪl.ɪn.dər/ with a soft "c" sounding like "s".',
      pluralForm: 'أُسْطُوَانَاتٌ أَوْ أَسَاطِينُ',
      pluralFormEn: 'Cylinders'
    },
    realWorldItems: [
      {
        id: 'soda_can',
        name: 'عُلْبَةُ المَشْرُوبِ الأُسْطُوَانِيَّةِ',
        nameEn: 'Cylindrical Beverage Can',
        emoji: '🥤',
        category: 'طَعَامٌ',
        categoryEn: 'Drinks',
        description: 'عُلَبُ المَشْرُوبَاتِ تَتَمَيَّزُ بِقَاعِدَتَيْنِ دَائِرِيَّتَيْنِ مُتَطَابِقَتَيْنِ وَسَطْحٍ جَانِبِيٍّ مَلْسَاءَ.',
        descriptionEn: 'Beverage cans have 2 identical circular flat bases and a smooth curved side.'
      },
      {
        id: 'drum',
        name: 'طَبْلَةُ الإِيقَاعِ',
        nameEn: 'Music Drum',
        emoji: '🥁',
        category: 'مُوسِيقَى',
        categoryEn: 'Music',
        description: 'طَبْلَةُ المُوسِيقَى مُجَسَّمٌ أُسْطُوَانِيٌّ لَهُ سَطْحَانِ دَائِرِيَّانِ مَشْدُودَانِ لِإِصْدَارِ النَّغَمَاتِ.',
        descriptionEn: 'The acoustic musical drum is a classic cylinder with 2 circular membrane heads.'
      }
    ],
    riddles: [
      {
        question: 'لِي قَاعِدَتَانِ دَائِرِيَّتَانِ مُسْتَوِيَتَانِ، وَسَطْحٌ مُنْحَنٍ، وَأَسْتَطِيعُ الاِنْزِلاقَ وَالتَّدَحْرُجَ، فَمَنْ أَكُونُ؟',
        questionEn: 'I have 2 flat circular bases and 1 curved side, and I can both slide and roll. What am I?',
        hint: 'تَذَكَّرْ عُلْبَةَ المَشْرُوبِ الغَازِيِّ أَوْ بَطَّارِيَّةَ اللُّعْبَةِ!',
        hintEn: 'Think of a beverage can or a toy battery!',
        options: ['الأُسْطُوَانَةُ', 'المُكَعَّبُ', 'المَخْرُوطُ'],
        optionsEn: ['Cylinder', 'Cube', 'Cone'],
        correctAnswer: 'الأُسْطُوَانَةُ',
        correctAnswerEn: 'Cylinder'
      },
      {
        question: 'كَمْ عَدَدُ الرُّؤُوسِ فِي الأُسْطُوَانَةِ؟',
        questionEn: 'How many vertices (corners) does a cylinder have?',
        hint: 'الأُسْطُوَانَةُ دَائِرِيَّةُ القَوَاعِدِ وَلا تُوجَدُ بِهَا أَيَّةُ زَوَايَا مُدَبَّبَةٍ!',
        hintEn: 'Cylinders have curved circular boundaries and no pointed corners!',
        options: ['0 رُؤُوسٍ (صِفْرٌ)', '1 رَأْسٌ', '2 رَأْسَانِ'],
        optionsEn: ['0 Vertices (Zero)', '1 Vertex', '2 Vertices'],
        correctAnswer: '0 رُؤُوسٍ (صِفْرٌ)',
        correctAnswerEn: '0 Vertices (Zero)'
      }
    ],
    funFact: 'إِذَا قُمْتَ بِفَتْحِ السَّطْحِ المُنْحَنِي لِلْأُسْطُوَانَةِ، فَسَيَتَحَوَّلُ إِلَى مُسْتَطِيلٍ مُسْتَوٍ تَمَامًا!',
    funFactEn: 'If you unroll the curved side of a cylinder, it magically becomes a flat 2D rectangle!',
    difficulty: 'متوسط',
    difficultyEn: 'Intermediate'
  },
  {
    id: 'cone',
    name: 'المَخْرُوطُ',
    nameEn: 'Cone',
    tashkeelName: 'المَخْرُوطُ',
    englishName: 'Cone',
    color: '#F59E0B', // Amber / Orange
    secondaryColor: '#FBBF24',
    iconName: 'Cone',
    description: 'مُجَسَّمٌ لَهُ قَاعِدَةٌ دَائِرِيَّةٌ وَاحِدَةٌ مُسْتَوِيَةٌ، وَسَطْحٌ جَانِبِيٌّ مُنْحَنٍ يَلْتَقِي عِنْدَ قِمَّةٍ مُدَبَّبَةٍ وَاحِدَةٍ (رَأْسٌ وَاحِدٌ).',
    descriptionEn: 'A 3D solid with 1 flat circular base, 1 curved surface tapering to a pointed apex (1 vertex), and 1 curved edge.',
    facesCount: 1,
    facesType: 'قَاعِدَةٌ دَائِرِيَّةٌ مُسْتَوِيَةٌ وَاحِدَةٌ + سَطْحٌ مُنْحَنٍ',
    facesTypeEn: '1 Flat circular base + 1 curved side tapering to apex',
    edgesCount: 1,
    edgesType: 'حَرْفٌ دَائِرِيٌّ وَاحِدٌ يُحِيطُ بِالقَاعِدَةِ',
    edgesTypeEn: '1 Circular boundary edge',
    verticesCount: 1,
    rollable: true,
    slideable: true,
    stackable: false,
    linguistics: {
      rule: 'المَخْرُوطُ: اسْمُ مَفْعُولٍ مِنْ فِعَلَ "خَرَطَ" الشَّيْءَ أَيْ هَذَّبَهُ مُسْتَدِيقًا',
      ruleEn: 'Cone comes from Greek "konos" meaning pinecone or spinning top.',
      explanation: 'سُمِّيَ "مَخْرُوطًا" لِأَنَّهُ يَخْرُطُ وَيَدِقُّ تَدْرِيجِيًّا كُلَّمَا صَعِدْنَا نَحْوَ القِمَّةِ.',
      explanationEn: 'It has a circular base that narrows smoothly up to a single top vertex.',
      vocalizationNote: 'تُنْطَقُ بِفَتْحِ المِيمِ وَضَمِّ الرَّاءِ: مَخْ-رُوطٌ.',
      vocalizationNoteEn: 'Pronounced as /koʊn/, rhyming with "bone" and "stone".',
      pluralForm: 'مَخَارِيطُ (جَمْعُ تَكْسِيرٍ)',
      pluralFormEn: 'Cones'
    },
    realWorldItems: [
      {
        id: 'traffic_cone',
        name: 'قِمْعُ المُرُورِ المَخْرُوطِيُّ',
        nameEn: 'Traffic Safety Cone',
        emoji: '🚧',
        category: 'سَلامَةٌ',
        categoryEn: 'Safety',
        description: 'أَقْمَاعُ المُرُورِ مَخْرُوطِيَّةُ الشَّكْلِ تَبْدَأُ بِقَاعِدَةٍ دَائِرِيَّةٍ وَتَرْتَفِعُ نَحْوَ قِمَّةٍ مُدَبَّبَةٍ.',
        descriptionEn: 'Orange traffic cones taper from a circular base to a pointed tip for high visibility.'
      },
      {
        id: 'ice_cream_cone',
        name: 'بَسْكُوتَةُ الأَيْسْ كَرِيم',
        nameEn: 'Waffle Ice Cream Cone',
        emoji: '🍦',
        category: 'حَلْوَيَاتٌ',
        categoryEn: 'Desserts',
        description: 'بَسْكُوتَةُ الأَيْسْ كَرِيم المَخْرُوطِيَّةُ المَقْلُوبَةُ تَحْمِلُ كُرَاتِ البُوظَةِ اللَّذِيذَةِ.',
        descriptionEn: 'Crispy waffle cone tapering down to a single point to hold scoops of ice cream.'
      }
    ],
    riddles: [
      {
        question: 'أَنَا أُشْبِهُ قُبَّعَةَ الحَفَلاتِ وَبَسْكُوتَةَ الأَيْسْ كَرِيم، لِي قَاعِدَةٌ دَائِرِيَّةٌ وَرَأْسٌ وَاحِدٌ، فَمَنْ أَكُونُ؟',
        questionEn: 'I look like a party hat and an ice cream cone, with 1 circular base and 1 apex. What am I?',
        hint: 'فَكِّرْ فِي قِمْعِ المُرُورِ البُرْتُقَالِيِّ!',
        hintEn: 'Think of an orange traffic cone or a party hat!',
        options: ['المَخْرُوطُ', 'الأُسْطُوَانَةُ', 'المُكَعَّبُ'],
        optionsEn: ['Cone', 'Cylinder', 'Cube'],
        correctAnswer: 'المَخْرُوطُ',
        correctAnswerEn: 'Cone'
      },
      {
        question: 'كَمْ عَدَدُ الرُّؤُوسِ فِي المَخْرُوطِ؟',
        questionEn: 'How many vertices (corners) does a cone have?',
        hint: 'تَأَمَّلِ القِمَّةَ المُدَبَّبَةَ فِي الأَعْلَى!',
        hintEn: 'Look at the single pointed tip at the top!',
        options: ['رَأْسٌ وَاحِدٌ (1)', '2 رَأْسَانِ', '0 رُؤُوسٍ'],
        optionsEn: ['1 Vertex (Apex)', '2 Vertices', '0 Vertices'],
        correctAnswer: 'رَأْسٌ وَاحِدٌ (1)',
        correctAnswerEn: '1 Vertex (Apex)'
      }
    ],
    funFact: 'المَخْرُوطُ عِنْدَمَا يَتَدَحْرَجُ يَدُورُ فِي دَائِرَةٍ حَوْلَ رَأْسِهِ المُدَبَّبِ بَدَلًا مِنَ التَّدَحْرُجِ فِي خَطٍّ مُسْتَقِيمٍ!',
    funFactEn: 'When a cone rolls, it rolls in a circle around its pointed apex rather than straight ahead!',
    difficulty: 'متوسط',
    difficultyEn: 'Intermediate'
  },
  {
    id: 'square_pyramid',
    name: 'الهَرَمُ الرُّبَاعِيُّ',
    nameEn: 'Square-based Pyramid',
    tashkeelName: 'الهَرَمُ الرُّبَاعِيُّ',
    englishName: 'Square Pyramid',
    color: '#D97706', // Gold / Bronze
    secondaryColor: '#F59E0B',
    iconName: 'Pyramid',
    description: 'مُجَسَّمٌ هَرَمِيٌّ قَاعِدَتُهُ مُرَبَّعَةُ الشَّكْلِ، وَلَهُ 4 أَوْجُهٍ جَانِبِيَّةٍ مُثَلَّثَةٍ تَلْتَقِي فِي القِمَّةِ (المَجْمُوعُ: 5 أَوْجُهٍ، وَ5 رُؤُوسٍ، وَ8 أَحْرُفٍ).',
    descriptionEn: 'A pyramid with 1 flat square base and 4 triangular side faces meeting at the apex (Total: 5 faces, 5 vertices, 8 edges).',
    facesCount: 5,
    facesType: 'قَاعِدَةٌ مُرَبَّعَةٌ + 4 أَوْجُهٍ مُثَلَّثَةٍ جَانِبِيَّةٍ',
    facesTypeEn: '1 Square base + 4 triangular side faces',
    edgesCount: 8,
    edgesType: '4 أَحْرُفٍ لِلْقَاعِدَةِ + 4 أَحْرُفٍ مَائِلَةٍ',
    edgesTypeEn: '4 Base edges + 4 slanted side edges',
    verticesCount: 5,
    rollable: false,
    slideable: true,
    stackable: false,
    linguistics: {
      rule: 'الهَرَمُ: اسْمٌ ثُلاثِيٌّ، وَالرُّبَاعِيُّ: نَعْتٌ لِلْهَرَمِ مَنْسُوبٌ لِلْقَاعِدَةِ المُرَبَّعَةِ',
      ruleEn: 'Pyramid comes from Greek "pyramis", inspired by the ancient wonders of Egypt.',
      explanation: 'سُمِّيَ "هَرَمًا رُبَاعِيًّا" لِأَنَّ قَاعِدَتَهُ مُرَبَّعَةٌ لَهَا أَرْبَعَةُ أَضْلاعٍ مُسْتَوِيَةٍ.',
      explanationEn: 'Square Pyramid specifies that the base polygon is a 4-sided square.',
      vocalizationNote: 'تُنْطَقُ بِفَتْحِ الهَاءِ وَالرَّاءِ: هَ-رَمٌ رُ-بَا-عِيٌّ.',
      vocalizationNoteEn: 'Pronounced as /ˈskwɛər ˈpɪr.ə.mɪd/.',
      pluralForm: 'أَهْرَامَاتٌ أَوْ أَهْرَامٌ',
      pluralFormEn: 'Square Pyramids'
    },
    realWorldItems: [
      {
        id: 'giza_pyramid',
        name: 'أَهْرَامَاتُ الجِيزَةِ',
        nameEn: 'Great Pyramid of Giza',
        emoji: '🏛️',
        category: 'آثَارٌ',
        categoryEn: 'Monuments',
        description: 'بِنَاءٌ أَمْلَسُ عِمْلاقٌ لَهُ قَاعِدَةٌ مُرَبَّعَةٌ ضَخْمَةٌ وَأَرْبَعَةُ أَوْجُهٍ مُثَلَّثَةٍ مَائِلَةٍ تَلْتَقِي فِي القِمَّةِ.',
        descriptionEn: 'Monumental ancient structure with a massive square base and 4 sloping triangular faces meeting at the apex.'
      },
      {
        id: 'camping_tent',
        name: 'خَيْمَةُ التَّخْيِيمِ الهَرَمِيَّةُ',
        nameEn: 'Pyramid Camping Tent',
        emoji: '⛺',
        category: 'مُغَامَرَاتٌ',
        categoryEn: 'Outdoor',
        description: 'خَيْمَةُ التَّخْيِيمِ تَرْتَكِزُ عَلَى أَرْضِيَّةٍ مُرَبَّعَةٍ وَتَمْتَدُّ جَوَانِبُهَا المُثَلَّثَةُ نَحْوَ قِمَّةِ الخَيْمَةِ.',
        descriptionEn: 'A camping tent set on a square base with 4 triangular fabric sides converging at the peak.'
      }
    ],
    riddles: [
      {
        question: 'أَنَا مُجَسَّمٌ قَاعِدَتِي مُرَبَّعَةٌ وَلِي 4 أَوْجُهٍ مُثَلَّثَةٍ تَلْتَقِي فِي القِمَّةِ، فَمَنْ أَكُونُ؟',
        questionEn: 'My base is a square and I have 4 triangular side faces meeting at an apex. What am I?',
        hint: 'أَشْهَرُ مَعَالِمِ الآثَارِ الخَالِدَةِ فِي مِصْرَ الحَبِيبَةِ!',
        hintEn: 'The famous ancient architectural monument in Egypt!',
        options: ['الهَرَمُ الرُّبَاعِيُّ', 'المَوْشُورُ الثُّلاثِيُّ', 'المُكَعَّبُ'],
        optionsEn: ['Square Pyramid', 'Triangular Prism', 'Cube'],
        correctAnswer: 'الهَرَمُ الرُّبَاعِيُّ',
        correctAnswerEn: 'Square Pyramid'
      },
      {
        question: 'كَمْ عَدَدُ الأَوْجُهِ الإِجْمَالِيِّ فِي الهَرَمِ الرُّبَاعِيِّ؟',
        questionEn: 'What is the total number of faces on a square pyramid?',
        hint: 'قَاعِدَةٌ مُرَبَّعَةٌ وَاحِدَةٌ + 4 أَوْجُهٍ مُثَلَّثَةٍ جَانِبِيَّةٍ!',
        hintEn: '1 Square base + 4 triangular sides!',
        options: ['5 أَوْجُهٍ', '4 أَوْجُهٍ', '6 أَوْجُهٍ'],
        optionsEn: ['5 Faces', '4 Faces', '6 Faces'],
        correctAnswer: '5 أَوْجُهٍ',
        correctAnswerEn: '5 Faces'
      }
    ],
    funFact: 'قَوَاعِدُ أَهْرَامَاتِ الجِيزَةِ تَتَّجِهُ بِدِقَّةٍ مُذْهِلَةٍ نَحْوَ الجِهَاتِ الأَصْلِيَّةِ الأَرْبَعِ (الشَّمَال، الجَنُوب، الشَّرْق، الغَرْب)!',
    funFactEn: 'The bases of the Great Pyramids of Giza align with incredible astronomical precision to true North, South, East, and West!',
    difficulty: 'متقدم',
    difficultyEn: 'Advanced'
  },
  {
    id: 'triangular_prism',
    name: 'المَوْشُورُ الثُّلاثِيُّ',
    nameEn: 'Triangular Prism',
    tashkeelName: 'المَوْشُورُ الثُّلاثِيُّ',
    englishName: 'Triangular Prism',
    color: '#06B6D4', // Cyan
    secondaryColor: '#22D3EE',
    iconName: 'Prism',
    description: 'مُجَسَّمٌ لَهُ قَاعِدَتَانِ مُثَلَّثَتَانِ مُتَطَابِقَتَانِ، وَ3 أَوْجُهٍ جَانِبِيَّةٍ مُسْتَطِيلَةٍ (المَجْمُوعُ: 5 أَوْجُهٍ، وَ6 رُؤُوسٍ، وَ9 أَحْرُفٍ).',
    descriptionEn: 'A 3D polyhedron with 2 identical triangular bases and 3 rectangular side faces (Total: 5 faces, 6 vertices, 9 edges).',
    facesCount: 5,
    facesType: 'قَاعِدَتَانِ مُثَلَّثَتَانِ + 3 أَوْجُهٍ مُسْتَطِيلَةٍ جَانِبِيَّةٍ',
    facesTypeEn: '2 Triangular bases + 3 rectangular side faces',
    edgesCount: 9,
    edgesType: '6 أَحْرُفٍ لِلْمُثَلَّثَيْنِ + 3 أَحْرُفٍ جَانِبِيَّةٍ مُتَوَازِيَةٍ',
    edgesTypeEn: '6 Base edges + 3 connecting parallel edges',
    verticesCount: 6,
    rollable: false,
    slideable: true,
    stackable: true,
    linguistics: {
      rule: 'المَوْشُورُ: اسْمُ مَفْعُولٍ، وَالثُّلاثِيُّ: نِسْبَةٌ إِلَى الثَّلاثَةِ',
      ruleEn: 'Prism comes from Greek "prisma" meaning something sawed or cut out.',
      explanation: 'سُمِّيَ "مَوْشُورًا ثُلاثِيًّا" لِأَنَّ مَقْطَعَهُ العَرْضِيَّ يُعْطِي صُورَةَ مُثَلَّثٍ مُتَطَابِقٍ.',
      explanationEn: 'Triangular prism indicates a prism with 3-sided triangle bases.',
      vocalizationNote: 'تُنْطَقُ بِفَتْحِ المِيمِ وَسُكُونِ الوَاوِ: مَوْ-شُورُ ثُ-لا-ثِيُّ.',
      vocalizationNoteEn: 'Pronounced as /traɪˈæŋ.ɡjə.lər ˈprɪz.əm/.',
      pluralForm: 'مَوَاشِيرُ (جَمْعُ تَكْسِيرٍ)',
      pluralFormEn: 'Triangular Prisms'
    },
    realWorldItems: [
      {
        id: 'toblerone',
        name: 'شُوكُولاتَةُ تُوبْلِرُون المُثَلَّثَةُ',
        nameEn: 'Toblerone Chocolate Box',
        emoji: '🍫',
        category: 'حَلْوَيَاتٌ',
        categoryEn: 'Snacks',
        description: 'عُلْبَةُ شُوكُولاتَةِ تُوبْلِرُون تُعَدُّ مَوْشُورًا ثُلاثِيًّا نَمُوذَجِيًّا لَهُ قَاعِدَتَانِ مُثَلَّثَتَانِ وَ3 أَوْجُهٍ مُسْتَطِيلَةٍ.',
        descriptionEn: 'The famous Toblerone packaging is a textbook triangular prism with 2 triangular ends and 3 rectangular faces.'
      },
      {
        id: 'pitched_roof',
        name: 'سَقْفُ المَنْزِلِ الجَمَلُونِيُّ',
        nameEn: 'Pitched Gable Roof',
        emoji: '🏠',
        category: 'مِعْمَارٌ',
        categoryEn: 'Architecture',
        description: 'أَسْقُفُ المَنَازِلِ الجَمَلُونِيَّةِ تَتَّخِذُ هَيْكَلَ مَوْشُورٍ ثُلاثِيٍّ مُنْحَدِرٍ لِتَصْرِيفِ مِيَاهِ الأَمْطَارِ.',
        descriptionEn: 'Gable house roofs form a sturdy triangular prism structure designed to shed rain and snow.'
      }
    ],
    riddles: [
      {
        question: 'أَنَا أُشْبِهُ عُلْبَةَ شُوكُولاتَةِ تُوبْلِرُون، لِي قَاعِدَتَانِ مُثَلَّثَتَانِ وَ3 أَوْجُهٍ مُسْتَطِيلَةٍ، فَمَنْ أَكُونُ؟',
        questionEn: 'I look like a Toblerone chocolate box with 2 triangular ends and 3 rectangular sides. What am I?',
        hint: 'القِطْعَةُ الزُّجَاجِيَّةُ الَّتِي تُحَلِّلُ الضَّوْءَ إِلَى أَلْوَانِ قَوْسِ قُزَحَ!',
        hintEn: 'The glass scientific tool that splits light into rainbow colors!',
        options: ['المَوْشُورُ الثُّلاثِيُّ', 'الأُسْطُوَانَةُ', 'الهَرَمُ'],
        optionsEn: ['Triangular Prism', 'Cylinder', 'Pyramid'],
        correctAnswer: 'المَوْشُورُ الثُّلاثِيُّ',
        correctAnswerEn: 'Triangular Prism'
      },
      {
        question: 'كَمْ عَدَدُ رُؤُوسِ المَوْشُورِ الثُّلاثِيِّ؟',
        questionEn: 'How many vertices does a triangular prism have?',
        hint: '3 رُؤُوسٍ فِي المُثَلَّثِ الأَمَامِيِّ + 3 رُؤُوسٍ فِي المُثَلَّثِ الخَلْفِيِّ!',
        hintEn: '3 Vertices on front triangle + 3 on back triangle!',
        options: ['6 رُؤُوسٍ', '5 رُؤُوسٍ', '8 رُؤُوسٍ'],
        optionsEn: ['6 Vertices', '5 Vertices', '8 Vertices'],
        correctAnswer: '6 رُؤُوسٍ',
        correctAnswerEn: '6 Vertices'
      }
    ],
    funFact: 'العَالِمُ إِسْحَاق نِيُوتِن اسْتَخْدَمَ المَوْشُورَ الثُّلاثِيَّ الزُّجَاجِيَّ لِاكْتِشَافِ أَنَّ الضَّوْءَ الأَبْيَضَ يَتَكَوَّنُ مِنْ أَلْوَانِ الطَّيْفِ السَّبْعَةِ!',
    funFactEn: 'Sir Isaac Newton used a triangular glass prism to discover that white sunlight is composed of the 7 rainbow spectrum colors!',
    difficulty: 'متقدم',
    difficultyEn: 'Advanced'
  },
  {
    id: 'triangular_pyramid',
    name: 'الهَرَمُ الثُّلاثِيُّ',
    nameEn: 'Triangular Pyramid (Tetrahedron)',
    tashkeelName: 'الهَرَمُ الثُّلاثِيُّ',
    englishName: 'Triangular Pyramid (Tetrahedron)',
    color: '#F97316', // Bright Orange
    secondaryColor: '#FB923C',
    iconName: 'Pyramid',
    description: 'مُجَسَّمٌ هَرَمِيٌّ جَمِيعُ أَوْجُهِهِ الأَرْبَعَةِ مُثَلَّثَاتٌ مُسْتَوِيَةٌ (قَاعِدَةٌ مُثَلَّثَةٌ + 3 أَوْجُهٍ جَانِبِيَّةٍ)، لَهُ 4 أَوْجُهٍ، وَ4 رُؤُوسٍ، وَ6 أَحْرُفٍ.',
    descriptionEn: 'A 3D solid where all 4 faces are flat triangles (1 triangular base + 3 triangular sides). It has 4 faces, 4 vertices, and 6 edges.',
    facesCount: 4,
    facesType: '4 أَوْجُهٍ مُثَلَّثَةِ الشَّكْلِ جَمِيعُهَا',
    facesTypeEn: '4 Flat triangular faces',
    edgesCount: 6,
    edgesType: '3 أَحْرُفٍ لِلْقَاعِدَةِ + 3 أَحْرُفٍ مَائِلَةٍ',
    edgesTypeEn: '3 Base edges + 3 slanted side edges',
    verticesCount: 4,
    rollable: false,
    slideable: true,
    stackable: false,
    linguistics: {
      rule: 'رُبَاعِيُّ السُّطُوحِ (تِتْرَاهِيدْرُون): مُرَكَّبٌ إِضَافِيٌّ',
      ruleEn: 'Tetrahedron: Greek "tetra" (four) + "hedra" (seat/face), meaning 4-faced solid.',
      explanation: 'سُمِّيَ "هَرَمًا ثُلاثِيًّا" لِأَنَّ قَاعِدَتَهُ مُثَلَّثَةٌ، وَيُسَمَّى فِي الهَنْدَسَةِ الرَّسْمِيَّةِ بِـ (رُبَاعِيِّ السُّطُوحِ).',
      explanationEn: 'The simplest possible 3D polyhedron that can exist in space.',
      vocalizationNote: 'تُنْطَقُ: هَ-رَمٌ ثُ-لا-ثِيٌّ.',
      vocalizationNoteEn: 'Pronounced as /ˌtet.rəˈhiː.drən/.',
      pluralForm: 'أَهْرَامَاتٌ ثُلاثِيَّةٌ',
      pluralFormEn: 'Triangular Pyramids / Tetrahedra'
    },
    realWorldItems: [
      {
        id: 'dice_d4',
        name: 'نَرْدُ الأَلْعَابِ الرُّبَاعِيُّ (D4)',
        nameEn: '4-Sided Tetrahedron Gaming Die',
        emoji: '🎲',
        category: 'أَلْعَابٌ',
        categoryEn: 'Games',
        description: 'حَجَرُ نَرْدٍ هَنْدَسِيٌّ ثُلاثِيُّ الأَبْعَادِ لَهُ 4 أَوْجُهٍ مُثَلَّثَةٍ مُتَطَابِقَةٍ (رُبَاعِيُّ السُّطُوحِ).',
        descriptionEn: 'Special 4-sided gaming die with 4 equilateral triangular faces forming a regular tetrahedron.'
      },
      {
        id: 'tetra_pack',
        name: 'عُبْوَةُ الشَّرَابِ الهَرَمِيَّةُ (تِتْرَا بَاك)',
        nameEn: 'Tetra Classic Drink Pack',
        emoji: '🥛',
        category: 'طَعَامٌ',
        categoryEn: 'Drinks',
        description: 'عُبْوَةُ الشَّرَابِ الهَرَمِيَّةُ الكِلاسِيكِيَّةُ تَتَّخِذُ شَكْلَ هَرَمٍ ثُلاثِيٍّ رُبَاعِيِّ السُّطُوحِ.',
        descriptionEn: 'The iconic classic Tetra beverage package shaped as a 4-faced triangular tetrahedron.'
      }
    ],
    riddles: [
      {
        question: 'لَدَيَّ 4 أَوْجُهٍ كُلُّهَا مُثَلَّثَاتٌ، وَ4 رُؤُوسٍ، وَ6 أَحْرُفٍ، فَمَنْ أَكُونُ؟',
        questionEn: 'I have 4 triangular faces, 4 vertices, and 6 edges. What am I?',
        hint: 'أَبْسَطُ مُجَسَّمٍ هَنْدَسِيٍّ فِي الفَضَاءِ ثُلاثِيِّ الأَبْعَادِ!',
        hintEn: 'The simplest 3D polyhedron in geometry, with 4 triangular sides!',
        options: ['الهَرَمُ الثُّلاثِيُّ', 'المُكَعَّبُ', 'الأُسْطُوَانَةُ'],
        optionsEn: ['Triangular Pyramid', 'Cube', 'Cylinder'],
        correctAnswer: 'الهَرَمُ الثُّلاثِيُّ',
        correctAnswerEn: 'Triangular Pyramid'
      },
      {
        question: 'كَمْ عَدَدُ رُؤُوسِ الهَرَمِ الثُّلاثِيِّ؟',
        questionEn: 'How many vertices does a triangular pyramid have?',
        hint: '3 رُؤُوسٍ فِي القَاعِدَةِ المُثَلَّثَةِ + رَأْسُ القِمَّةِ (3 + 1)!',
        hintEn: '3 Base vertices + 1 top apex vertex!',
        options: ['4 رُؤُوسٍ', '5 رُؤُوسٍ', '6 رُؤُوسٍ'],
        optionsEn: ['4 Vertices', '5 Vertices', '6 Vertices'],
        correctAnswer: '4 رُؤُوسٍ',
        correctAnswerEn: '4 Vertices'
      }
    ],
    funFact: 'الهَرَمُ الثُّلاثِيُّ هُوَ أَبْسَطُ مُجَسَّمٍ ثُلاثِيِّ الأَبْعَادِ يُمْكِنُ بِنَاؤُهُ فِي الكَوْنِ، وَذَرَّاتُ المَاسِ تَتَرَابَطُ بِهَذَا الشَّكْلِ الفَرِيدِ لِتُصْبِحَ الأَصْلَبَ فِي الطَّبِيعَةِ!',
    funFactEn: 'Diamond carbon atoms bond in a triangular pyramid (tetrahedral) network, making diamond the hardest natural material known to science!',
    difficulty: 'متقدم',
    difficultyEn: 'Advanced'
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: 'first_shape',
    title: 'مُسْتَكْشِفُ الهَنْدَسَةِ الأَوَّلُ',
    titleEn: 'First Step Explorer',
    description: 'أَتْمَمْتَ اسْتِكْشَافَ أَوَّلِ مُجَسَّمٍ هَنْدَسِيٍّ بِكُلِّ تَفَاصِيلِهِ!',
    descriptionEn: 'You fully explored your very first 3D shape!',
    icon: '🌟',
    requirement: 'اِسْتَكْشِفْ مُجَسَّمًا وَاحِدًا',
    requirementEn: 'Explore 1 shape',
    category: 'explorer'
  },
  {
    id: 'faces_counter',
    title: 'عَبْقَرِيُّ عَدِّ الأَوْجُهِ',
    titleEn: 'Face Master',
    description: 'قُمْتَ بِعَدِّ جَمِيعِ أَوْجُهِ المُجَسَّمَاتِ بِدِقَّةٍ وَلَمْسٍ صَحِيحٍ.',
    descriptionEn: 'Accurately highlighted and counted all faces on 3D models.',
    icon: '🟦',
    requirement: 'عُدَّ أَوْجُهَ 3 مُجَسَّمَاتٍ',
    requirementEn: 'Count faces on 3 shapes',
    category: 'mastery'
  },
  {
    id: 'edges_vertices',
    title: 'مُهَنْدِسُ الأَحْرُفِ وَالرُّؤُوسِ',
    titleEn: 'Edge & Vertex Pro',
    description: 'أَتْقَنْتَ عَدَّ الأَضْلاعِ وَالزَّوَايَا لِلْمُجَسَّمَاتِ المُعَقَّدَةِ.',
    descriptionEn: 'Mastered counting sides and pointed vertices on solids.',
    icon: '📐',
    requirement: 'عُدَّ أَحْرُفَ وَرُؤُوسَ 3 مُجَسَّمَاتٍ',
    requirementEn: 'Count edges and vertices on 3 shapes',
    category: 'mastery'
  },
  {
    id: 'sorter_champion',
    title: 'بَطَلُ فَرْزِ الوَاقِعِ',
    titleEn: 'Sorting Champion',
    description: 'قُمْتَ بِفَرْزِ وَتَصْنِيفِ 10 عَنَاصِرَ مِنْ حَيَاتِنَا اليَوْمِيَّةِ فِي سِلالِهَا الصَّحِيحَةِ.',
    descriptionEn: 'Classified 10 everyday items into their matching 3D geometry baskets.',
    icon: '🎯',
    requirement: 'اِفْرِزْ 10 عَنَاصِرَ',
    requirementEn: 'Sort 10 real-world items',
    category: 'games'
  },
  {
    id: 'riddle_solver',
    title: 'فَيْلَسُوفُ الفَوَازِيرِ',
    titleEn: 'Riddle Mastermind',
    description: 'حَلَلْتَ فَوَازِيرَ المُجَسَّمَاتِ بِذَكَاءِ دُونَ الحَاجَةِ لِتَلْمِيحَاتٍ كَثِيرَةٍ.',
    descriptionEn: 'Solved geometric riddles with high accuracy.',
    icon: '💡',
    requirement: 'أَجِبْ عَنْ 5 فَوَازِيرَ صَحِيحَةٍ',
    requirementEn: 'Answer 5 riddles correctly',
    category: 'games'
  },
  {
    id: 'eloquent_speaker',
    title: 'فَصِيحُ اللِّسَانِ',
    titleEn: 'Eloquent Orator',
    description: 'نَطَقْتَ أَسْمَاءَ المُجَسَّمَاتِ بِصَوْتٍ وَاضِحٍ وَمَخَارِجِ حُرُوفٍ صَحِيحَةٍ.',
    descriptionEn: 'Pronounced geometric shape names clearly with correct phonetics.',
    icon: '🗣️',
    requirement: 'انْطِقْ 3 أَسْمَاءٍ بِنَجَاحٍ',
    requirementEn: 'Pronounce 3 shape names correctly',
    category: 'speech'
  },
  {
    id: 'geometry_grandmaster',
    title: 'العَالِمُ الصَّغِيرُ لِلْمُجَسَّمَاتِ',
    titleEn: '3D Geometry Grandmaster',
    description: 'أَتْمَمْتَ اسْتِكْشَافَ كُلِّ المُجَسَّمَاتِ الثَّمَانِيَةِ وَحَصَلْتَ عَلَى الشَّهَادَةِ الكُبْرَى!',
    descriptionEn: 'Explored all 8 shapes, earned maximum stars, and completed the course!',
    icon: '👑',
    requirement: 'اِسْتَكْشِفْ جَمِيعَ المُجَسَّمَاتِ (8/8)',
    requirementEn: 'Explore all 8 shapes',
    category: 'mastery'
  }
];

export const BADGES: Badge[] = BADGES_DATA;
