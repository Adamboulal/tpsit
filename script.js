// JavaScript per calcolare il dislivello
document.getElementById('calculate-btn').addEventListener('click', () => {
  // Legge i valori inseriti dall'utente
  const start = parseFloat(document.getElementById('start').value);
  const end = parseFloat(document.getElementById('end').value);

  // Verifica se tutti i campi sono compilati correttamente
  if (isNaN(start) || isNaN(end)) {
    document.getElementById('result').textContent = 'Inserisci entrambi i valori correttamente!';
    document.getElementById('result').style.color = '#e74c3c';
    return;
  }

  // Calcola il dislivello totale (altezza finale - altezza iniziale)
  const dislivelloTotale = end - start;

  // Mostra il risultato
  document.getElementById('result').textContent = `Dislivello totale: ${dislivelloTotale} metri`;
  document.getElementById('result').style.color = dislivelloTotale >= 0 ? '#27ae60' : '#e74c3c';
});
