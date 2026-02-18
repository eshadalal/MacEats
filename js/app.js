const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    displayResults(data);
    return;
  }

  const results = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query))),
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

      if (result.likeCount == null) result.likeCount = 0;
      updateLikes(likeDiv, result.likeCount);

      likeDiv.addEventListener("click", async () => {
        try {
          const res = await fetch(`/items/${result._id}/like`, {
            method: "PUT",
          });
          const updatedItem = await res.json();

          const dataItem = data.find((d) => d._id === result._id);
          if (dataItem) dataItem.likeCount = updatedItem.likeCount ?? 0;

          result.likeCount = updatedItem.likeCount ?? 0;

          updateLikes(likeDiv, result.likeCount);
        } catch (err) {
          console.error("Failed to like item:", err);
        }
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

let data = [];

async function loadItems() {
  try {
    const res = await fetch("/items");
    data = await res.json();
    data.forEach((item) => {
      item._id = item._id.toString();
      if (item.likeCount == null) item.likeCount = 0;
    });

    displayResults(data);
  } catch (err) {
    console.error("Failed to load items:", err);
  }
}

loadItems();
