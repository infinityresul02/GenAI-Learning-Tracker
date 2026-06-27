const phases = [
  {
    id: "phase-1",
    title: "Phase 1: Strengthen Analytics Foundation",
    duration: "2-3 weeks",
    learn: [
      "Advanced SQL: window functions",
      "Advanced SQL: CTEs",
      "Advanced SQL: query optimization",
      "Advanced SQL: data modeling",
      "Product analytics: funnel analysis",
      "Product analytics: cohort analysis",
      "Product analytics: retention metrics",
      "Product analytics: A/B testing",
      "Dashboarding: Power BI",
      "Dashboarding: Databricks dashboards"
    ],
    build: [
      "Build an e-commerce analytics dashboard",
      "Use Python for analysis or data preparation",
      "Use SQL for business questions",
      "Use Databricks for processing",
      "Create the dashboard in Power BI",
      "Write a resume bullet with records processed and retention opportunities"
    ]
  },
  {
    id: "phase-2",
    title: "Phase 2: Core Machine Learning",
    duration: "4-6 weeks",
    learn: [
      "Regression",
      "Classification",
      "Clustering",
      "Feature engineering",
      "Model evaluation",
      "Python ML workflow",
      "Scikit-learn",
      "Pandas"
    ],
    build: [
      "Build a customer churn prediction model",
      "Explain why customers leave",
      "Identify which factors matter",
      "Generate predicted risk scores",
      "Frame insights in business language"
    ]
  },
  {
    id: "phase-3",
    title: "Phase 3: LLM Fundamentals",
    duration: "2-3 weeks",
    learn: [
      "Tokens",
      "Embeddings",
      "Attention",
      "Transformers",
      "Prompt engineering",
      "Context windows",
      "OpenAI APIs",
      "Anthropic APIs",
      "Open-source models"
    ],
    build: [
      "Create prompt examples for analytics tasks",
      "Compare outputs from at least two model providers",
      "Document practical LLM concepts in plain English"
    ]
  },
  {
    id: "phase-4",
    title: "Phase 4: RAG Engineering",
    duration: "4-6 weeks",
    learn: [
      "Embeddings: vector representations",
      "Embeddings: similarity search",
      "Vector databases: Chroma",
      "Vector databases: FAISS",
      "Vector databases: Pinecone",
      "RAG pipeline: document loading",
      "RAG pipeline: chunking",
      "RAG pipeline: embeddings",
      "RAG pipeline: vector store",
      "RAG pipeline: retrieval",
      "RAG pipeline: LLM response generation",
      "Frameworks: LangChain",
      "Frameworks: LlamaIndex"
    ],
    build: [
      "Build a business knowledge assistant",
      "Upload financial reports, SOPs, or market research PDFs",
      "Answer questions such as main Q4 revenue drivers",
      "Measure manual document search time saved",
      "Write a resume bullet with impact percentage"
    ]
  },
  {
    id: "phase-5",
    title: "Phase 5: AI Agents",
    duration: "3-4 weeks",
    learn: [
      "Tool calling",
      "Agent workflows",
      "Multi-step reasoning",
      "Function calling",
      "LangGraph",
      "CrewAI"
    ],
    build: [
      "Build an analytics agent",
      "Connect the agent to a SQL database",
      "Generate SQL queries from user questions",
      "Build charts from query results",
      "Summarize results in business language",
      "Answer why revenue dropped in a selected month"
    ]
  },
  {
    id: "phase-6",
    title: "Phase 6: Databricks + GenAI",
    duration: "4 weeks",
    learn: [
      "Databricks Vector Search",
      "AI Functions",
      "Model Serving",
      "Mosaic AI",
      "Lakehouse AI",
      "Enterprise data integration patterns"
    ],
    build: [
      "Build enterprise RAG on Databricks",
      "Connect retrieval to governed enterprise-style data",
      "Document how Databricks improves the GenAI workflow",
      "Align project notes with certification topics"
    ]
  },
  {
    id: "phase-7",
    title: "Phase 7: MLOps and Deployment",
    duration: "3-4 weeks",
    learn: [
      "Docker",
      "APIs",
      "Deployment",
      "CI/CD basics",
      "FastAPI",
      "GitHub Actions",
      "MLflow"
    ],
    build: [
      "Deploy the RAG system publicly",
      "Add an API with FastAPI",
      "Containerize with Docker",
      "Add basic CI/CD with GitHub Actions",
      "Track experiments or model versions with MLflow",
      "Prepare a live demo link for recruiters"
    ]
  }
];

const storageKey = "ai-analytics-study-tracker-v1";
const initialState = {
  checked: {},
  notes: "",
  phaseNotes: {},
  startDate: "",
  weeklyHours: "",
  currentFocus: ""
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return { ...initialState, ...saved };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function taskId(phaseId, category, index) {
  return `${phaseId}-${category}-${index}`;
}

function createTaskItem(phase, category, text, index) {
  const id = taskId(phase.id, category, index);
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");

  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = Boolean(state.checked[id]);
  span.textContent = text;

  checkbox.addEventListener("change", () => {
    state.checked[id] = checkbox.checked;
    saveState();
    updateProgress();
  });

  label.append(checkbox, span);
  item.append(label);
  return item;
}

function renderPhases() {
  const phaseList = document.querySelector("#phaseList");
  const template = document.querySelector("#phaseTemplate");

  phases.forEach((phase) => {
    const clone = template.content.cloneNode(true);
    const article = clone.querySelector(".phase");
    const title = clone.querySelector("h2");
    const duration = clone.querySelector(".phase-duration");
    const learnList = clone.querySelector(".learn-list");
    const buildList = clone.querySelector(".build-list");
    const notes = clone.querySelector(".phase-notes");

    article.dataset.phaseId = phase.id;
    title.textContent = phase.title;
    duration.textContent = phase.duration;
    notes.value = state.phaseNotes[phase.id] || "";

    phase.learn.forEach((task, index) => {
      learnList.append(createTaskItem(phase, "learn", task, index));
    });

    phase.build.forEach((task, index) => {
      buildList.append(createTaskItem(phase, "build", task, index));
    });

    notes.addEventListener("input", () => {
      state.phaseNotes[phase.id] = notes.value;
      saveState();
    });

    phaseList.append(clone);
  });
}

function allTaskIds() {
  return phases.flatMap((phase) => [
    ...phase.learn.map((_, index) => taskId(phase.id, "learn", index)),
    ...phase.build.map((_, index) => taskId(phase.id, "build", index))
  ]);
}

function updateProgress() {
  const ids = allTaskIds();
  const completed = ids.filter((id) => state.checked[id]).length;
  const percent = ids.length ? Math.round((completed / ids.length) * 100) : 0;

  document.querySelector("#overallPercent").textContent = `${percent}%`;
  document.querySelector("#overallBar").style.width = `${percent}%`;
  document.querySelector("#overallCount").textContent = `${completed} of ${ids.length} tasks complete`;

  phases.forEach((phase) => {
    const phaseIds = [
      ...phase.learn.map((_, index) => taskId(phase.id, "learn", index)),
      ...phase.build.map((_, index) => taskId(phase.id, "build", index))
    ];
    const phaseCompleted = phaseIds.filter((id) => state.checked[id]).length;
    const phasePercent = phaseIds.length ? Math.round((phaseCompleted / phaseIds.length) * 100) : 0;
    const article = document.querySelector(`[data-phase-id="${phase.id}"]`);

    article.querySelector(".phase-score strong").textContent = `${phasePercent}%`;
    article.querySelector(".phase-score span").textContent = `${phaseCompleted}/${phaseIds.length}`;
    article.querySelector(".progress-fill").style.width = `${phasePercent}%`;
  });
}

function bindFormState() {
  const notes = document.querySelector("#notes");
  const startDate = document.querySelector("#startDate");
  const weeklyHours = document.querySelector("#weeklyHours");
  const currentFocus = document.querySelector("#currentFocus");

  notes.value = state.notes;
  startDate.value = state.startDate;
  weeklyHours.value = state.weeklyHours;
  currentFocus.value = state.currentFocus;

  notes.addEventListener("input", () => {
    state.notes = notes.value;
    saveState();
  });

  startDate.addEventListener("input", () => {
    state.startDate = startDate.value;
    saveState();
  });

  weeklyHours.addEventListener("input", () => {
    state.weeklyHours = weeklyHours.value;
    saveState();
  });

  currentFocus.addEventListener("change", () => {
    state.currentFocus = currentFocus.value;
    saveState();
  });
}

function exportProgress() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ai-analytics-study-progress.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      state = { ...initialState, ...imported };
      saveState();
      window.location.reload();
    } catch {
      alert("That progress file could not be imported.");
    }
  });

  reader.readAsText(file);
}

function bindActions() {
  document.querySelector("#exportBtn").addEventListener("click", exportProgress);

  document.querySelector("#importFile").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) {
      importProgress(file);
    }
  });

  document.querySelector("#resetBtn").addEventListener("click", () => {
    const confirmed = window.confirm("Reset all saved progress for this tracker?");
    if (!confirmed) {
      return;
    }

    state = { ...initialState };
    saveState();
    window.location.reload();
  });
}

renderPhases();
bindFormState();
bindActions();
updateProgress();
