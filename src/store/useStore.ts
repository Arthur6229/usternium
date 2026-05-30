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
  // date-stamped: topicId → ISO date it was last marked learned
  learnedDates: Partial<Record<TopicId, string>>;
  totalLearned: number;

  saveProfile: (p: UserProfile) => void;
  markLearned: (topicId: TopicId) => void;
  checkStreak: () => void;
  reset: () => void;
  // derived helper – returns which topics were learned on a given date
  learnedOn: (date: string) => TopicId[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      streak: 0,
      lastVisit: null,
      learnedDates: {},
      totalLearned: 0,

      saveProfile: (profile) => set({ profile }),

      markLearned: (topicId) =>
        set((s) => {
          const today = new Date().toISOString().split('T')[0];
          const alreadyToday = s.learnedDates[topicId] === today;
          return {
            learnedDates: { ...s.learnedDates, [topicId]: today },
            totalLearned: alreadyToday ? s.totalLearned : s.totalLearned + 1,
          };
        }),

      checkStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastVisit, streak } = get();
        if (lastVisit === today) return;

        const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
        const newStreak = lastVisit === yesterday ? streak + 1 : 1;
        set({ lastVisit: today, streak: newStreak });
      },

      learnedOn: (date: string) => {
        const { learnedDates } = get();
        return (Object.keys(learnedDates) as TopicId[]).filter(
          (t) => learnedDates[t] === date,
        );
      },

      reset: () =>
        set({ profile: null, streak: 0, lastVisit: null, learnedDates: {}, totalLearned: 0 }),
    }),
    { name: 'usternium-store' }
  )
);
