import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '@/api/users';
import { fetchQuestions } from '@/api/questions';
import { setUsers } from '@/features/users/usersSlice';
import { setQuestions } from '@/features/questions/questionsSlice';
import { setAppError, setInitialized, setLoading } from '@/features/app/appSlice';

export const initializeApp = createAsyncThunk<void, void>(
  'app/initialize',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(setAppError(null));
    try {
      const [users, questions] = await Promise.all([fetchUsers(), fetchQuestions()]);
      dispatch(setUsers(users));
      dispatch(setQuestions(questions));
      dispatch(setInitialized(true));
    } catch {
      dispatch(setAppError('Failed to load initial data.'));
    } finally {
      dispatch(setLoading(false));
    }
  },
);
