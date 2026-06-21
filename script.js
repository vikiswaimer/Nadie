const choiceCards = document.querySelectorAll(".choice-card");
const selectedPlan = document.querySelector("#selected-plan");
const result = document.querySelector("#result");
const resultEmoji = document.querySelector("#result-emoji");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const resetButton = document.querySelector("#reset-button");

let currentPlan = "Кофе, десерт и мемы";

function updatePlan(plan) {
  currentPlan = plan;
  selectedPlan.textContent = `Выбранный план: ${plan}.`;
}

function showResult({ emoji, title, text }) {
  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultText.textContent = text;
  result.classList.remove("is-hidden");
  result.scrollIntoView({ behavior: "smooth", block: "center" });
}

choiceCards.forEach((card) => {
  card.addEventListener("click", () => {
    choiceCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    updatePlan(card.dataset.plan);
  });
});

yesButton.addEventListener("click", () => {
  showResult({
    emoji: "😻",
    title: "Ура, котики ликуют!",
    text: `Значит план такой: ${currentPlan}. Я уже морально готовлюсь быть самым счастливым человеком на этом свидании.`
  });
});

noButton.addEventListener("click", () => {
  showResult({
    emoji: "😿",
    title: "Печальный котик активирован",
    text: "Он сидит под дождиком, пересматривает старые мемы и надеется, что у Надие еще можно попросить второй шанс."
  });
});

resetButton.addEventListener("click", () => {
  result.classList.add("is-hidden");
  document.querySelector(".choices").scrollIntoView({ behavior: "smooth", block: "start" });
});
