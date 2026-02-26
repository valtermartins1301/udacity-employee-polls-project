import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/authSlice';
import { usersReducer } from '@/features/users/usersSlice';
import { questionsReducer } from '@/features/questions/questionsSlice';
import { appReducer } from '@/features/app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    questions: questionsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
