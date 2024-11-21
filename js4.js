// JavaScript per calcolare il dislivello
document.getElementById('calculate-btn').addEventListener('click', () => {
  // Legge i valori inseriti dall'utente
  const start = parseFloat(document.getElementById('start').value);
  const pause = parseFloat(document.getElementById('pause').value);
  const end = parseFloat(document.getElementById('end').value);

  // Verifica se tutti i campi sono compilati correttamente
  if (isNaN(start) || isNaN(pause) || isNaN(end)) {
    document.getElementById('result').textContent = 'Inserisci tutti i valori correttamente!';
    document.getElementById('result').style.color = '#e74c3c';
    return;
  }

  // Calcola il dislivello totale
  const dislivelloTotale = Math.abs(pause - start) + Math.abs(end - pause);

  // Mostra il risultato
  document.getElementById('result').textContent = `Dislivello totale: ${dislivelloTotale} metri`;
  document.getElementById('result').style.color = '#27ae60';
});
