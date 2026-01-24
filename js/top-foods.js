let data = [];

async function loadItems() {
    try {
        const res = await fetch('items.json');
        data = await res.json();

        loadNumOfLikes();

        displayTopFoods(data);
    } catch (err) {
        console.error('Failed to load items:', err);
    }
}

function displayTopFoods(items) {
    const container = document.getElementById('topFoods');
    container.innerHTML = '';

    const sorted = items.sort((a, b) => (b.likes || 0) - (a.likes || 0));

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
        likes.textContent = `♡ ${item.likes || 0}`;
        div.appendChild(likes);

        container.appendChild(div);
    });
}

function saveLikes() {
    localStorage.setItem('foodLikes', JSON.stringify(data));
}

function loadNumOfLikes() {
    const saved = localStorage.getItem('foodLikes');
    if (saved) {
        const savedData = JSON.parse(saved);
        data.forEach(item => {
            const savedItem = savedData.find(d => d.name === item.name);
            if (savedItem && savedItem.likes) {
                item.likes = savedItem.likes;
            }
        });
    }
}

loadItems();
