import type { RootState } from '@/app/store';

function sortByTimestamp(ids: string[], state: RootState): string[] {
  return [...ids].sort(
    (a, b) => state.questions.entities[b].timestamp - state.questions.entities[a].timestamp,
  );
}

export function selectUnansweredQuestionIdsByRecency(state: RootState, authedUserId: string): string[] {
  const ids = Object.keys(state.questions.entities).filter(
    (id) => !state.users.entities[authedUserId]?.answers[id],
  );
  return sortByTimestamp(ids, state);
}

export function selectAnsweredQuestionIdsByRecency(state: RootState, authedUserId: string): string[] {
  const ids = Object.keys(state.questions.entities).filter(
    (id) => Boolean(state.users.entities[authedUserId]?.answers[id]),
  );
  return sortByTimestamp(ids, state);
}

export function selectQuestionById(state: RootState, id: string) {
  return state.questions.entities[id] ?? null;
}

export function selectHasUserAnswered(state: RootState, qid: string, authedUserId: string): boolean {
  return Boolean(state.users.entities[authedUserId]?.answers[qid]);
}
