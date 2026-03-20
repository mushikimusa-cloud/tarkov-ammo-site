import { questData } from "./data/quests/allQuests.js";

const chart = document.getElementById("questChart");
const allTab = document.getElementById("allTab");
const kappaTab = document.getElementById("kappaTab");

// =========================
// CREATE QUEST NODE
// =========================
function createNode(q) {

    const icon = `assets/traders/${q.trader.toLowerCase()}.png`

    const node = document.createElement("div");
    node.className = "questNode";

    node.innerHTML = `
        <img class="traderIcon" src="${icon}">
        <div class="questText">
            <div class="taskName">${q.name}</div>
            <div class="taskMeta">PMC LV ${q.pmcLevel} | ${q.trader} LL${q.ll}</div>
        </div>
    `;

    return node;
}

// =========================
// CREATE ARROW ▼
// =========================
function createArrow() {
  const arrow = document.createElement("div");
  arrow.className = "questArrow";
  arrow.innerHTML = "▼";
  return arrow;
}

// =========================
// RENDER FUNCTIONS
// =========================
function render(quests) {
  chart.innerHTML = "";
  quests.forEach((q, i) => {
    chart.appendChild(createNode(q));
    if(i < quests.length - 1) chart.appendChild(createArrow());
  });
}

// =========================
// TAB EVENTS
// =========================
function activateTab(tab) {
  allTab.classList.remove("active");
  kappaTab.classList.remove("active");
  tab.classList.add("active");
}

allTab.addEventListener("click", () => {
  render(questData);
  activateTab(allTab);
});

kappaTab.addEventListener("click", () => {
  const kappaQuests = questData.filter(q => q.kappa);
  render(kappaQuests);
  activateTab(kappaTab);
});

// =========================
// INITIAL RENDER
// =========================
render(questData);
activateTab(allTab);