export type QuizQuestionType = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type UserDataType = {
  username: string;
  questions: number;
};
