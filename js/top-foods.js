let data = [];

async function loadItems() {
    try {
        data = normaliseItems(await getJson('/api/items'));
        displayTopFoods(data);
    } catch (err) {
        console.error('Failed to load items:', err);
        const container = document.getElementById('topFoods');
        container.classList.add('empty-results');
        container.textContent = 'We couldn’t load the menu. Please refresh and try again.';
    }
}

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url} responded with ${response.status}`);

    const items = await response.json();
    if (!Array.isArray(items)) throw new Error(`${url} did not return a food list`);
    return items;
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

function displayTopFoods(items) {
    const container = document.getElementById('topFoods');
    container.replaceChildren();
    container.classList.remove('empty-results');

    const sorted = [...items].sort((a, b) =>
        (b.likeCount || 0) - (a.likeCount || 0) || a.name.localeCompare(b.name),
    );

    sorted.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';

        const name = document.createElement('h3');
        name.textContent = item.name;
        div.appendChild(name);

        if (item.tags && item.tags.length) {
            const tags = document.createElement('p');
            tags.textContent = item.tags.join(', ');
            div.appendChild(tags);
        }

        const likes = document.createElement('div');
        likes.className = 'likes';
        likes.textContent = `♡ ${item.likeCount || 0}`;
        div.appendChild(likes);

        container.appendChild(div);
    });
}

loadItems();
