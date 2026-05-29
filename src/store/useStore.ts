import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TopicId } from '../data/content';

interface UserProfile {
  name: string;
  email: string;
  topics: TopicId[];
}

interface AppState {
  profile: UserProfile | null;
  streak: number;
  lastVisit: string | null;
  learnedToday: TopicId[];
  totalLearned: number;

  saveProfile: (p: UserProfile) => void;
  markLearned: (topicId: TopicId) => void;
  checkStreak: () => void;
  reset: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      streak: 0,
      lastVisit: null,
      learnedToday: [],
      totalLearned: 0,

      saveProfile: (profile) => set({ profile }),

      markLearned: (topicId) =>
        set((s) => {
          const already = s.learnedToday.includes(topicId);
          return {
            learnedToday: already ? s.learnedToday : [...s.learnedToday, topicId],
            totalLearned: already ? s.totalLearned : s.totalLearned + 1,
          };
        }),

      checkStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastVisit, streak } = get();
        if (lastVisit === today) return;

        const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
        const newStreak = lastVisit === yesterday ? streak + 1 : 1;
        set({ lastVisit: today, streak: newStreak, learnedToday: [] });
      },

      reset: () => set({ profile: null, streak: 0, lastVisit: null, learnedToday: [], totalLearned: 0 }),
    }),
    { name: 'usternium-store' }
  )
);
