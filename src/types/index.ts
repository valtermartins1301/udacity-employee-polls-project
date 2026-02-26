export type OptionKey = 'optionOne' | 'optionTwo';

export interface AnswerOption {
  votes: string[];
  text: string;
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: AnswerOption;
  optionTwo: AnswerOption;
}

export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: Record<string, OptionKey>;
  questions: string[];
}

export interface AuthState {
  authedUserId: string | null;
  redirectAfterLogin: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

export interface UsersState {
  entities: Record<string, User>;
}

export interface QuestionsState {
  entities: Record<string, Question>;
}
