document.getElementById('calculate-btn').addEventListener('click', () => {
  const start = parseFloat(document.getElementById('start').value);
  const end = parseFloat(document.getElementById('end').value);

  if (isNaN(start) || isNaN(end)) {
    document.getElementById('result').textContent = 'Inserisci valori validi!';
    document.getElementById('result').style.color = '#e74c3c';
    return;
  }

  const dislivello = end - start;

  const result = document.getElementById('result');
  result.textContent = `Dislivello totale: ${dislivello} metri`;
  result.style.color = dislivello >= 0 ? '#27ae60' : '#e74c3c';
  result.style.opacity = '1';
});
