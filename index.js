// Grab elements
const rollButton = document.getElementById('roll');
const skillInput = document.getElementById('skill');
const typeSelect = document.getElementById('type');
const output = document.getElementById('output');

// Dice icon
const icon = document.createElement('span');
icon.textContent = '🎲';
rollButton.prepend(icon);

// Helper: roll 1-100
function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

// Determine success/failure
function getSuccessLevel(roll, skill) {
  if (roll === 1) return { text: 'Critical Success', color: '#00ffff' };
  if (roll === 100) return { text: 'Fumble', color: '#f00' };

  const extreme = Math.floor(skill / 5);
  const hard = Math.floor(skill / 2);

  if (roll <= extreme) return { text: 'Extreme Success', color: '#0f0' };
  if (roll <= hard) return { text: 'Hard Success', color: '#aaff00' };
  if (roll <= skill) return { text: 'Regular Success', color: '#fffa00' };
  return { text: 'Failure', color: '#f90' };
}

// Animate dice roll for effect
function animateRoll(finalRoll, skill, type) {
  let displayRoll = 0;
  const frames = 15;
  let frame = 0;

  const interval = setInterval(() => {
    displayRoll = Math.floor(Math.random() * 100) + 1;
    output.innerHTML = `<strong>Rolling:</strong> ${displayRoll}…`;
    frame++;
    if (frame >= frames) {
      clearInterval(interval);

      // Handle bonus/penalty dice
      let roll = finalRoll;
      let tensStr = '', unitsStr = '';
      if (type === 'bonus' || type === 'penalty') {
        const tens1 = Math.floor(roll / 10);
        const tens2 = Math.floor(Math.random() * 10);
        const units = roll % 10;
        roll = type === 'bonus' ? Math.min(tens1 * 10 + units, tens2 * 10 + units)
                                : Math.max(tens1 * 10 + units, tens2 * 10 + units);

        tensStr = `<strong>Tens:</strong> ${tens1} / ${tens2} <br>`;
        unitsStr = `<strong>Units:</strong> ${units} <br>`;
      }

      const { text: resultText, color } = getSuccessLevel(roll, skill);

      output.innerHTML = `
        ${tensStr}${unitsStr}
        <strong>Rolled:</strong> ${roll} <br>
        <strong>Skill:</strong> ${skill} <br>
        <strong style="color:${color}">${resultText}</strong>
      `;
    }
  }, 50);
}

// Main roll
rollButton.addEventListener('click', () => {
  const skill = parseInt(skillInput.value, 10);
  if (isNaN(skill) || skill <= 0) {
    output.innerHTML = '<span style="color:red">Enter a valid skill threshold.</span>';
    return;
  }

  const type = typeSelect.value;
  const finalRoll = rollD100();

  animateRoll(finalRoll, skill, type);
});
