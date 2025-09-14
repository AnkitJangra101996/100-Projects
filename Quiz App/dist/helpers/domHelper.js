var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const insertQuestionsInPage = (storedQuestions, quizQuestionCardBody) => {
    let questionHtml = `<div class="questions-wrapper">`;
    storedQuestions
        .map((item, index) => (questionHtml += `<div class="card question-card">
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
        .map((option, optionIndex) => `<div class="form-check d-flex gap-2">
  <input class="form-check-input" type="radio" name="question-${index + 1}-options" id="question-${index + 1}-radio-option-${optionIndex + 1}" value="${option}" required>
  <label class="form-check-label" for="question-${index + 1}-radio-option-${optionIndex + 1}">
    ${option}
  </label>
</div>`)
        .join("")}
    </div>
    </div>
  </div>
  <div class="card-footer text-body-secondary">
    <div class="d-flex justify-content-between align-items-center">
  <span>Category: ${item.category}</span>
  <span class="badge text-bg-${item.difficulty === "hard"
        ? "danger"
        : item.difficulty === "easy"
            ? "primary"
            : "warning"}">${item.difficulty}</span>
  </div>
  </div>
</div>`))
        .join("");
    questionHtml += `</div>`;
    quizQuestionCardBody.innerHTML = questionHtml;
};
export function fetchQuestion(totalQuestions) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`);
        const data = yield result.json();
        return data.results;
    });
}
export const setUserDataInHeader = (userData, quizQuestionCardHeader) => {
    const headerHtml = `<div class="header-container d-flex justify-content-between">
    <h5 class="mb-0">${userData.username}</h5>    
    <h5 class="mb-0">Total Questions: ${userData.questions}</h5>
</div>`;
    quizQuestionCardHeader.innerHTML = headerHtml;
};
//# sourceMappingURL=domHelper.js.map