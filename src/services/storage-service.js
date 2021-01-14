export const storageService = {
    saveToStorage,
    removeFromStorage,
    loadFromStorage
};

function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}