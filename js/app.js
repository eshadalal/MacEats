const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const status = document.getElementById("status");
const likesStorageKey = "maceats-local-likes";

let data = [];
let apiIsAvailable = false;

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

    const tags = document.createElement("p");
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
    if (apiIsAvailable) {
      const response = await fetch(`/api/items/${encodeURIComponent(item._id)}`, { method: "PUT" });
      if (!response.ok) throw new Error(`API responded with ${response.status}`);
      const updatedItem = await response.json();
      item.likeCount = Number(updatedItem.likeCount) || 0;
    } else {
      item.likeCount += 1;
      saveLocalLike(item);
    }

    updateLikes(button, item.likeCount);
  } catch (error) {
    // The menu remains useful when the optional server is offline.
    console.warn("Falling back to likes saved in this browser:", error);
    apiIsAvailable = false;
    item.likeCount += 1;
    saveLocalLike(item);
    updateLikes(button, item.likeCount);
    status.textContent = "Saved your like on this device.";
  } finally {
    button.disabled = false;
  }
}

function getLocalLikes() {
  try {
    return JSON.parse(localStorage.getItem(likesStorageKey)) || {};
  } catch {
    return {};
  }
}

function saveLocalLike(item) {
  const likes = getLocalLikes();
  likes[item._id] = item.likeCount;
  localStorage.setItem(likesStorageKey, JSON.stringify(likes));
}

function normaliseItems(items, useLocalLikes) {
  const localLikes = useLocalLikes ? getLocalLikes() : {};
  return items.map((item) => {
    const id = String(item._id ?? item.id);
    return {
      ...item,
      _id: id,
      tags: Array.isArray(item.tags) ? item.tags : [],
      likeCount: Number(useLocalLikes ? (localLikes[id] ?? item.likeCount) : item.likeCount) || 0,
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
    data = normaliseItems(await getJson("/api/items"), false);
    apiIsAvailable = true;
  } catch (apiError) {
    try {
      data = normaliseItems(await getJson("items.json"), true);
      apiIsAvailable = false;
      console.info("Menu API unavailable; using bundled menu data.", apiError);
    } catch (dataError) {
      console.error("Failed to load menu data:", dataError);
      status.textContent = "We couldn’t load the menu. Please refresh and try again.";
      return;
    }
  }

  displayResults(data);
  status.textContent = `${data.length} foods available.`;
}

loadItems();
