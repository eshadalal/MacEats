let data = [];

async function loadItems() {
    try {
        const res = await fetch('/items');
        data = await res.json();

        displayTopFoods(data);
    } catch (err) {
        console.error('Failed to load items:', err);
    }
}

function displayTopFoods(items) {
    const container = document.getElementById('topFoods');
    container.innerHTML = '';

    const sorted = items.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));

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
