const choiceCards = document.querySelectorAll(".choice-card");
const dateSummary = document.querySelector("#date-summary");
const result = document.querySelector("#result");
const resultEmoji = document.querySelector("#result-emoji");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const resetButton = document.querySelector("#reset-button");

const stepOrder = ["plan", "vibe", "dress", "mood", "final"];
const stepSections = new Map(
  stepOrder.map((step) => [step, document.querySelector(`[data-step-section="${step}"]`)])
);

const choiceLabels = {
  plan: "План",
  vibe: "Вайб",
  dress: "Дресс-код",
  mood: "Настроение"
};

const selections = {
  plan: null,
  vibe: null,
  dress: null,
  mood: null
};

function updateSummary() {
  dateSummary.replaceChildren();

  Object.entries(choiceLabels).forEach(([key, label]) => {
    const line = document.createElement("p");
    line.textContent = `${label}: ${selections[key]}.`;
    dateSummary.append(line);
  });
}

function revealStep(step) {
  const section = stepSections.get(step);

  if (!section) {
    return;
  }

  const wasHidden = section.classList.contains("is-hidden");
  section.classList.remove("is-hidden");
  section.removeAttribute("aria-hidden");

  if (wasHidden) {
    window.setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

function hideStep(step) {
  const section = stepSections.get(step);

  if (!section || step === "plan") {
    return;
  }

  section.classList.add("is-hidden");
  section.setAttribute("aria-hidden", "true");
}

function revealNextStep(group) {
  const currentIndex = stepOrder.indexOf(group);
  const nextStep = stepOrder[currentIndex + 1];

  if (!nextStep) {
    return;
  }

  if (nextStep === "final") {
    updateSummary();
  }

  revealStep(nextStep);
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
    result.classList.add("is-hidden");
    updateSummary();
    revealNextStep(group);
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
  Object.keys(selections).forEach((key) => {
    selections[key] = null;
  });

  choiceCards.forEach((card) => card.classList.remove("is-selected"));
  stepOrder.forEach(hideStep);
  dateSummary.replaceChildren();
  result.classList.add("is-hidden");
  document.querySelector(".choices").scrollIntoView({ behavior: "smooth", block: "start" });
});
