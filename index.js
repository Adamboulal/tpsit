import fs from 'fs';
import { primoDispariSuccessivo, tabellina, fibonacciFinoA } from './funzioni.js';

// --- ESEMPI DI UTILIZZO ---
console.log("Dispari dopo 10:", primoDispariSuccessivo(10));
console.log("Tabellina del 5:", tabellina(5));
console.log("Fibonacci sotto 50:", fibonacciFinoA(50));

// --- SCRITTURA FILE TABELLINE (1-10) ---
let contenuto = "";

for (let i = 1; i <= 10; i++) {
    // Uniamo i numeri della tabellina con uno spazio e aggiungiamo una riga
    contenuto += tabellina(i).join(" ") + "\n";
}

fs.writeFileSync("tabelline.txt", contenuto);
console.log("File 'tabelline.txt' creato con successo!");
