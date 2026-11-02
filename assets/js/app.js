const RESOURCES_URL = "data/resources.json";

let resources = [];
let activeCause = null;
let activeType = null;
let searchQuery = "";

const causeTabsEl = document.getElementById("cause-tabs");
const filterChipsEl = document.getElementById("filter-chips");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const resultsContainer = document.getElementById("results-container");
const noResultsEl = document.getElementById("no-results");
const resultsCountEl = document.getElementById("results-count");

async function loadResources() {
  try {
    const response = await fetch(RESOURCES_URL);
    if (!response.ok) throw new Error("Failed to load resources");
    resources = await response.json();
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML =
      '<p class="no-results">Unable to load resources. Please try again later.</p>';
    return;
  }
  init();
}

function init() {
  renderCauseTabs();
  renderFilterChips();
  renderResources();

  searchInput.addEventListener("input", handleSearch);
  searchClear.addEventListener("click", clearSearch);
}

function handleSearch() {
  searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.style.display = searchQuery ? "block" : "none";
  renderResources();
}

function clearSearch() {
  searchInput.value = "";
  searchQuery = "";
  searchClear.style.display = "none";
  renderResources();
  searchInput.focus();
}

function setCause(cause) {
  activeCause = activeCause === cause ? null : cause;
  renderResources();
  updateCauseTabStates();
}

function setType(type) {
  activeType = activeType === type ? null : type;
  renderResources();
  updateFilterChipStates();
}

function matchesResource(resource) {
  const causeMatch = !activeCause || resource.cause === activeCause;
  const typeMatch = !activeType || resource.type === activeType;

  if (!causeMatch || !typeMatch) return false;

  if (searchQuery) {
    const haystack = `${resource.title} ${resource.description} ${resource.cause} ${resource.category}`.toLowerCase();
    return haystack.includes(searchQuery);
  }

  return true;
}

function renderResources() {
  const filtered = resources.filter(matchesResource);
  resultsCountEl.textContent = filtered.length;

  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    noResultsEl.classList.remove("hidden");
    return;
  }

  noResultsEl.classList.add("hidden");

  const grouped = groupBy(filtered, (r) => r.cause);

  Object.entries(grouped).forEach(([cause, items]) => {
    const section = document.createElement("section");
    section.className = "cause-section";

    const label = document.createElement("h2");
    label.className = "cause-label";
    label.textContent = cause;
    label.id = `cause-${slugify(cause)}`;
    section.appendChild(label);

    const grid = document.createElement("div");
    grid.className = "resource-grid";

    items.forEach((resource) => {
      grid.appendChild(createCard(resource));
    });

    section.appendChild(grid);
    resultsContainer.appendChild(section);
  });
}

function createCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card";
  card.dataset.type = resource.type;

  const titleLink = document.createElement("a");
  titleLink.className = "resource-title";
  titleLink.href = resource.url;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.textContent = resource.title;

  const desc = document.createElement("p");
  desc.className = "resource-description";
  desc.textContent = resource.description;

  const meta = document.createElement("div");
  meta.className = "resource-meta";

  const typeChip = document.createElement("span");
  typeChip.className = "meta-chip type";
  typeChip.textContent = resource.category;

  const costChip = document.createElement("span");
  costChip.className = "meta-chip cost";
  costChip.textContent = resource.cost;

  const sourceChip = document.createElement("span");
  sourceChip.className = "meta-chip source";
  sourceChip.textContent = resource.source_type;

  meta.appendChild(typeChip);
  meta.appendChild(costChip);
  meta.appendChild(sourceChip);

  card.appendChild(titleLink);
  card.appendChild(desc);
  card.appendChild(meta);

  return card;
}

function groupBy(array, keyFn) {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderCauseTabs() {
  const causes = [...new Set(resources.map((r) => r.cause))].sort();
  causeTabsEl.innerHTML = "";

  const allTab = document.createElement("button");
  allTab.className = "cause-tab active";
  allTab.textContent = "All causes";
  allTab.setAttribute("aria-pressed", "true");
  allTab.addEventListener("click", () => setCause(null));
  causeTabsEl.appendChild(allTab);

  causes.forEach((cause) => {
    const button = document.createElement("button");
    button.className = "cause-tab";
    button.textContent = cause;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => setCause(cause));
    causeTabsEl.appendChild(button);
  });
}

function updateCauseTabStates() {
  const tabs = causeTabsEl.querySelectorAll(".cause-tab");
  tabs.forEach((tab) => {
    const isAll = tab.textContent === "All causes";
    const active = isAll ? activeCause === null : tab.textContent === activeCause;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", active);
  });
}

function renderFilterChips() {
  const types = [
    { key: "funder_database", label: "Funder database" },
    { key: "writing_guide", label: "Writing guide" },
    { key: "proposal_template", label: "Proposal template" },
    { key: "budget_worksheet", label: "Budget worksheet" },
  ];

  filterChipsEl.innerHTML = "";

  types.forEach(({ key, label }) => {
    const button = document.createElement("button");
    button.className = "filter-chip";
    button.textContent = label;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => setType(key));
    filterChipsEl.appendChild(button);
  });
}

function updateFilterChipStates() {
  const chips = filterChipsEl.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    const keyMap = {
      "Funder database": "funder_database",
      "Writing guide": "writing_guide",
      "Proposal template": "proposal_template",
      "Budget worksheet": "budget_worksheet",
    };
    const active = keyMap[chip.textContent] === activeType;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", active);
  });
}

document.addEventListener("DOMContentLoaded", loadResources);
