import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OptionKey, Question, QuestionsState } from '@/types';

const initialState: QuestionsState = {
  entities: {},
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Record<string, Question>>) {
      state.entities = action.payload;
    },
    addQuestion(state, action: PayloadAction<Question>) {
      state.entities[action.payload.id] = action.payload;
    },
    addQuestionVote(state, action: PayloadAction<{ qid: string; userId: string; answer: OptionKey }>) {
      const { qid, userId, answer } = action.payload;
      const question = state.entities[qid];
      if (!question) return;
      const option = question[answer];
      if (!option.votes.includes(userId)) {
        option.votes.push(userId);
      }
    },
  },
});

export const { setQuestions, addQuestion, addQuestionVote } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
