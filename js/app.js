const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  const results = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
  );

  displayResults(results);
});

function displayResults(results) {
  const container = document.querySelector(".container");
  const oldResults = document.querySelector(".results");
  if (oldResults) oldResults.remove();

  const resultsDiv = document.createElement("div");
  resultsDiv.className = "results";

  if (results.length > 0) {
    results.forEach((result) => {
      const item = document.createElement("div");
      item.className = "result-item";

      const name = document.createElement("h3");
      name.textContent = result.name;
      item.appendChild(name);

      const tags = document.createElement("p");
      tags.textContent = result.tags.join(", ");
      item.appendChild(tags);

      const likeDiv = document.createElement("div");
      likeDiv.className = "likes";
      likeDiv.style.cursor = "pointer";
      likeDiv.style.userSelect = "none";
      likeDiv.style.fontSize = "15px";
      likeDiv.style.marginTop = "5px";

      if (!result.likes) result.likes = 0;
      updateLikes(likeDiv, result.likes);

      likeDiv.addEventListener("click", () => {
        result.likes += 1;
        updateLikes(likeDiv, result.likes);
        saveLikes();
      });

      item.appendChild(likeDiv);

      resultsDiv.appendChild(item);
    });
  } else {
    resultsDiv.textContent = "No results found.";
  }

  container.appendChild(resultsDiv);
}

function updateLikes(container, count) {
  container.textContent = `♡ ${count}`;
}

function saveLikes() {
  localStorage.setItem("foodLikes", JSON.stringify(data));
}

function loadLikes() {
  const saved = localStorage.getItem("foodLikes");
  if (saved) {
    const savedData = JSON.parse(saved);
    data.forEach((item) => {
      const savedItem = savedData.find((d) => d.name === item.name);
      if (savedItem && savedItem.likes) {
        item.likes = savedItem.likes;
      }
    });
  }
}

let data = [];

async function loadItems() {
  try {
    const res = await fetch("items.json");
    data = await res.json();
    loadLikes();
    displayResults(data);
  } catch (err) {
    console.error("Failed to load items:", err);
  }
}

loadItems();
