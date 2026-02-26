import { addQuestion } from '@/features/questions/questionsSlice';
import { addUserQuestion, usersReducer } from '@/features/users/usersSlice';
import { questionsReducer } from '@/features/questions/questionsSlice';

const question = {
  id: 'new-question-id',
  author: 'sarahedo',
  timestamp: 1000,
  optionOne: { votes: [], text: 'one' },
  optionTwo: { votes: [], text: 'two' },
};

describe('question creation reducers', () => {
  it('inserts the new question into questions state', () => {
    const state = questionsReducer(undefined, addQuestion(question));
    expect(state.entities['new-question-id']).toEqual(question);
  });

  it('appends created question id to author', () => {
    const state = usersReducer(
      {
        entities: {
          sarahedo: {
            id: 'sarahedo',
            password: '123',
            name: 'Sarah Edo',
            avatarURL: '/avatars/sarahedo.svg',
            answers: {},
            questions: [],
          },
        },
      },
      addUserQuestion({ userId: 'sarahedo', questionId: 'new-question-id' }),
    );

    expect(state.entities.sarahedo.questions).toContain('new-question-id');
  });
});
