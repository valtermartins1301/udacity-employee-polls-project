import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '@/api/dataSource';
import type { OptionKey, Question } from '@/types';

export async function fetchQuestions(): Promise<Record<string, Question>> {
  const questions = await _getQuestions();
  return questions as Record<string, Question>;
}

export async function createQuestion(payload: {
  author: string;
  optionOneText: string;
  optionTwoText: string;
}): Promise<Question> {
  const question = await _saveQuestion(payload);
  return question as Question;
}

export async function submitAnswer(payload: {
  authedUser: string;
  qid: string;
  answer: OptionKey;
}): Promise<true> {
  const result = await _saveQuestionAnswer(payload);
  return result as true;
}
