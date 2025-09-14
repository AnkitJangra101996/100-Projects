var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchQuestion, setUserDataInHeader, insertQuestionsInPage, } from "./helpers/domHelper.js";
const quizQuestionCard = document.body.querySelector("form.quiz-question-card");
const quizQuestionCardHeader = quizQuestionCard.querySelector(".card-header");
const quizQuestionCardBody = quizQuestionCard.querySelector(".card-body");
const initalizeQuiz = () => __awaiter(void 0, void 0, void 0, function* () {
    const userData = sessionStorage.getItem("quiz-app-basic-info")
        ? JSON.parse(sessionStorage.getItem("quiz-app-basic-info"))
        : null;
    if (!userData) {
        window.location.replace("/");
        return;
    }
    const storedQuestions = sessionStorage.getItem("quiz-app-stored-questions")
        ? JSON.parse(sessionStorage.getItem("quiz-app-stored-questions"))
        : yield fetchQuestion(userData.questions);
    if (storedQuestions.length === 0)
        return;
    setUserDataInHeader(userData, quizQuestionCardHeader);
    sessionStorage.setItem("quiz-app-stored-questions", JSON.stringify(storedQuestions));
    insertQuestionsInPage(storedQuestions, quizQuestionCardBody);
    quizQuestionCard.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = document.querySelectorAll('.');
    });
});
initalizeQuiz();
//# sourceMappingURL=quiz-app.js.map