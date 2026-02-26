import { createAsyncThunk } from '@reduxjs/toolkit';
import { createQuestion, submitAnswer } from '@/api/questions';
import { addQuestion, addQuestionVote } from '@/features/questions/questionsSlice';
import { addUserAnswer, addUserQuestion } from '@/features/users/usersSlice';
import type { RootState } from '@/app/store';
import type { OptionKey } from '@/types';

export const saveQuestion = createAsyncThunk<
  void,
  { optionOneText: string; optionTwoText: string },
  { state: RootState; rejectValue: string }
>('questions/saveQuestion', async ({ optionOneText, optionTwoText }, { dispatch, getState, rejectWithValue }) => {
  const author = getState().auth.authedUserId;
  if (!author) {
    return rejectWithValue('User must be logged in.');
  }

  try {
    const question = await createQuestion({ author, optionOneText, optionTwoText });
    dispatch(addQuestion(question));
    dispatch(addUserQuestion({ userId: author, questionId: question.id }));
  } catch {
    return rejectWithValue('Failed to save question.');
  }
});

export const saveQuestionAnswer = createAsyncThunk<
  void,
  { qid: string; answer: OptionKey },
  { state: RootState; rejectValue: string }
>('questions/saveQuestionAnswer', async ({ qid, answer }, { dispatch, getState, rejectWithValue }) => {
  const authedUser = getState().auth.authedUserId;
  if (!authedUser) {
    return rejectWithValue('User must be logged in.');
  }

  try {
    await submitAnswer({ authedUser, qid, answer });
    dispatch(addQuestionVote({ qid, userId: authedUser, answer }));
    dispatch(addUserAnswer({ userId: authedUser, qid, answer }));
  } catch {
    return rejectWithValue('Failed to save answer.');
  }
});
