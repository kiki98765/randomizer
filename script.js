let data = {};
let currentList = [];
let remainingItems = [];

fetch("listen.json")
    .then(response => response.json())
    .then(json => {
        data = json;
        createButtons();
    })
    .catch(error => {
        document.getElementById("result").innerText = "Fehler beim Laden der Listen.";
        console.error(error);
    });

function createButtons() {
    const container = document.getElementById("gameButtons");

    Object.keys(data).forEach(key => {
        const btn = document.createElement("button");
        btn.innerText = key;
        btn.onclick = () => startGame(key);
        container.appendChild(btn);
    });
}

function startGame(listName) {
    currentList = [...data[listName]];
    remainingItems = [...currentList];
    showRandomItem();
    document.getElementById("nextBtn").style.display = "block";
}

function showRandomItem() {
    if (remainingItems.length === 0) {
        document.getElementById("result").innerText = "Alle Elemente wurden angezeigt.";
        document.getElementById("nextBtn").style.display = "none";
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingItems.length);
    const item = remainingItems.splice(randomIndex, 1)[0];
    document.getElementById("result").innerText = item;
}

document.getElementById("nextBtn").addEventListener("click", showRandomItem);