import type { QuizQuestionType, UserDataType } from "./types";
import {
  fetchQuestion,
  setUserDataInHeader,
  insertQuestionsInPage,
} from "./helpers/domHelper.js";

const quizQuestionCard = document.body.querySelector(
  "form.quiz-question-card"
)! as HTMLFormElement;

const quizQuestionCardHeader = quizQuestionCard.querySelector(
  ".card-header"
)! as HTMLElement;

const quizQuestionCardBody = quizQuestionCard.querySelector(
  ".card-body"
)! as HTMLElement;

const initalizeQuiz = async () => {
  const userData: UserDataType = sessionStorage.getItem("quiz-app-basic-info")
    ? JSON.parse(sessionStorage.getItem("quiz-app-basic-info")!)
    : null;
  if (!userData) {
    window.location.replace("/");
    return;
  }
  const storedQuestions: QuizQuestionType[] = sessionStorage.getItem(
    "quiz-app-stored-questions"
  )
    ? JSON.parse(sessionStorage.getItem("quiz-app-stored-questions")!)
    : await fetchQuestion(userData.questions);

  if (storedQuestions.length === 0) return;

  setUserDataInHeader(userData, quizQuestionCardHeader);
  sessionStorage.setItem(
    "quiz-app-stored-questions",
    JSON.stringify(storedQuestions)
  );
  insertQuestionsInPage(storedQuestions, quizQuestionCardBody);

  quizQuestionCard.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = document.querySelectorAll('.')
  });
};

initalizeQuiz();
