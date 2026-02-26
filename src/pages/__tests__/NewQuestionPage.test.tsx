import { fireEvent, screen } from '@testing-library/react';
import { NewQuestionPage } from '@/pages/NewQuestionPage';
import { renderWithProviders } from '@/test/renderWithProviders';
import { setUsers } from '@/features/users/usersSlice';
import { login } from '@/features/auth/authSlice';

jest.mock('@/features/questions/thunks', () => ({
  saveQuestion: () => ({ type: 'questions/saveQuestion/fulfilled' }),
}));

describe('NewQuestionPage DOM interactions', () => {
  it('enables submit when both options are filled', async () => {
    const { store } = renderWithProviders(<NewQuestionPage />);

    store.dispatch(
      setUsers({
        sarahedo: {
          id: 'sarahedo',
          password: 'password123',
          name: 'Sarah Edo',
          avatarURL: '/avatars/sarahedo.svg',
          answers: {},
          questions: [],
        },
      }),
    );

    await store.dispatch(login({ userId: 'sarahedo', password: 'password123' }));

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/first option/i), { target: { value: 'Alpha' } });
    fireEvent.change(screen.getByLabelText(/second option/i), { target: { value: 'Beta' } });

    expect(button).toBeEnabled();
  });
});
