import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  initialized: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setInitialized, setAppError } = appSlice.actions;
export const appReducer = appSlice.reducer;
