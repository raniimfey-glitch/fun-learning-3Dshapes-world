export type Language = 'ar' | 'en';

export type ShapeId =
  | 'cube'
  | 'cuboid'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'square_pyramid'
  | 'triangular_prism'
  | 'triangular_pyramid';

export interface RealWorldItem {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
}

export interface ShapeData {
  id: ShapeId;
  name: string;
  nameEn: string;
  tashkeelName: string;
  englishName: string;
  color: string;
  secondaryColor: string;
  iconName: string;
  description: string;
  descriptionEn: string;
  facesCount: number;
  facesType: string;
  facesTypeEn: string;
  edgesCount: number;
  edgesType: string;
  edgesTypeEn: string;
  verticesCount: number;
  rollable: boolean;
  slideable: boolean;
  stackable: boolean;
  linguistics: {
    rule: string;
    ruleEn: string;
    explanation: string;
    explanationEn: string;
    vocalizationNote: string;
    vocalizationNoteEn: string;
    pluralForm: string;
    pluralFormEn: string;
  };
  realWorldItems: RealWorldItem[];
  riddles: {
    question: string;
    questionEn: string;
    hint: string;
    hintEn: string;
    options: string[];
    optionsEn: string[];
    correctAnswer: string;
    correctAnswerEn: string;
  }[];
  funFact: string;
  funFactEn: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  difficultyEn: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface StudentProgress {
  studentName: string;
  avatar: string;
  stars: number;
  gems: number;
  completedShapes: Record<ShapeId, boolean>;
  shapeMastery: Record<ShapeId, number>; // 0 to 100
  unlockedBadges: string[];
  quizScores: {
    date: string;
    mode: string;
    score: number;
    total: number;
  }[];
  voiceRecognizedCount: number;
  totalTimeSeconds: number;
  itemsSortedCount: number;
}

export interface Badge {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  requirement: string;
  requirementEn: string;
  category: 'mastery' | 'games' | 'speech' | 'explorer';
}

