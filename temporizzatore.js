// Funzione per ottenere una posizione casuale all'interno del contenitore
function getRandomPosition(container) {
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 100); // 100 è la larghezza del div
    const y = Math.random() * (containerRect.height - 100); // 100 è l'altezza del div
    return { x, y };
}

// Funzione per controllare se due div si sovrappongono
function checkOverlap(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Funzione per spostare i div casualmente
function moveDivs() {
    const container = document.getElementById('container');
    const div1 = document.getElementById('div1');
    const div2 = document.getElementById('div2');

    const { x: x1, y: y1 } = getRandomPosition(container);
    const { x: x2, y: y2 } = getRandomPosition(container);

    div1.style.left = `${x1}px`;
    div1.style.top = `${y1}px`;

    div2.style.left = `${x2}px`;
    div2.style.top = `${y2}px`;

    // Verifica la sovrapposizione
    if (checkOverlap(div1, div2)) {
        div1.style.backgroundColor = 'red';
        div2.style.backgroundColor = 'red';
    } else {
        div1.style.backgroundColor = 'blue';
        div2.style.backgroundColor = 'yellow';
    }
}

// Sposta i div ogni 2 secondi
setInterval(moveDivs, 2000);
