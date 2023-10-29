document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveSettings').addEventListener('click', saveOptions);

function saveOptions() {
    const numResults = document.getElementById('numResults').value;

    chrome.storage.sync.set({
        numResults: numResults
    }, function() {
        alert('Einstellungen gespeichert!');
    });
}

function loadOptions() {
    chrome.storage.sync.get(['numResults'], function(items) {
        document.getElementById('numResults').value = items.numResults || '15';
    });
}
