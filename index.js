// Get references to HTML elements
const rollButton = document.getElementById('roll');
const skillInput = document.getElementById('skill');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');

// Main roll function
rollButton.addEventListener('click', () => {
  const threshold = parseInt(skillInput.value, 10);
  if (isNaN(threshold) || threshold <= 0) {
    output.textContent = 'Please enter a valid skill threshold.';
    return;
  }

  const type = typeSelect.value;

  // Roll 1-100
  let roll = Math.floor(Math.random() * 100) + 1;

  // Handle bonus/penalty dice
  if (type === 'bonus') {
    const tensExtra = Math.floor(Math.random() * 10) * 10;
    const units = roll % 10;
    roll = Math.min(roll, tensExtra + units);
  } else if (type === 'penalty') {
    const tensExtra = Math.floor(Math.random() * 10) * 10;
    const units = roll % 10;
    roll = Math.max(roll, tensExtra + units);
  }

  // Determine success level
  let result = '';
  if (roll <= threshold / 5) result = 'Extreme Success';
  else if (roll <= threshold / 2) result = 'Hard Success';
  else if (roll <= threshold) result = 'Regular Success';
  else result = 'Failure';

  // Display in <pre>
  output.textContent = `Rolled: ${roll}\nThreshold: ${threshold}\nResult: ${result}`;
});
