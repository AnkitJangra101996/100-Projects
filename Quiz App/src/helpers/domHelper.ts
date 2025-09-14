import type { QuizQuestionType, UserDataType } from "../types";

export const insertQuestionsInPage = (
  storedQuestions: QuizQuestionType[],
  quizQuestionCardBody: HTMLElement
) => {
  let questionHtml = `<div class="questions-wrapper">`;
  storedQuestions
    .map(
      (item, index) =>
        (questionHtml += `<div class="card question-card">
    <div class="card-header">
      <div class="d-flex justify-content-center">
      <span class="fw-bold text-3">Question - ${index + 1}</span>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title mb-0">${item.question}</h5>
    <hr>
    <div class="card-text m-0">
    <div class="question-option-wrapper d-flex justify-content-between">
    ${[item.correct_answer, ...item.incorrect_answers]
      .map(
        (option, optionIndex) => `<div class="form-check d-flex gap-2">
  <input class="form-check-input" type="radio" name="question-${
    index + 1
  }-options" id="question-${index + 1}-radio-option-${
          optionIndex + 1
        }" value="${option}" required>
  <label class="form-check-label" for="question-${index + 1}-radio-option-${
          optionIndex + 1
        }">
    ${option}
  </label>
</div>`
      )
      .join("")}
    </div>
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <div class="d-flex justify-content-between align-items-center">
  <span>Category: ${item.category}</span>
  <span class="badge text-bg-${
    item.difficulty === "hard"
      ? "danger"
      : item.difficulty === "easy"
      ? "primary"
      : "warning"
  }">${item.difficulty}</span>
  </div>
  </div>
</div>`)
    )
    .join("");

  questionHtml += `</div>`;
  quizQuestionCardBody.innerHTML = questionHtml;
};

export async function fetchQuestion(
  totalQuestions: number
): Promise<QuizQuestionType[]> {
  const result = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`
  );
  const data = await result.json();
  return data.results;
}

export const setUserDataInHeader = (
  userData: UserDataType,
  quizQuestionCardHeader: HTMLElement
) => {
  const headerHtml = `<div class="header-container d-flex justify-content-between">
    <h5 class="mb-0">${userData.username}</h5>    
    <h5 class="mb-0">Total Questions: ${userData.questions}</h5>
</div>`;
  quizQuestionCardHeader.innerHTML = headerHtml;
};
