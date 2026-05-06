const questionBank = [
  {
    topic: "Math",
    question: "If 15% of a number is 45, what is the number?",
    options: ["250", "275", "300", "320"],
    answer: 2,
    explain: "15% equals 45, so the number is 45 x 100 / 15 = 300."
  },
  {
    topic: "Math",
    question: "A train covers 180 km in 3 hours. What is its average speed?",
    options: ["45 km/h", "50 km/h", "60 km/h", "75 km/h"],
    answer: 2,
    explain: "Average speed is distance divided by time: 180 / 3 = 60 km/h."
  },
  {
    topic: "Math",
    question: "The simple interest on Rs. 5000 at 8% per annum for 2 years is:",
    options: ["Rs. 600", "Rs. 700", "Rs. 800", "Rs. 900"],
    answer: 2,
    explain: "Simple interest = P x R x T / 100 = 5000 x 8 x 2 / 100 = 800."
  },
  {
    topic: "Math",
    question: "What is the next number: 4, 9, 16, 25, ?",
    options: ["30", "32", "36", "49"],
    answer: 2,
    explain: "The sequence is square numbers: 2^2, 3^2, 4^2, 5^2, so next is 6^2 = 36."
  },
  {
    topic: "Reasoning",
    question: "Book is related to Reading as Fork is related to:",
    options: ["Drawing", "Eating", "Writing", "Cooking"],
    answer: 1,
    explain: "A book is used for reading; a fork is used for eating."
  },
  {
    topic: "Reasoning",
    question: "Find the odd one out.",
    options: ["Circle", "Triangle", "Square", "Cube"],
    answer: 3,
    explain: "Cube is a 3D solid; the others are 2D shapes."
  },
  {
    topic: "Reasoning",
    question: "If A = 1, B = 2, then CAT equals:",
    options: ["24", "26", "28", "30"],
    answer: 0,
    explain: "C + A + T = 3 + 1 + 20 = 24."
  },
  {
    topic: "Reasoning",
    question: "Which direction is opposite to South-East?",
    options: ["North-East", "North-West", "South-West", "West"],
    answer: 1,
    explain: "The exact opposite of South-East is North-West."
  },
  {
    topic: "English",
    question: "Choose the correctly spelled word.",
    options: ["Recieve", "Receive", "Receeve", "Reciave"],
    answer: 1,
    explain: "The correct spelling is Receive."
  },
  {
    topic: "English",
    question: "Select the synonym of 'Rapid'.",
    options: ["Slow", "Quick", "Late", "Weak"],
    answer: 1,
    explain: "Rapid means quick or fast."
  },
  {
    topic: "English",
    question: "Choose the antonym of 'Ancient'.",
    options: ["Old", "Modern", "Historic", "Past"],
    answer: 1,
    explain: "Ancient means very old; its antonym is modern."
  },
  {
    topic: "English",
    question: "Fill in the blank: She has been studying ___ morning.",
    options: ["for", "since", "from", "by"],
    answer: 1,
    explain: "Since is used with a point of time: since morning."
  },
  {
    topic: "Math",
    question: "If the ratio 2:3 equals x:18, then x is:",
    options: ["8", "10", "12", "14"],
    answer: 2,
    explain: "2/3 = x/18, so x = 12."
  },
  {
    topic: "Reasoning",
    question: "Complete the series: AZ, BY, CX, ?",
    options: ["DW", "DV", "EW", "EX"],
    answer: 0,
    explain: "First letters move forward and second letters move backward: AZ, BY, CX, DW."
  },
  {
    topic: "English",
    question: "Choose the correct sentence.",
    options: ["He do his work.", "He does his work.", "He doing his work.", "He done his work."],
    answer: 1,
    explain: "With 'He', simple present uses 'does'."
  },
  {
    topic: "Math",
    question: "What is 7 x 8 + 12?",
    options: ["56", "64", "68", "72"],
    answer: 2,
    explain: "7 x 8 = 56, and 56 + 12 = 68."
  },
  {
    topic: "Reasoning",
    question: "If today is Monday, what day will it be after 10 days?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    answer: 1,
    explain: "10 days after Monday is Thursday."
  },
  {
    topic: "English",
    question: "What is the plural of 'Analysis'?",
    options: ["Analysises", "Analysi", "Analyses", "Analysis"],
    answer: 2,
    explain: "The plural form of analysis is analyses."
  },
  {
    topic: "Math",
    question: "A shopkeeper gives 10% discount on Rs. 900. Selling price is:",
    options: ["Rs. 800", "Rs. 810", "Rs. 850", "Rs. 890"],
    answer: 1,
    explain: "10% of 900 is 90, so selling price is 900 - 90 = 810."
  },
  {
    topic: "Reasoning",
    question: "Mirror image of '13' is closest to:",
    options: ["31", "E1", "1E", "13"],
    answer: 1,
    explain: "In a mirror, 3 appears like E, so 13 becomes close to E1."
  }
];

const state = {
  questions: [],
  current: 0,
  answers: [],
  marked: [],
  studentName: "",
  studentRoll: "",
  testType: "mixed",
  secondsLeft: 600,
  timerId: null,
  retryMode: false
};

const $ = (id) => document.getElementById(id);

const setupScreen = $("setupScreen");
const testScreen = $("testScreen");
const resultScreen = $("resultScreen");
const setupForm = $("setupForm");
const questionCount = $("questionCount");
const timer = $("timer");
const progressFill = $("progressFill");
const topicBadge = $("topicBadge");
const questionText = $("questionText");
const optionsList = $("optionsList");
const questionMap = $("questionMap");
const markReview = $("markReview");

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = $("testType").value;
  const limit = Number($("questionLimit").value);
  const minutes = Number($("timeLimit").value);
  state.studentName = $("studentName").value.trim();
  state.studentRoll = $("studentRoll").value.trim();
  state.testType = type;
  const filtered = type === "mixed" ? questionBank : questionBank.filter((item) => item.topic.toLowerCase() === type);
  startTest(shuffle(filtered).slice(0, limit), minutes * 60);
});

$("prevBtn").addEventListener("click", () => moveQuestion(-1));
$("nextBtn").addEventListener("click", () => moveQuestion(1));
$("clearBtn").addEventListener("click", clearAnswer);
$("submitBtn").addEventListener("click", submitTest);
$("restartBtn").addEventListener("click", resetToSetup);
$("retryWrongBtn").addEventListener("click", retryWrongAnswers);
$("downloadCsvBtn").addEventListener("click", downloadCsvReport);
$("printReportBtn").addEventListener("click", () => window.print());
markReview.addEventListener("click", () => {
  state.marked[state.current] = !state.marked[state.current];
  renderQuestion();
});

function startTest(questions, seconds) {
  state.questions = questions.length ? questions : questionBank.slice(0, 10);
  state.current = 0;
  state.answers = Array(state.questions.length).fill(null);
  state.marked = Array(state.questions.length).fill(false);
  state.secondsLeft = seconds;
  state.retryMode = false;
  showScreen(testScreen);
  startTimer();
  renderQuestion();
}

function startTimer() {
  clearInterval(state.timerId);
  updateTimer();
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    updateTimer();
    if (state.secondsLeft <= 0) {
      clearInterval(state.timerId);
      submitTest();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.max(0, Math.floor(state.secondsLeft / 60));
  const seconds = Math.max(0, state.secondsLeft % 60);
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderQuestion() {
  const item = state.questions[state.current];
  questionCount.textContent = `${state.current + 1} / ${state.questions.length}`;
  progressFill.style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
  topicBadge.textContent = item.topic;
  questionText.textContent = item.question;
  markReview.classList.toggle("marked", state.marked[state.current]);
  markReview.textContent = state.marked[state.current] ? "★" : "☆";
  optionsList.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.classList.toggle("selected", state.answers[state.current] === index);
    button.addEventListener("click", () => {
      state.answers[state.current] = index;
      renderQuestion();
    });
    optionsList.appendChild(button);
  });

  renderMap();
}

function renderMap() {
  questionMap.innerHTML = "";
  state.questions.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-btn";
    button.textContent = index + 1;
    button.classList.toggle("answered", state.answers[index] !== null);
    button.classList.toggle("review", state.marked[index]);
    button.classList.toggle("current", index === state.current);
    button.addEventListener("click", () => {
      state.current = index;
      renderQuestion();
    });
    questionMap.appendChild(button);
  });
}

function moveQuestion(step) {
  state.current = Math.min(state.questions.length - 1, Math.max(0, state.current + step));
  renderQuestion();
}

function clearAnswer() {
  state.answers[state.current] = null;
  renderQuestion();
}

function submitTest() {
  clearInterval(state.timerId);
  const result = buildResult();
  showScreen(resultScreen);
  renderResult(result);
}

function buildResult() {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  const topics = {};

  state.questions.forEach((item, index) => {
    if (!topics[item.topic]) {
      topics[item.topic] = { total: 0, correct: 0, wrong: 0, skipped: 0 };
    }

    topics[item.topic].total += 1;
    const selected = state.answers[index];
    if (selected === null) {
      skipped += 1;
      topics[item.topic].skipped += 1;
    } else if (selected === item.answer) {
      correct += 1;
      topics[item.topic].correct += 1;
    } else {
      wrong += 1;
      topics[item.topic].wrong += 1;
    }
  });

  const attempted = correct + wrong;
  const score = Math.round((correct / state.questions.length) * 100);
  const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
  return { correct, wrong, skipped, attempted, score, accuracy, topics };
}

function renderResult(result) {
  saveResult(result);
  $("scoreTitle").textContent = result.score >= 80 ? "Strong performance" : result.score >= 55 ? "Good attempt" : "Practice ki zarurat hai";
  $("scoreSummary").textContent = `${state.studentName || "Student"} ne ${state.questions.length} questions me se ${result.correct} correct kiye. Accuracy ${result.accuracy}% rahi, aur ${result.skipped} questions skip hue.`;
  $("scorePercent").textContent = `${result.score}%`;
  $("correctMetric").textContent = result.correct;
  $("wrongMetric").textContent = result.wrong;
  $("skippedMetric").textContent = result.skipped;
  $("accuracyMetric").textContent = `${result.accuracy}%`;
  drawScore(result.score);
  renderTopicAnalysis(result.topics);
  renderSuggestions(result);
  renderReview();
  renderSavedReports();
}

function drawScore(score) {
  const canvas = $("scoreCanvas");
  const ctx = canvas.getContext("2d");
  const center = canvas.width / 2;
  const radius = 72;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#edf1f4";
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = score >= 75 ? "#238b5d" : score >= 50 ? "#f4b860" : "#d94d4d";
  ctx.beginPath();
  ctx.arc(center, center, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (score / 100));
  ctx.stroke();
}

function renderTopicAnalysis(topics) {
  const wrap = $("topicAnalysis");
  wrap.innerHTML = "";
  Object.entries(topics).forEach(([topic, data]) => {
    const percent = Math.round((data.correct / data.total) * 100);
    const row = document.createElement("div");
    row.className = "topic-row";
    row.innerHTML = `
      <strong>${topic}</strong>
      <div class="topic-bar"><span style="width: ${percent}%"></span></div>
      <span>${percent}%</span>
    `;
    wrap.appendChild(row);
  });
}

function renderSuggestions(result) {
  const list = $("suggestionList");
  list.innerHTML = "";
  const suggestions = [];
  const weakTopics = Object.entries(result.topics)
    .filter(([, data]) => data.correct / data.total < 0.6)
    .map(([topic]) => topic);

  if (weakTopics.length) {
    suggestions.push(`${weakTopics.join(", ")} topic par 20-30 focused questions roz practice karo.`);
  }
  if (result.skipped > 0) {
    suggestions.push("Skipped questions ke liye pehle easy options eliminate karne ki habit banao.");
  }
  if (result.accuracy < 70 && result.attempted > 0) {
    suggestions.push("Accuracy improve karne ke liye har wrong answer ka concept note banao.");
  }
  if (result.score >= 80) {
    suggestions.push("Performance strong hai. Ab timer ko kam karke speed test mode me practice karo.");
  }
  if (!suggestions.length) {
    suggestions.push("Balanced attempt tha. Same pattern ke 2 aur tests do aur consistency track karo.");
  }

  suggestions.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
}

function renderReview() {
  const wrap = $("reviewList");
  wrap.innerHTML = "";
  state.questions.forEach((item, index) => {
    const selected = state.answers[index];
    const status = selected === null ? "skipped" : selected === item.answer ? "correct" : "wrong";
    const article = document.createElement("article");
    article.className = `review-item ${status}`;
    article.innerHTML = `
      <strong>Q${index + 1}. ${item.question}</strong>
      <p>Your answer: ${selected === null ? "Skipped" : item.options[selected]}</p>
      <p>Correct answer: ${item.options[item.answer]}</p>
      <p>${item.explain}</p>
    `;
    wrap.appendChild(article);
  });
}

function retryWrongAnswers() {
  const wrongQuestions = state.questions.filter((item, index) => state.answers[index] !== null && state.answers[index] !== item.answer);
  if (!wrongQuestions.length) {
    resetToSetup();
    return;
  }
  startTest(wrongQuestions, Math.max(180, wrongQuestions.length * 60));
  state.retryMode = true;
}

function saveResult(result) {
  const reports = getSavedReports();
  const report = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    name: state.studentName || "Student",
    roll: state.studentRoll || "-",
    testType: state.testType,
    total: state.questions.length,
    correct: result.correct,
    wrong: result.wrong,
    skipped: result.skipped,
    score: result.score,
    accuracy: result.accuracy,
    topics: result.topics
  };
  reports.unshift(report);
  localStorage.setItem("testAnalysisReports", JSON.stringify(reports.slice(0, 200)));
}

function getSavedReports() {
  try {
    return JSON.parse(localStorage.getItem("testAnalysisReports") || "[]");
  } catch {
    return [];
  }
}

function renderSavedReports() {
  const wrap = $("savedReportList");
  const reports = getSavedReports();
  wrap.innerHTML = "";
  if (!reports.length) {
    wrap.textContent = "Abhi koi saved report nahi hai.";
    return;
  }

  reports.slice(0, 10).forEach((report) => {
    const item = document.createElement("article");
    item.className = "review-item";
    item.innerHTML = `
      <strong>${report.name} (${report.roll}) - ${report.score}%</strong>
      <p>${report.date} | ${report.testType} | Correct ${report.correct}/${report.total} | Accuracy ${report.accuracy}%</p>
    `;
    wrap.appendChild(item);
  });
}

function downloadCsvReport() {
  const reports = getSavedReports();
  const rows = [
    ["Date", "Name", "Roll", "Test Type", "Total", "Correct", "Wrong", "Skipped", "Score", "Accuracy"],
    ...reports.map((report) => [
      report.date,
      report.name,
      report.roll,
      report.testType,
      report.total,
      report.correct,
      report.wrong,
      report.skipped,
      `${report.score}%`,
      `${report.accuracy}%`
    ])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "student-results-report.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function resetToSetup() {
  clearInterval(state.timerId);
  timer.textContent = "10:00";
  questionCount.textContent = "1 / 10";
  showScreen(setupScreen);
}

function showScreen(screen) {
  [setupScreen, testScreen, resultScreen].forEach((item) => item.classList.remove("active"));
  screen.classList.add("active");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
