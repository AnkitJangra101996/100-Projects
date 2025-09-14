const infoForm = document.querySelector(".info-form");
const username = infoForm.querySelector("#username");
const questionNumber = infoForm.querySelector("#questions_number");
infoForm.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault(); // 🚀 stop form from refreshing
    // Remove existing error
    (_a = infoForm.querySelector(".error-message")) === null || _a === void 0 ? void 0 : _a.remove();
    if (!username.value || !questionNumber.value) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message", "alert", "alert-danger", "mt-3");
        errorMessage.textContent = "Please fill out all the fields.";
        infoForm.insertAdjacentElement("beforeend", errorMessage);
        return;
    }
    const userObj = {
        username: username.value,
        questions: Number(questionNumber.value),
    };
    sessionStorage.setItem("quiz-app-basic-info", JSON.stringify(userObj));
    window.location.replace("/question.html");
});
export {};
//# sourceMappingURL=index.js.map