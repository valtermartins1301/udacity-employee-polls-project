async function loadDataApi() {
  return import('./_DATA.js');
}

describe('_saveQuestion', () => {
  it('returns formatted question with required fields when input is valid', async () => {
    const { _saveQuestion } = await loadDataApi();
    const result = await _saveQuestion({
      author: 'sarahedo',
      optionOneText: 'option one',
      optionTwoText: 'option two',
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: 'sarahedo',
        optionOne: { votes: [], text: 'option one' },
        optionTwo: { votes: [], text: 'option two' },
      }),
    );
  });

  it('rejects when input is invalid', async () => {
    const { _saveQuestion } = await loadDataApi();
    await expect(
      _saveQuestion({
        author: 'sarahedo',
        optionOneText: '',
        optionTwoText: 'valid',
      }),
    ).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
  });
});

describe('_saveQuestionAnswer', () => {
  it('returns true when input is valid', async () => {
    const { _saveQuestionAnswer } = await loadDataApi();
    await expect(
      _saveQuestionAnswer({
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionTwo',
      }),
    ).resolves.toBe(true);
  });

  it('rejects when input is invalid', async () => {
    const { _saveQuestionAnswer } = await loadDataApi();
    await expect(
      _saveQuestionAnswer({
        authedUser: '',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      }),
    ).rejects.toEqual('Please provide authedUser, qid, and answer');
  });
});
