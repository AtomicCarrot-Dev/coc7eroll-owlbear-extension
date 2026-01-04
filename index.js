// Grab elements
const rollButton = document.getElementById('roll');
const skillInput = document.getElementById('skill');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');

// Optional: dice icon in button
const icon = document.createElement('span');
icon.textContent = '🎲';
rollButton.prepend(icon);

rollButton.addEventListener('click', () => {
  const threshold = parseInt(skillInput.value, 10);
  if (isNaN(threshold) || threshold <= 0) {
    output.textContent = 'Enter a valid skill threshold.';
    return;
  }

  const type = typeSelect.value;

  let roll = Math.floor(Math.random() * 100) + 1;

  // Bonus / Penalty die logic
  if (type === 'bonus' || type === 'penalty') {
    const tens1 = Math.floor(roll / 10);
    const tens2 = Math.floor(Math.random() * 10);
    const units = roll % 10;
    roll = type === 'bonus' ? Math.min(tens1 * 10 + units, tens2 * 10 + units) 
                             : Math.max(tens1 * 10 + units, tens2 * 10 + units);
  }

  // Determine success level
  let result = '';
  if (roll <= threshold / 5) result = 'Extreme Success';
  else if (roll <= threshold / 2) result = 'Hard Success';
  else if (roll <= threshold) result = 'Regular Success';
  else result = 'Failure';

  // Update output with colors
  const color = result.includes('Success') ? '#0f0' : '#f00';
  output.innerHTML = `
    <strong>Rolled:</strong> ${roll} <br>
    <strong>Threshold:</strong> ${threshold} <br>
    <strong style="color:${color}">${result}</strong>
  `;
});
