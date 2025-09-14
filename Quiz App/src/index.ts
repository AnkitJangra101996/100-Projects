import type { UserDataType } from "./types";

const infoForm = document.querySelector(".info-form") as HTMLFormElement;
const username = infoForm.querySelector("#username") as HTMLInputElement;
const questionNumber = infoForm.querySelector(
  "#questions_number"
) as HTMLInputElement;

infoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 🚀 stop form from refreshing
  // Remove existing error
  infoForm.querySelector(".error-message")?.remove();

  if (!username.value || !questionNumber.value) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add(
      "error-message",
      "alert",
      "alert-danger",
      "mt-3"
    );
    errorMessage.textContent = "Please fill out all the fields.";
    infoForm.insertAdjacentElement("beforeend", errorMessage);
    return;
  }

  const userObj: UserDataType = {
    username: username.value,
    questions: Number(questionNumber.value),
  };

  sessionStorage.setItem("quiz-app-basic-info", JSON.stringify(userObj));

  window.location.replace("/question.html");
});
