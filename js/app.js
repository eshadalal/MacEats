const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const status = document.getElementById("status");

let data = [];

searchButton.addEventListener("click", searchItems);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchItems();
});

function searchItems() {
  const query = searchInput.value.trim().toLowerCase();
  const results = !query
    ? data
    : data.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)),
      );

  displayResults(results);
  status.textContent = query
    ? `${results.length} food${results.length === 1 ? "" : "s"} found.`
    : `${data.length} food${data.length === 1 ? "" : "s"} available.`;
}

function displayResults(results) {
  resultsContainer.replaceChildren();

  if (results.length === 0) {
    resultsContainer.classList.add("empty-results");
    resultsContainer.textContent = "No foods match that search.";
    return;
  }

  resultsContainer.classList.remove("empty-results");
  results.forEach((result) => {
    const item = document.createElement("article");
    item.className = "result-item";

    const name = document.createElement("h3");
    name.textContent = result.name;
    item.appendChild(name);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = result.price;
    item.appendChild(price);

    const tags = document.createElement("p");
    tags.className = "tags";
    tags.textContent = result.tags.join(", ");
    item.appendChild(tags);

    const likeButton = document.createElement("button");
    likeButton.className = "likes";
    likeButton.type = "button";
    updateLikes(likeButton, result.likeCount);
    likeButton.addEventListener("click", () => likeItem(result, likeButton));
    item.appendChild(likeButton);

    resultsContainer.appendChild(item);
  });
}

function updateLikes(button, count) {
  button.textContent = `♡ ${count}`;
  button.setAttribute("aria-label", `Like ${button.closest("article")?.querySelector("h3")?.textContent || "this food"}. ${count} likes.`);
}

async function likeItem(item, button) {
  button.disabled = true;

  try {
    const response = await fetch(`/api/items/${encodeURIComponent(item._id)}`, { method: "PUT" });
    if (!response.ok) throw new Error(`API responded with ${response.status}`);
    const updatedItem = await response.json();
    item.likeCount = Number(updatedItem.likeCount) || 0;

    updateLikes(button, item.likeCount);
  } catch (error) {
    console.error("Failed to save like:", error);
    status.textContent = "We couldn’t save your like. Please try again.";
  } finally {
    button.disabled = false;
  }
}

function normaliseItems(items) {
  return items.map((item) => {
    const id = String(item._id ?? item.id);
    return {
      ...item,
      _id: id,
      tags: Array.isArray(item.tags) ? item.tags : [],
      likeCount: Number(item.likeCount) || 0,
    };
  });
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} responded with ${response.status}`);
  const items = await response.json();
  if (!Array.isArray(items)) throw new Error(`${url} did not return a food list`);
  return items;
}

async function loadItems() {
  status.textContent = "Loading the menu…";

  try {
    data = normaliseItems(await getJson("/api/items"));
  } catch (error) {
    console.error("Failed to load menu data:", error);
    status.textContent = "We couldn’t load the shared menu. Please refresh and try again.";
    return;
  }

  displayResults(data);
  status.textContent = `${data.length} foods available.`;
}

loadItems();
