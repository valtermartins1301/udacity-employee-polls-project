import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '@/features/app/appSlice';
import { authReducer } from '@/features/auth/authSlice';
import { questionsReducer } from '@/features/questions/questionsSlice';
import { usersReducer } from '@/features/users/usersSlice';

export function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      questions: questionsReducer,
      app: appReducer,
    },
  });
}
