import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OptionKey, User, UsersState } from '@/types';

const initialState: UsersState = {
  entities: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Record<string, User>>) {
      state.entities = action.payload;
    },
    addUserQuestion(state, action: PayloadAction<{ userId: string; questionId: string }>) {
      const { userId, questionId } = action.payload;
      const user = state.entities[userId];
      if (!user) return;
      user.questions.push(questionId);
    },
    addUserAnswer(state, action: PayloadAction<{ userId: string; qid: string; answer: OptionKey }>) {
      const { userId, qid, answer } = action.payload;
      const user = state.entities[userId];
      if (!user) return;
      user.answers[qid] = answer;
    },
  },
});

export const { setUsers, addUserQuestion, addUserAnswer } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
