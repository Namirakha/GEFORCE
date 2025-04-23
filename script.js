let groups = JSON.parse(localStorage.getItem("groups")) || [];

const saveGroups = () => localStorage.setItem("groups", JSON.stringify(groups));

const groupList = document.getElementById("groupList");
const groupInput = document.getElementById("groupInput");
const urlInput = document.getElementById("urlInput");
const dataArea = document.getElementById("dataArea");

const openBtn = document.getElementById("openUrls");
const exportBtn = document.getElementById("exportData");
const importBtn = document.getElementById("importData");
const shareBtn = document.getElementById("shareLink");

function renderGroups() {
  groupList.innerHTML = "";
  groups.forEach((group, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${group.name}</strong>
      <ul>
        ${group.urls.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join("")}
      </ul>
      <button data-remove="${index}">🗑 Remove</button>
    `;
    groupList.appendChild(li);
  });
}

function addGroup(name) {
  if (!name) return;
  groups.push({ name, urls: [] });
  saveGroups();
  renderGroups();
}

function addUrl(url) {
  if (!url || groups.length === 0) return;
  groups[groups.length - 1].urls.push(url);
  saveGroups();
  renderGroups();
}

function removeGroup(index) {
  groups.splice(index, 1);
  saveGroups();
  renderGroups();
}

document.getElementById("addGroup").addEventListener("click", () => {
  addGroup(groupInput.value.trim());
  groupInput.value = "";
});

urlInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addUrl(urlInput.value.trim());
    urlInput.value = "";
  }
});

groupList.addEventListener("click", e => {
  if (e.target.dataset.remove !== undefined) {
    removeGroup(Number(e.target.dataset.remove));
  }
});

openBtn.addEventListener("click", () => {
  groups.flatMap(g => g.urls).forEach(url => window.open(url, "_blank"));
});

exportBtn.addEventListener("click", () => {
  dataArea.value = JSON.stringify(groups, null, 2);
});

importBtn.addEventListener("click", () => {
  try {
    const imported = JSON.parse(dataArea.value);
    if (Array.isArray(imported)) {
      groups = imported;
      saveGroups();
      renderGroups();
      alert("Data imported!");
    }
  } catch {
    alert("Invalid JSON data!");
  }
});

shareBtn.addEventListener("click", () => {
  const base = window.location.origin + window.location.pathname;
  const encoded = encodeURIComponent(btoa(JSON.stringify(groups)));
  const shareURL = `${base}?data=${encoded}`;
  navigator.clipboard.writeText(shareURL).then(() => alert("Link copied!"));
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

(function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("data")) {
    try {
      groups = JSON.parse(atob(decodeURIComponent(params.get("data"))));
      saveGroups();
    } catch {
      console.warn("Invalid share link.");
    }
  }
  renderGroups();
})();
