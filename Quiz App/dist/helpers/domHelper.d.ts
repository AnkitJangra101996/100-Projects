import type { QuizQuestionType, UserDataType } from "../types";
export declare const insertQuestionsInPage: (storedQuestions: QuizQuestionType[], quizQuestionCardBody: HTMLElement) => void;
export declare function fetchQuestion(totalQuestions: number): Promise<QuizQuestionType[]>;
export declare const setUserDataInHeader: (userData: UserDataType, quizQuestionCardHeader: HTMLElement) => void;
//# sourceMappingURL=domHelper.d.ts.map