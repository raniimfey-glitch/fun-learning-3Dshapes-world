import { StudentProgress, ShapeId } from '../types';

const STORAGE_KEY = 'solids_world_student_progress_v1';

export const DEFAULT_PROGRESS: StudentProgress = {
  studentName: 'بطل الهندسة الصغير',
  avatar: '🦁',
  stars: 10,
  gems: 2,
  completedShapes: {
    cube: false,
    cuboid: false,
    sphere: false,
    cylinder: false,
    cone: false,
    square_pyramid: false,
    triangular_prism: false,
    triangular_pyramid: false
  },
  shapeMastery: {
    cube: 0,
    cuboid: 0,
    sphere: 0,
    cylinder: 0,
    cone: 0,
    square_pyramid: 0,
    triangular_prism: 0,
    triangular_pyramid: 0
  },
  unlockedBadges: ['first_solid'],
  quizScores: [],
  voiceRecognizedCount: 0,
  totalTimeSeconds: 60,
  itemsSortedCount: 0
};

export function loadProgress(): StudentProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to local storage', e);
  }
}

export function addStarsAndGems(
  current: StudentProgress,
  starsToAdd: number,
  gemsToAdd: number = 0
): StudentProgress {
  const updated = {
    ...current,
    stars: current.stars + starsToAdd,
    gems: current.gems + gemsToAdd
  };
  saveProgress(updated);
  return updated;
}

export function markShapeExplored(
  current: StudentProgress,
  shapeId: ShapeId,
  masteryIncrement: number = 20
): { updated: StudentProgress; newBadge?: string } {
  const currentMastery = current.shapeMastery[shapeId] || 0;
  const newMastery = Math.min(100, currentMastery + masteryIncrement);
  const completedShapes = {
    ...current.completedShapes,
    [shapeId]: true
  };
  const shapeMastery = {
    ...current.shapeMastery,
    [shapeId]: newMastery
  };

  const unlockedBadges = [...current.unlockedBadges];
  let newBadge: string | undefined;

  // Check if all shapes explored
  const allExplored = Object.values(completedShapes).every(Boolean);
  if (allExplored && !unlockedBadges.includes('geometry_legend')) {
    unlockedBadges.push('geometry_legend');
    newBadge = 'geometry_legend';
  }

  const updated: StudentProgress = {
    ...current,
    completedShapes,
    shapeMastery,
    unlockedBadges
  };

  saveProgress(updated);
  return { updated, newBadge };
}
