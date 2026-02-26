import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { QuestionCard } from '@/components/QuestionCard';
import { usersReducer } from '@/features/users/usersSlice';
import { questionsReducer } from '@/features/questions/questionsSlice';
import { authReducer } from '@/features/auth/authSlice';
import { appReducer } from '@/features/app/appSlice';

it('matches snapshot', () => {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      questions: questionsReducer,
      auth: authReducer,
      app: appReducer,
    },
    preloadedState: {
      users: {
        entities: {
          sarahedo: {
            id: 'sarahedo',
            password: 'x',
            name: 'Sarah Edo',
            avatarURL: '/avatars/sarahedo.svg',
            answers: {},
            questions: [],
          },
        },
      },
      questions: { entities: {} },
      auth: { authedUserId: 'sarahedo', redirectAfterLogin: null, status: 'idle' as const, error: null },
      app: { loading: false, initialized: true, error: null },
    },
  });

  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <QuestionCard
          question={{
            id: 'q1',
            author: 'sarahedo',
            timestamp: 1493579767190,
            optionOne: { votes: [], text: 'one' },
            optionTwo: { votes: [], text: 'two' },
          }}
        />
      </BrowserRouter>
    </Provider>,
  );

  expect(asFragment()).toMatchSnapshot();
});
