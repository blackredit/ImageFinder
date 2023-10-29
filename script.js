const header = document.getElementById('header');
const searchBar = document.getElementById('searchBar');
const queryInput = document.getElementById('queryInput');
const clearIcon = document.getElementById('clearIcon');
const searchLoader = document.getElementById('searchLoader');
const imagesDiv = document.getElementById('images');
const loadMoreButton = document.getElementById('loadMore');
const loadMoreLoader = document.getElementById('loadMoreLoader');

let currentPage = 1;
let currentQuery = '';

queryInput.addEventListener('input', () => {
    if (queryInput.value) {
        clearIcon.style.display = 'block';
    } else {
        clearIcon.style.display = 'none';
    }
});

clearIcon.addEventListener('click', () => {
    queryInput.value = '';
    clearIcon.style.display = 'none';
});

queryInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        currentQuery = queryInput.value;
        imagesDiv.innerHTML = '';
        fetchImages();
        header.style.top = '0';
        searchLoader.style.display = 'block';
    }
});

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchImages();
    loadMoreButton.style.display = 'none';
    loadMoreLoader.style.display = 'block';
});

function fetchImages() {
    chrome.storage.sync.get(['numResults'], function(items) {
        const numResults = items.numResults || '15';
        
        const url = `https://ext.de.cool/pixabay_proxy.php`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                searchLoader.style.display = 'none';
                loadMoreLoader.style.display = 'none';
                if (data.hits.length > 0) {
                    data.hits.forEach(hit => {
                        const img = document.createElement('img');
                        img.src = hit.webformatURL;
                        img.alt = hit.tags;
                        imagesDiv.appendChild(img);
                    });
                    loadMoreButton.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    });
}
