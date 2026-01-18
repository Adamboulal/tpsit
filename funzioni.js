export const primoDispariSuccessivo = (n) => {
    let successivo = n + 1;
    return successivo % 2 !== 0 ? successivo : successivo + 1;
};

export const tabellina = (n) => {
    if (n < 1 || n > 10) return "Valore non valido";
    let risultati = [];
    for (let i = 1; i <= 10; i++) {
        risultati.push(n * i);
    }
    return risultati;
};

export const fibonacciFinoA = (limite) => {
    let seq = [0, 1];
    while (true) {
        let prossimo = seq[seq.length - 1] + seq[seq.length - 2];
        if (prossimo >= limite) break;
        seq.push(prossimo);
    }
    return seq;
};
