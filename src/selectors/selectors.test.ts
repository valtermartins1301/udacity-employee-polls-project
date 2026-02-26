import { selectLeaderboardRows } from '@/selectors/leaderboardSelectors';
import { selectUnansweredQuestionIdsByRecency } from '@/selectors/questionsSelectors';
import type { RootState } from '@/app/store';

const state = {
  auth: {
    authedUserId: 'u1',
    redirectAfterLogin: null,
    status: 'idle',
    error: null,
  },
  users: {
    entities: {
      u1: {
        id: 'u1',
        password: 'x',
        name: 'User One',
        avatarURL: '/a.svg',
        answers: { q1: 'optionOne' },
        questions: ['q2'],
      },
      u2: {
        id: 'u2',
        password: 'x',
        name: 'User Two',
        avatarURL: '/b.svg',
        answers: { q2: 'optionTwo', q3: 'optionOne' },
        questions: ['q1', 'q3'],
      },
    },
  },
  questions: {
    entities: {
      q1: {
        id: 'q1',
        author: 'u2',
        timestamp: 10,
        optionOne: { votes: [], text: '1' },
        optionTwo: { votes: [], text: '2' },
      },
      q2: {
        id: 'q2',
        author: 'u1',
        timestamp: 30,
        optionOne: { votes: [], text: '1' },
        optionTwo: { votes: [], text: '2' },
      },
      q3: {
        id: 'q3',
        author: 'u2',
        timestamp: 20,
        optionOne: { votes: [], text: '1' },
        optionTwo: { votes: [], text: '2' },
      },
    },
  },
  app: {
    loading: false,
    initialized: true,
    error: null,
  },
} as RootState;

describe('selectors', () => {
  it('returns unanswered questions sorted by recency', () => {
    expect(selectUnansweredQuestionIdsByRecency(state, 'u1')).toEqual(['q2', 'q3']);
  });

  it('sorts leaderboard by score descending', () => {
    const rows = selectLeaderboardRows(state);
    expect(rows[0].id).toBe('u2');
    expect(rows[1].id).toBe('u1');
  });
});
