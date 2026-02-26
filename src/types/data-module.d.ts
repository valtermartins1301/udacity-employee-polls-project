declare module '*_DATA.js' {
  export function _getUsers(): Promise<unknown>;
  export function _getQuestions(): Promise<unknown>;
  export function _saveQuestion(input: unknown): Promise<unknown>;
  export function _saveQuestionAnswer(input: unknown): Promise<unknown>;
}
