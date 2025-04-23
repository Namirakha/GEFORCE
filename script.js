const defaultGroups = [
  {
    name: "Crypto Tools",
    urls: [
      "https://etherscan.io",
      "https://coinmarketcap.com",
      "https://uniswap.org"
    ]
  },
  {
    name: "News",
    urls: [
      "https://decrypt.co",
      "https://cointelegraph.com"
    ]
  }
];

const groupList = document.getElementById("groupList");
const openBtn = document.getElementById("openUrls");

function renderGroups(groups) {
  groupList.innerHTML = "";
  groups.forEach((group, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${group.name}</strong>
      <ul>
        ${group.urls.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join("")}
      </ul>
    `;
    groupList.appendChild(li);
  });
}

openBtn.addEventListener("click", () => {
  defaultGroups.flatMap(g => g.urls).forEach(url => window.open(url, "_blank"));
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

renderGroups(defaultGroups);
