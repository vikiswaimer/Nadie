const choiceCards = document.querySelectorAll(".choice-card");
const dateSummary = document.querySelector("#date-summary");
const result = document.querySelector("#result");
const resultEmoji = document.querySelector("#result-emoji");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const resetButton = document.querySelector("#reset-button");

const choiceLabels = {
  plan: "План",
  vibe: "Вайб",
  dress: "Дресс-код",
  mood: "Настроение"
};

const selections = {
  plan: "Кофе, десерт и мемы",
  vibe: "уютный и нежный",
  dress: "как удобно, главное быть собой",
  mood: "легкое и игривое"
};

function updateSummary() {
  dateSummary.replaceChildren();

  Object.entries(selections).forEach(([key, value]) => {
    const line = document.createElement("p");
    line.textContent = `${choiceLabels[key]}: ${value}.`;
    dateSummary.append(line);
  });
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
    const group = card.dataset.choiceGroup;
    const groupCards = document.querySelectorAll(`[data-choice-group="${group}"]`);

    groupCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    selections[group] = card.dataset.choiceValue;
    updateSummary();
  });
});

yesButton.addEventListener("click", () => {
  showResult({
    emoji: "😻",
    title: "Ура, Надие попалась!",
    text:
      `Фиксирую: ${selections.plan}, вайб ${selections.vibe}, дресс-код ${selections.dress}, ` +
      `настроение ${selections.mood}. Я наберу тебе, выберем время, и да - кажется, ` +
      `я тебя словил на самое милое свидание. Котики уже делают вид, что это был их план.`
  });
});

noButton.addEventListener("click", () => {
  showResult({
    emoji: "😿",
    title: "Печальный котик активирован",
    text:
      "Он сидит под дождиком, пересматривает старые мемы и надеется, что у Надие еще можно " +
      "попросить второй шанс. Но он держится: красивым девушкам иногда нужно чуть больше времени."
  });
});

resetButton.addEventListener("click", () => {
  result.classList.add("is-hidden");
  document.querySelector(".choices").scrollIntoView({ behavior: "smooth", block: "start" });
});

updateSummary();
