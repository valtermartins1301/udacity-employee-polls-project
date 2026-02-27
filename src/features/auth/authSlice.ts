import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '@/types';
import type { RootState } from '@/app/store';

const initialState: AuthState = {
  authedUserId: null,
  redirectAfterLogin: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk<
  string,
  { userId: string; password: string },
  { state: RootState; rejectValue: string }
>('auth/login', async ({ userId, password }, { getState, rejectWithValue }) => {
  const user = getState().users.entities[userId];
  if (!user || user.password !== password) {
    return rejectWithValue('Invalid credentials.');
  }
  return userId;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.authedUserId = null;
      state.error = null;
      state.redirectAfterLogin = null;
      state.status = 'idle';
    },
    setRedirectAfterLogin(state, action: PayloadAction<string | null>) {
      state.redirectAfterLogin = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.authedUserId = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Login failed.';
      });
  },
});

export const { logout, setRedirectAfterLogin } = authSlice.actions;
export const authReducer = authSlice.reducer;
