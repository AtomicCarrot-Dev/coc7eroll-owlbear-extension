// Grab elements
const rollButton = document.getElementById('roll');
const skillInput = document.getElementById('skill');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');

// Dice icon in button
const icon = document.createElement('span');
icon.textContent = '🎲';
rollButton.prepend(icon);

// Main roll logic
rollButton.addEventListener('click', () => {
  const skill = parseInt(skillInput.value, 10);
  if (isNaN(skill) || skill <= 0) {
    // Use innerHTML here so colors or formatting could work
    output.innerHTML = '<span style="color:red">Enter a valid skill threshold.</span>';
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

  // Determine success/failure level
  let result = '';
  if (roll === 1) {
    result = 'Critical Success';
  } else if (roll <= skill / 5) {
    result = 'Extreme Success';
  } else if (roll <= skill / 2) {
    result = 'Hard Success';
  } else if (roll <= skill) {
    result = 'Regular Success';
  } else if (roll === 100) {
    result = 'Fumble';
  } else {
    result = 'Failure';
  }

  // Determine color
  let color = '#0f0'; // default success green
  if (result === 'Critical Success') color = '#00ffff'; // cyan for crit
  else if (result === 'Extreme Success') color = '#0f0'; // green
  else if (result === 'Hard Success') color = '#aaff00'; // yellow-green
  else if (result === 'Regular Success') color = '#fffa00'; // yellow
  else if (result === 'Failure') color = '#f90'; // orange
  else if (result === 'Fumble') color = '#f00'; // red

  // Display result
  output.innerHTML = `
    <strong>Rolled:</strong> ${roll} <br>
    <strong>Skill:</strong> ${skill} <br>
    <strong style="color:${color}">${result}</strong>
  `;
});

