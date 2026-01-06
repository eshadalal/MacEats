const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const results = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
    );

    displayResults(results);
});

function displayResults(results) {
    const container = document.querySelector('.container');
    const oldResults = document.querySelector('.results');
    if (oldResults) oldResults.remove();

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results';

    if (results.length > 0) {
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'result-item';

            const name = document.createElement('h3');
            name.textContent = result.name;
            item.appendChild(name);

            const tags = document.createElement('p');
            tags.textContent = result.tags.join(', ');
            item.appendChild(tags);

            resultsDiv.appendChild(item);
        });
    } else {
        resultsDiv.textContent = 'No results found.';
    }

    container.appendChild(resultsDiv);
}

let data = [];

async function loadItems() {
    try {
        const res = await fetch('items.json'); 
        data = await res.json();

        displayResults(data); 
        
    } catch (err) {
        console.error('Failed to load items:', err);
    }
}

loadItems();
