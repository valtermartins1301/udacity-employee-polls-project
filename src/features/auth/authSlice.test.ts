import { authReducer, logout, setRedirectAfterLogin } from '@/features/auth/authSlice';

describe('authSlice', () => {
  it('handles logout transition', () => {
    const prev = {
      authedUserId: 'sarahedo',
      redirectAfterLogin: '/questions/abc',
      status: 'failed' as const,
      error: 'oops',
    };

    const state = authReducer(prev, logout());
    expect(state).toEqual({
      authedUserId: null,
      redirectAfterLogin: null,
      status: 'idle',
      error: null,
    });
  });

  it('sets redirect target', () => {
    const state = authReducer(undefined, setRedirectAfterLogin('/leaderboard'));
    expect(state.redirectAfterLogin).toBe('/leaderboard');
  });
});
