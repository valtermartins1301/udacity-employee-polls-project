import type { RootState } from '@/app/store';

export interface LeaderboardRow {
  id: string;
  name: string;
  avatarURL: string;
  answered: number;
  created: number;
  score: number;
}

export function selectLeaderboardRows(state: RootState): LeaderboardRow[] {
  return Object.values(state.users.entities)
    .map((user) => {
      const answered = Object.keys(user.answers).length;
      const created = user.questions.length;
      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answered,
        created,
        score: answered + created,
      };
    })
    .sort((a, b) => b.score - a.score);
}
